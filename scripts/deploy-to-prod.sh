#!/bin/bash
set -e

# ========== 生产环境配置 ==========
SERVICE_NAME="thesis-mate"
REMOTE_USER="${PROD_USER:-ecs-user}"
REMOTE_HOST="${PROD_HOST:-clawhelp.me}"
REMOTE_PORT="${PROD_PORT:-22}"
SSH_KEY="${PROD_KEY:-$HOME/.ssh/clawhelpme.pem}"
REMOTE_DIR="/home/${REMOTE_USER}/git/thesis-mate"
DOMAIN="tm.clawhelp.me"
IS_LOCAL=false
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ "$REMOTE_HOST" == "localhost" ] || [ "$REMOTE_HOST" == "127.0.0.1" ]; then 
  IS_LOCAL=true
fi

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

# ========== 辅助函数 ==========
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 执行 SSH 命令（本地或远程）
exec_cmd() {
  if [ "$IS_LOCAL" == "true" ]; then
    bash -c "$1"
  else
    ssh -p ${REMOTE_PORT} -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "$1"
  fi
}

# 检查命令执行结果
check_result() {
  if [ $? -ne 0 ]; then
    log_error "$1"
    if [ "$2" == "exit" ]; then
      exit 1
    fi
    return 1
  fi
  return 0
}

# ========== 主流程 ==========
echo "========================================"
echo -e "${GREEN}🚀 ThesisMate - Story Board 生产环境部署${NC}"
echo "========================================"
echo "目标：${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"
echo "域名：https://${DOMAIN}"
echo "========================================"

# --- 阶段 0: 预检查 ---
echo ""
echo -e "${BLUE}========== 阶段 0: 预检查 ==========${NC}"

log_info "检查 SSH 连接..."
if [ "$IS_LOCAL" != "true" ]; then
  ssh -p ${REMOTE_PORT} -i ${SSH_KEY} -o ConnectTimeout=10 ${REMOTE_USER}@${REMOTE_HOST} "echo 'SSH OK'" > /dev/null 2>&1
  check_result "SSH 连接失败，请检查网络、SSH 密钥和防火墙设置" "exit"
  log_success "SSH 连接正常"
fi

log_info "检查本地项目目录..."
test -d "${PROJECT_ROOT}/storyboard"
check_result "本地 storyboard 目录不存在" "exit"
log_success "本地项目目录正常"

log_info "检查远程目录..."
exec_cmd "test -d ${REMOTE_DIR} && echo 'DIR_OK' || (mkdir -p ${REMOTE_DIR} && echo 'DIR_CREATED')"
check_result "远程目录创建/检查失败" "exit"
log_success "远程目录已就绪"

# --- 阶段 1: 同步代码 ---
echo ""
echo -e "${BLUE}========== 阶段 1: 同步 Story Board 文件 ==========${NC}"

log_info "同步 storyboard 目录到远程服务器..."
if [ "$IS_LOCAL" = "true" ]; then
  rsync -av --delete "${PROJECT_ROOT}/storyboard/" "${REMOTE_DIR}/storyboard/"
  rsync -av "${PROJECT_ROOT}/nginx/" "${REMOTE_DIR}/nginx/"
else
  rsync -avz --delete -e "ssh -p ${REMOTE_PORT} -i ${SSH_KEY}" \
    "${PROJECT_ROOT}/storyboard/" \
    "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/storyboard/"
  rsync -avz -e "ssh -p ${REMOTE_PORT} -i ${SSH_KEY}" \
    "${PROJECT_ROOT}/nginx/" \
    "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/nginx/"
fi
check_result "文件同步失败" "exit"
log_success "Story Board 文件同步完成"

# --- 阶段 2: 配置 Nginx ---
echo ""
echo -e "${BLUE}========== 阶段 2: 配置 Nginx ==========${NC}"

log_info "生成 Nginx 配置文件..."
NGINX_CONF=$(cat "${PROJECT_ROOT}/nginx/thesis-mate.conf.template" | \
  sed "s|{{DOMAIN}}|${DOMAIN}|g" | \
  sed "s|{{REMOTE_DIR}}|${REMOTE_DIR}|g")

log_info "上传 Nginx 配置..."
echo "$NGINX_CONF" | ssh -p ${REMOTE_PORT} -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} \
  "sudo tee /etc/nginx/conf.d/${DOMAIN}.conf > /dev/null"
check_result "Nginx 配置上传失败" "exit"
log_success "Nginx 配置文件已上传"

log_info "检查 Nginx 配置..."
exec_cmd "sudo nginx -t"
check_result "Nginx 配置检查失败，请检查配置文件" "exit"
log_success "Nginx 配置检查通过"

log_info "重载 Nginx..."
exec_cmd "sudo systemctl reload nginx"
check_result "Nginx 重载失败" "exit"
log_success "Nginx 重载完成"

# --- 阶段 3: HTTPS 验证 ---
echo ""
echo -e "${BLUE}========== 阶段 3: HTTPS 验证 ==========${NC}"

log_info "验证 HTTPS 访问（最多重试 3 次）..."
DEPLOY_PASSED=false
for i in 1 2 3; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}/" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" == "200" ]; then
    log_success "HTTPS 访问正常 (HTTP ${HTTP_CODE})"
    DEPLOY_PASSED=true
    break
  else
    log_warning "第 ${i} 次验证失败 (HTTP ${HTTP_CODE})"
    if [ "$i" -lt 3 ]; then
      log_info "3 秒后重试..."
      sleep 3
    fi
  fi
done

if [ "$DEPLOY_PASSED" != "true" ]; then
  log_error "HTTPS 验证失败！请手动检查 Nginx 配置和 SSL 证书"
  log_info "诊断命令："
  log_info "  ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} 'sudo nginx -t'"
  log_info "  ssh -i ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} 'sudo systemctl status nginx'"
  log_info "  curl -sv https://${DOMAIN}/"
  exit 1
fi

# --- 阶段 4: 最终报告 ---
echo ""
echo -e "${BLUE}========== 阶段 4: 最终报告 ==========${NC}"

echo "========================================"
echo -e "${GREEN}✅ 部署成功！${NC}"
echo "========================================"
echo "服务地址：https://${DOMAIN}"
echo "本地路径：${PROJECT_ROOT}/storyboard/"
echo "远程路径：${REMOTE_DIR}/storyboard/"
echo "部署时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================"

# 验证 Story Board 核心页面
log_info "验证 Story Board 页面..."
for page in "/" "/index.html"; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}${page}" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" == "200" ]; then
    log_success "  ${page} → HTTP ${HTTP_CODE}"
  else
    log_warning "  ${page} → HTTP ${HTTP_CODE}"
  fi
done

echo ""
echo -e "${GREEN}🎉 所有检查通过，部署完成！${NC}"
echo "========================================"

exit 0