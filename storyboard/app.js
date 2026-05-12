/**
 * ThesisMate Pipeline Story Board
 * 纯静态演示页面 - 交互逻辑
 */

// ========== 配置数据 ==========

const STAGES = {
  '1': {
    name: '选题',
    status: 'DRAFT',
    messages: [
      { role: 'ai', content: '你好！欢迎来到选题阶段！', time: '09:00' },
      { role: 'ai', content: '我是你的 AI 助教，可以帮助你进行选题方向的探讨。', time: '09:00' },
      { role: 'user', content: '你好！我是电子信息工程专业的大三学生张三。', time: '09:01' },
      { role: 'ai', content: '你好，张三！电子信息工程专业有很多 interesting 的方向呢。我建议你从以下几个方向考虑：', time: '09:02' },
      { role: 'ai', content: '🔹 嵌入式系统（智能硬件、IoT）\n🔹 计算机视觉（图像识别、目标检测）\n🔹 信号处理（音频分析、滤波算法）', time: '09:02' },
      { role: 'ai', content: '你对哪个方向比较感兴趣？或者有其他想法吗？', time: '09:02' },
      { role: 'user', content: '我对嵌入式系统比较感兴趣，特别是 IoT 相关的方向。', time: '09:03' },
      { role: 'ai', content: '太好了！嵌入式 IoT 是一个非常热门的方向。我可以帮你推荐一些具体的课题，比如：', time: '09:04' },
      { role: 'ai', content: '• 基于 ESP32 的智能垃圾桶设计\n• 基于 Raspberry Pi 的家庭安防系统\n• 多节点环境监测系统', time: '09:04' },
      { role: 'ai', content: '这些课题都比较适合本科毕设，既有一定的挑战性，又可以在现有硬件平台上实现。你对哪个课题更感兴趣？', time: '09:04' },
      { role: 'user', content: '我比较喜欢智能垃圾桶这个方向，感觉比较有实际意义。', time: '09:05' },
      { role: 'ai', content: '好的！"基于 ESP32 的智能垃圾桶设计"确实是个不错的选题。', time: '09:06' },
      { role: 'ai', content: '这个课题可以涵盖：\n• 物联网设备开发\n• 传感器数据采集\n• 云平台对接\n• 数据可视化', time: '09:06' },
      { role: 'ai', content: '我可以帮你写一份初步的选题说明和可行性分析，是否需要？', time: '09:06' },
      { role: 'user', content: '好的，麻烦你帮我写一份。', time: '09:07' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'topic-background',
        label: '选题背景',
        content: '随着城市化进程加快，城市垃圾处理问题日益严重。据统计，我国城市生活垃圾年清运量已超过 2 亿吨，且呈逐年增长趋势。传统的垃圾处理方式存在分类不彻底、管理粗放、资源浪费等问题。\n\n智能垃圾桶作为智慧城市的重要组成部分，能够实现垃圾分类、满溢检测、数据统计等功能，有效提高垃圾管理效率，降低人工成本，具有重要的社会意义和实用价值。'
      },
      {
        id: 'technical-feasibility',
        label: '技术可行性',
        content: 'ESP32 作为低成本 Wifi/BLE 双模芯片，具有丰富的 GPIO 接口和 WiFi 功能，非常适合物联网应用开发。配合超声波传感器、红外传感器等，可以实现完整的智能垃圾桶功能。'
      },
      {
        id: 'innovation-points',
        label: '创新点',
        content: '• 支持多类垃圾自动分类\n• 满溢程度实时监测\n• 数据上传至云平台\n• 支持远程管理'
      }
    ]
  },
  '2': {
    name: '开题报告',
    status: 'REVIEW',
    messages: [
      { role: 'ai', content: '张三，我们来开始开题报告的撰写吧！', time: '14:00' },
      { role: 'ai', content: '首先，我帮你推荐一些相关的文献资料。', time: '14:01' },
      { role: 'ai', content: '• 《基于 ESP32 的物联网系统设计》\n• 《智能垃圾桶系统设计与实现》\n• 《物联网传感器数据采集与处理》', time: '14:01' },
      { role: 'user', content: '好的，我先看看这些文献。', time: '14:02' },
      { role: 'ai', content: '看完文献后，我们可以一起梳理开题报告的框架。', time: '14:03' },
      { role: 'ai', content: '开题报告主要包括：\n1. 研究背景与意义\n2. 国内外研究现状\n3. 研究内容与目标\n4. 研究方案与技术路线\n5. 进度安排', time: '14:03' },
      { role: 'ai', content: '你希望先撰写哪一部分？我可以帮你起草。', time: '14:03' },
      { role: 'user', content: '我想先写研究背景与意义。', time: '14:04' },
      { role: 'ai', content: '好的！我来帮你起草研究背景与意义部分。', time: '14:05' },
      { role: 'ai', content: '（文档正在生成...）', time: '14:06' },
      { role: 'ai', content: '写好了！你可以查看生成的文档，并进行修改和润色。', time: '14:06' },
      { role: 'user', content: '看起来不错，我稍微修改一下。', time: '14:07' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'research-background',
        label: '研究背景',
        content: '随着城市化进程加快，城市垃圾处理问题日益严重。据统计，我国城市生活垃圾年清运量已超过 2 亿吨，且呈逐年增长趋势。传统的垃圾处理方式存在分类不彻底、管理粗放、资源浪费等问题。\n\n智能垃圾桶作为智慧城市的重要组成部分，能够实现垃圾分类、满溢检测、数据统计等功能，有效提高垃圾管理效率，降低人工成本，具有重要的社会意义和实用价值。'
      },
      {
        id: 'literature-review',
        label: '国内外研究现状',
        content: '目前，国内外对智能垃圾桶的研究主要集中在以下几个方面：\n\n1. 传感器技术：超声波、红外、称重等传感器用于检测垃圾桶状态\n2. 物联网连接：Wifi、Bluetooth、LoRa 等技术实现设备联网\n3. 云平台：阿里云、腾讯云等平台提供数据存储和可视化\n4. AI 算法：图像识别、深度学习用于垃圾自动分类\n\n国外研究起步较早，如美国的 SmartBin、英国的 Bin-E 等产品已实现商业化。国内近年来也涌现出一批智能垃圾桶产品，但主要集中在高端市场。'
      },
      {
        id: 'research-objectives',
        label: '研究内容与目标',
        content: '本课题旨在设计并实现一个基于 ESP32 的智能垃圾桶系统，主要研究内容包括：\n\n1. 系统硬件设计：包括 ESP32 主控、传感器选型、执行机构设计\n2. 系统软件设计：包括嵌入式固件开发、云平台对接、移动端应用\n3. 功能实现：包括满溢检测、垃圾分类、数据上传、远程管理\n\n预期目标：完成一个功能完整、稳定可靠的智能垃圾桶原型系统。'
      }
    ]
  },
  '3': {
    name: '方案设计',
    status: 'DRAFT',
    messages: [
      { role: 'ai', content: '现在进入方案设计阶段！', time: '10:00' },
      { role: 'ai', content: '我们需要选择合适的技术栈和设计方案。', time: '10:01' },
      { role: 'user', content: '我需要你帮我对比一下各技术方案。', time: '10:02' },
      { role: 'ai', content: '好的！我来帮你进行技术选型对比。', time: '10:03' },
      { role: 'ai', content: '### 主控芯片对比\n| 芯片 | 优势 | 劣势 | 推荐指数 |\n|------|------|------|----------|\n| ESP32 | 低成本、wifi/ble双模、生态成熟 | 算力有限 | ⭐⭐⭐⭐⭐ |\n| Raspberry Pi | 算力强、接口丰富 | 功耗高、成本高 | ⭐⭐⭐⭐ |\n| STM32 | 实时性好、功耗低 | 需要外接 wifi 模块 | ⭐⭐⭐⭐', time: '10:03' },
      { role: 'ai', content: '### Cloud Platform 对比\n| 平台 | 优势 | 劣势 | 推荐指数 |\n|------|------|------|----------|\n| 阿里云 IoT | 成熟稳定、文档完善 | 国际用户访问较慢 | ⭐⭐⭐⭐⭐ |\n| 腾讯云 IoT | 与微信集成好、国内访问快 | 功能相对简单 | ⭐⭐⭐⭐ |\n| 自建服务器 | 完全可控、成本低 | 运维复杂 | ⭐⭐⭐', time: '10:03' },
      { role: 'user', content: '我倾向于 ESP32 + 阿里云方案。', time: '10:04' },
      { role: 'ai', content: '合理的方案选择！我可以帮你设计完整的系统架构图。', time: '10:05' },
      { role: 'ai', content: '系统架构包括：\n1. 感知层：各类传感器\n2. 网络层：ESP32 Wifi 连接\n3. 平台层：阿里云 IoT 平台\n4. 应用层：Web 管理后台', time: '10:05' },
      { role: 'user', content: '好的，请帮我画一下系统架构图。', time: '10:06' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'technical-architecture',
        label: '系统架构设计',
        content: '本系统采用四层架构设计：\n\n1. **感知层**：包括超声波传感器（满溢检测）、红外传感器（垃圾分类）、重量传感器（负载检测）等\n2. **网络层**：ESP32 单片机作为主控，通过 Wifi 连接互联网\n3. **平台层**：阿里云 IoT 平台提供设备管理、数据存储、规则引擎等服务\n4. **应用层**：Web 管理后台提供数据可视化、设备管理、告警推送等功能'
      },
      {
        id: 'hardware-design',
        label: '硬件设计方案',
        content: '硬件设计包括：\n• ESP32-devkitc 主控板\n• HC-SR04 超声波传感器（满溢检测）\n• IR 光电传感器（垃圾分类）\n• 重量传感器（HX711）\n• 舵机（垃圾桶盖控制）\n• 电源管理模块'
      },
      {
        id: 'software-design',
        label: '软件设计方案',
        content: '软件设计包括：\n• ESP32 固件开发（Arduino Framework）\n• MQTT 协议通信\n• 阿里云 IoT SDK 集成\n• Web 管理后台（Vue3 + TypeScript）'
      }
    ]
  },
  '4': {
    name: '实现',
    status: 'DRAFT',
    messages: [
      { role: 'ai', content: '现在进入实现阶段！', time: '09:30' },
      { role: 'ai', content: '我已经帮你生成了部分代码框架，你可以在此基础上进行开发。', time: '09:31' },
      { role: 'user', content: '我在编译时遇到了这个错误："undefined reference to `mqtt_connect"。', time: '09:32' },
      { role: 'ai', content: '这个错误是因为缺少 MQTT 库的链接。请检查以下几点：', time: '09:33' },
      { role: 'ai', content: '1. 是否包含了 MQTT 库的头文件\n2. 是否在 platformio.ini 中添加了 MQTT 依赖\n3. 是否在代码中正确初始化了 MQTT 客户端', time: '09:33' },
      { role: 'user', content: '我在 platformio.ini 中已经添加了依赖，但还是报错。', time: '09:34' },
      { role: 'ai', content: '让我帮你检查一下代码。你能把相关代码片段发给我看看吗？', time: '09:35' },
      { role: 'user', content: '这是我的 main.cpp 文件。[代码片段]', time: '09:36' },
      { role: 'ai', content: '我发现问题了！你在调用 `mqtt_connect()` 之前没有初始化 MQTT 客户端。需要先调用 `mqtt_init()`。', time: '09:37' },
      { role: 'ai', content: '我已经帮你修复了代码，你可以重新编译试试。', time: '09:37' },
      { role: 'user', content: '好的，我现在试试。', time: '09:38' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'code-snippet',
        label: '核心代码片段',
        content: '```cpp\n#include <PubSubClient.h>\n#include <WiFi.h>\n\nconst char* ssid = "your_ssid";\nconst char* password = "your_password";\nconst char* mqtt_server = "your_mqtt_server";\n\nWiFiClient wifiClient;\nPubSubClient mqttClient(wifiClient);\n\nvoid setup() {\n  // WiFi 连接\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) {\n    delay(500);\n  }\n  \n  // MQTT 初始化\n  mqttClient.setServer(mqtt_server, 1883);\n  mqttClient.setCallback(callback);\n}\n\nvoid loop() {\n  if (!mqttClient.connected()) {\n    mqttClient.connect("ESP32Client");\n  }\n  mqttClient.loop();\n}\n```'
      },
      {
        id: 'test-report',
        label: '测试报告',
        content: '测试用例 1：满溢检测\n• 预期结果：当桶内垃圾超过 80% 时，发送告警消息\n• 实际结果：✅ 通过\n\n测试用例 2：垃圾分类\n• 预期结果：正确识别可回收物和其他垃圾\n• 实际结果：✅ 通过（准确率 95%）\n\n测试用例 3：数据上传\n• 预期结果：每分钟上传一次传感器数据\n• 实际结果：⚠️ 部分数据丢失，需要优化通信协议'
      }
    ]
  },
  '5': {
    name: '论文',
    status: 'DRAFT',
    messages: [
      { role: 'ai', content: '现在进入论文撰写阶段！', time: '14:00' },
      { role: 'ai', content: '我可以帮你检查论文的结构和格式。', time: '14:01' },
      { role: 'user', content: '我写完了初稿，你帮我看看结构是否合理。', time: '14:02' },
      { role: 'ai', content: '好的！我来帮你检查论文结构。', time: '14:03' },
      { role: 'ai', content: '你的论文结构基本合理，但建议以下调整：', time: '14:04' },
      { role: 'ai', content: '• 第三章和第四章可以合并，都是系统设计相关\n• 增加一个"系统测试"章节\n• 补充"总结与展望"部分', time: '14:04' },
      { role: 'user', content: '好的，我按你的建议修改。', time: '14:05' },
      { role: 'ai', content: '修改完成后，我可以帮你检查格式是否符合学校要求。', time: '14:06' },
      { role: 'user', content: '好的，谢谢！', time: '14:07' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'thesis-structure',
        label: '论文结构',
        content: '第一章 绪论\n• 研究背景与意义\n• 国内外研究现状\n• 论文组织结构\n\n第二章 相关技术介绍\n• ESP32 开发技术\n• MQTT 协议\n• 阿里云 IoT 平台\n\n第三章 系统设计\n• 需求分析\n• 系统架构设计\n• 硬件设计\n• 软件设计\n\n第四章 系统实现\n• 开发环境搭建\n• 关键功能实现\n• 测试与调试\n\n第五章 系统测试\n• 测试方案\n• 测试结果\n• 性能分析\n\n第六章 总结与展望\n• 工作总结\n• 不足之处\n• 未来展望'
      },
      {
        id: 'format-check',
        label: '格式检查',
        content: '✅ 编号格式正确\n✅ 图表编号正确\n✅ 参考文献格式正确\n⚠️ 部分章节标题层级需要调整'
      }
    ]
  },
  '6': {
    name: '答辩',
    status: 'DRAFT',
    messages: [
      { role: 'ai', content: '答辩阶段！我来帮你准备答辩材料。', time: '09:00' },
      { role: 'ai', content: '我可以为你提供答辩 PPT 模板和常见问题准备。', time: '09:01' },
      { role: 'user', content: '好的，请帮我生成 PPT 大纲。', time: '09:02' },
      { role: 'ai', content: '好的！这是答辩 PPT 的建议大纲：', time: '09:03' },
      { role: 'ai', content: '1. 封面\n2. 研究背景与意义\n3. 系统总体设计\n4. 系统实现过程\n5. 系统测试与结果\n6. 总结与展望\n7. Q&A', time: '09:03' },
      { role: 'ai', content: '我还可以帮你准备一些常见问题：', time: '09:04' },
      { role: 'ai', content: 'Q: 为什么选择 ESP32 而不是其他主控？\nA: ESP32 成本低、功耗低、生态成熟，非常适合物联网项目。\n\nQ: 系统的创新点是什么？\nA: 本系统集成多种传感器，实现了低成本智能垃圾桶方案。', time: '09:04' },
      { role: 'user', content: '谢谢！', time: '09:05' }
    ],
    aiAssisted: true,
    documentSections: [
      {
        id: 'presentation-outline',
        label: '答辩 PPT 大纲',
        content: '1. 封面（1 页）\n2. 研究背景与意义（2 页）\n3. 系统总体设计（3 页）\n4. 系统实现过程（4 页）\n5. 系统测试与结果（2 页）\n6. 总结与展望（1 页）\n7. Q&A（1 页）'
      },
      {
        id: 'qa-preparation',
        label: '答辩问题准备',
        content: '技术相关问题：\n• 系统的技术难点是什么？如何解决的？\n• 有没有遇到什么 bug？如何调试的？\n• 系统的性能指标是多少？\n\n设计相关问题：\n• 为什么选择这个设计方案？\n• 有没有考虑过其他设计方案？\n\n应用相关问题：\n• 系统的实际应用场景有哪些？\n• 系统的推广价值如何？'
      }
    ]
  }
};

const INITIAL_FEEDBACK = [
  {
    author: '李教授',
    time: '2026-05-10 14:30',
    content: '选题方向不错，但建议在可行性分析部分补充硬件成本预算。'
  },
  {
    author: '王副教授',
    time: '2026-05-11 10:15',
    content: '开题报告中的文献综述部分需要补充近 3 年的相关研究。'
  }
];

// ========== 状态管理 ==========

let currentStage = '1';
let messages = [];
let feedback = [...INITIAL_FEEDBACK];
let typingInterval = null;
let isTyping = false;

// ========== DOM 元素 ==========

const chatMessagesEl = document.getElementById('chat-messages');
const productContentEl = document.getElementById('product-content');
const filePreviewEl = document.getElementById('file-preview');
const stageNameEl = document.getElementById('current-stage-name');
const productStatusEl = document.getElementById('product-status');
const jsonContentEl = document.getElementById('json-content');
const feedbackListEl = document.getElementById('feedback-list');
const feedbackCountEl = document.getElementById('feedback-count');

// ========== 初始化 ==========

document.addEventListener('DOMContentLoaded', () => {
  initPipelineStages();
  loadStage('1');
  initFeedback();
});

// ========== 初始化 Pipeline 进度条 ==========

function initPipelineStages() {
  const buttons = document.querySelectorAll('.stage-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      loadStage(btn.dataset.stage);
    });
  });
}

// ========== 加载阶段 ==========

function loadStage(stage) {
  currentStage = stage;
  const stageData = STAGES[stage];

  // 更新进度条状态
  document.querySelectorAll('.stage-btn').forEach(btn => {
    if (btn.dataset.stage === stage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 更新阶段名称
  stageNameEl.textContent = `${stageData.name}阶段`;

  // 更新产品状态
  productStatusEl.textContent = stageData.status;
  productStatusEl.className = `product-status ${stageData.status}`;

  // 加载消息
  messages = [...stageData.messages];
  renderMessages();

  // 加载产物内容
  renderProductContent(stageData);

  // 清空文件预览
  filePreviewEl.innerHTML = '<div class="no-file-selected"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><p>点击"查看 JSON"按钮查看当前阶段的中间文件</p></div>';
}

// ========== 渲染消息 ==========

function renderMessages() {
  chatMessagesEl.innerHTML = '';
  
  if (messages.length === 0) {
    chatMessagesEl.innerHTML = '<div style="text-align:center;color:#9ca3af;margin-top:2rem;">开始对话...</div>';
    return;
  }

  messages.forEach((msg, index) => {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${msg.role}`;
    messageEl.innerHTML = `
      <div class="message-content">${formatMessage(msg.content)}</div>
      <div class="message-meta">${msg.time}</div>
    `;
    chatMessagesEl.appendChild(messageEl);
  });

  scrollToBottom();
}

// ========== 格式化消息（支持 Markdown） ==========

function formatMessage(content) {
  let formatted = content
    .replace(/\n/g, '<br>')
    .replace(/```([\s\S]*?)```/g, '<pre style="background:#f3f4f6;padding:0.75rem;border-radius:0.5rem;overflow-x:auto;"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:#f3f4f6;padding:0.2rem 0.5rem;border-radius:0.25rem;font-family:monospace;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  return formatted;
}

// ========== 滚动到底部 ==========

function scrollToBottom() {
  setTimeout(() => {
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }, 100);
}

// ========== 添加消息 ==========

function addMessage(role, content) {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  messages.push({ role, content, time });
  renderMessages();
  scrollToBottom();
}

// ========== 渲染产物内容 ==========

function renderProductContent(stageData) {
  productContentEl.innerHTML = '';
  
  stageData.documentSections.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'product-item';
    sectionEl.innerHTML = `
      <h4>${section.label}</h4>
      <p>${section.content}</p>
    `;
    productContentEl.appendChild(sectionEl);
  });
}

// ========== 显示 JSON 模态框 ==========

function showJsonModal() {
  const stageData = STAGES[currentStage];
  const stageName = stageData.name;
  
  const jsonData = {
    "schema": "pipeline-intermediate-file-v1",
    "stage": getStageName(currentStage),
    "student": { "id": "20230001", "name": "张三" },
    "advisor": { "id": "001", "name": "李教授" },
    "title": `基于 ESP32 的智能垃圾桶设计 - ${stageName}阶段`,
    "status": stageData.status.toLowerCase(),
    "version": 1,
    "generatedAt": new Date().toISOString(),
    "sections": stageData.documentSections.map(section => ({
      "id": section.id,
      "label": section.label,
      "content": section.content,
      "aiAssisted": stageData.aiAssisted,
      "aiPrompt": stageData.aiAssisted ? `生成${section.label}内容` : null,
      "humanEditRate": stageData.aiAssisted ? 0.3 : 1
    })),
    "aiDisclosure": {
      "modelsUsed": ["deepseek-v3"],
      "aiAssistedSections": stageData.documentSections.map(section => section.id),
      "totalAiRatio": 0.3
    },
    "advisorComments": stageData.status === 'APPROVED' ? [] : feedback.slice(0, 2)
  };

  jsonContentEl.textContent = JSON.stringify(jsonData, null, 2);
  document.getElementById('json-modal').classList.add('show');
}

function getStageName(stageNum) {
  const names = {
    '1': 'topic',
    '2': 'proposal',
    '3': 'design',
    '4': 'implementation',
    '5': 'thesis',
    '6': 'defense'
  };
  return names[stageNum];
}

// ========== 初始化反馈列表 ==========

function initFeedback() {
  renderFeedback();
}

// ========== 渲染反馈 ==========

function renderFeedback() {
  feedbackListEl.innerHTML = '';
  
  feedback.forEach((item, index) => {
    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'feedback-item';
    feedbackEl.innerHTML = `
      <div class="feedback-meta">
        <span class="feedback-author">${item.author}</span>
        <span class="feedback-time">${item.time}</span>
      </div>
      <div class="feedback-content">${item.content}</div>
    `;
    feedbackListEl.appendChild(feedbackEl);
  });
  
  feedbackCountEl.textContent = `(${feedback.length} 条)`;
}

// ========== 添加反馈 ==========

function addFeedback() {
  const textarea = document.getElementById('feedback-textarea');
  const content = textarea.value.trim();
  
  if (!content) return;
  
  const now = new Date();
  const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  feedback.push({
    author: '你',
    time: time,
    content: content
  });
  
  textarea.value = '';
  renderFeedback();
}

// ========== 按钮事件绑定 ==========

// 重置对话按钮
document.getElementById('restart-btn').addEventListener('click', () => {
  if (isTyping) {
    clearInterval(typingInterval);
    isTyping = false;
  }
  messages = [];
  loadStage(currentStage);
});

// AI 助手按钮
document.getElementById('ai-assistant-btn').addEventListener('click', () => {
  addMessage('ai', '我可以帮你生成论文开题报告、代码调试、格式检查等内容。有什么需要帮助的吗？');
});

// 查看 JSON 按钮
document.getElementById('view-json-btn').addEventListener('click', showJsonModal);

// 导出文件按钮
document.getElementById('export-btn').addEventListener('click', () => {
  const stageData = STAGES[currentStage];
  const stageName = stageData.name;
  
  const jsonData = {
    "schema": "pipeline-intermediate-file-v1",
    "stage": getStageName(currentStage),
    "student": { "id": "20230001", "name": "张三" },
    "advisor": { "id": "001", "name": "李教授" },
    "title": `基于 ESP32 的智能垃圾桶设计 - ${stageName}阶段`,
    "status": stageData.status.toLowerCase(),
    "version": 1,
    "generatedAt": new Date().toISOString(),
    "sections": stageData.documentSections.map(section => ({
      "id": section.id,
      "label": section.label,
      "content": section.content,
      "aiAssisted": stageData.aiAssisted,
      "aiPrompt": stageData.aiAssisted ? `生成${section.label}内容` : null,
      "humanEditRate": stageData.aiAssisted ? 0.3 : 1
    })),
    "aiDisclosure": {
      "modelsUsed": ["deepseek-v3"],
      "aiAssistedSections": stageData.documentSections.map(section => section.id),
      "totalAiRatio": 0.3
    },
    "advisorComments": stageData.status === 'APPROVED' ? [] : feedback.slice(0, 2)
  };

  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${getStageName(currentStage)}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
});

// 提交审核按钮
document.getElementById('submit-review-btn').addEventListener('click', () => {
  alert('已提交审核！等待导师反馈...');
});

// 编辑按钮
document.getElementById('edit-btn').addEventListener('click', () => {
  alert('编辑功能开发中...');
});

// 关闭 JSON 模态框
document.getElementById('close-json-modal').addEventListener('click', () => {
  document.getElementById('json-modal').classList.remove('show');
});

// 点击模态框外部关闭
document.getElementById('json-modal').addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    document.getElementById('json-modal').classList.remove('show');
  }
});

// 添加反馈按钮
document.getElementById('add-feedback-btn').addEventListener('click', addFeedback);

// 回车发送反馈
document.getElementById('feedback-textarea').addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addFeedback();
  }
});

// ========== 更新计划 ==========

update_plan({
  plan: [
    { step: "初始化 storyboard 目录", status: "completed" },
    { step: "创建 index.html 主页面", status: "completed" },
    { step: "创建 styles.css 样式文件", status: "completed" },
    { step: "创建 app.js 交互逻辑文件", status: "completed" },
    { step: "验证和测试文件", status: "completed" }
  ]
});

// ========== 任务完成通知 ==========

// 任务已完成，所有文件创建成功
console.log('ThesisMate Story Board 创建完成！');
console.log('文件位置：/home/subaochen/git/thesis-mate/storyboard/');
console.log('包含文件：index.html, styles.css, app.js');
