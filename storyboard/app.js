/* ============================================
   ThesisMate Story Board - App.js
   Routing, Mock Data, Chat Simulation, Transitions, Particles
   ============================================ */

// ---- Stage Theme Colors ----
const STAGE_COLORS = [
  { primary: '#f59e0b', glow: 'rgba(245,158,11,0.3)',   glowStrong: 'rgba(245,158,11,0.5)', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' }, // 选题
  { primary: '#3b82f6', glow: 'rgba(59,130,246,0.3)',   glowStrong: 'rgba(59,130,246,0.5)', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' }, // 开题
  { primary: '#6366f1', glow: 'rgba(99,102,241,0.3)',   glowStrong: 'rgba(99,102,241,0.5)', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }, // 方案设计
  { primary: '#10b981', glow: 'rgba(16,185,129,0.3)',   glowStrong: 'rgba(16,185,129,0.5)', gradient: 'linear-gradient(135deg, #10b981, #059669)' }, // 实现
  { primary: '#06b6d4', glow: 'rgba(6,182,212,0.3)',    glowStrong: 'rgba(6,182,212,0.5)',  gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' }, // 论文
  { primary: '#ec4899', glow: 'rgba(236,72,153,0.3)',   glowStrong: 'rgba(236,72,153,0.5)', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' }, // 答辩
];

// ---- Stage-specific mock chat data ----
const STAGE_CHAT_DATA = {
  0: [ // 选题 — 方向顾问
    { role: 'ai', emoji: '🧭', content: `欢迎来到选题阶段！🧭\n\n你的专业是电子信息工程，选题需要考虑：\n1. **专业契合度** — 是否与电子信息工程相关\n2. **可行性** — 硬件/软件资源是否可得\n3. **创新性** — 有没有独特的切入点\n\n你有什么感兴趣的方向吗？比如物联网、嵌入式系统、信号处理？` },
    { role: 'user', content: '我对物联网方向比较感兴趣，想做智能家居相关的。' },
    { role: 'ai', emoji: '🧭', content: `智能家居是个好方向！我们来细化一下：\n\n**可选切入点：**\n1. **环境监测系统** — 温湿度、空气质量检测，技术门槛低\n2. **智能安防系统** — 摄像头+传感器联动，有一定复杂度\n3. **智能节能系统** — 用电监测+自动控制，实用性强\n\n考虑到你是本科毕设，我建议选 **环境监测系统** 或 **智能节能系统**，硬件成本可控，软件逻辑清晰。\n\n你对哪个更感兴趣？` },
    { role: 'user', content: '我觉得智能节能系统不错，能具体说说吗？' },
    { role: 'ai', emoji: '🧭', content: `好！智能节能系统的核心思路：\n\n**🏠 项目概念：基于IoT的家庭用电智能管理系统**\n\n• 实时监测各回路电流/电压\n• 识别电器工作状态（待机/运行）\n• 自动切断待机电源，减少"吸血鬼功耗"\n• 手机App查看用电统计和建议\n\n**🔧 核心技术栈：**\n• 主控：ESP32（Wi-Fi + 低功耗）\n• 电流检测：ACS712 或 CT 传感器\n• 继电器控制：光耦隔离继电器模块\n• 云平台：阿里云IoT / 自建MQTT服务器\n\n这个方向既有硬件又有软件，工作量适中，你觉得如何？` },
    { role: 'user', content: '听起来不错！那我们就定这个方向吧。' },
    { role: 'ai', emoji: '🧭', content: `✅ 选题方向已确定：**基于IoT的家庭用电智能管理系统**\n\n接下来我会帮你整理一份选题说明，包括：\n- 选题背景与意义\n- 技术可行性分析\n- 预期成果与创新点\n\n确认选题后，我们进入下一阶段——开题报告撰写。准备好了吗？` }
  ],
  1: [ // 开题 — 文献助手
    { role: 'ai', emoji: '📚', content: `欢迎来到开题阶段！📚\n\n我们需要完成开题报告的几个核心部分：\n1. **研究背景与意义** — 为什么做这个\n2. **国内外研究现状** — 别人做了什么\n3. **研究内容与技术路线** — 你打算怎么做\n4. **进度安排** — 时间节点\n\n我们先从研究背景开始，你已经有了选题方向，我来帮你梳理背景资料。` },
    { role: 'user', content: '好的，研究背景怎么写？' },
    { role: 'ai', emoji: '📚', content: `研究背景可以从这几个维度展开：\n\n**📊 数据支撑：**\n• 据国际能源署(IEA)数据，家庭待机功耗占总用电量的5-10%\n• 中国城镇家庭平均待机功耗约30-50W/户\n• 全国待机功耗年浪费约数百亿度电\n\n**🔬 研究现状：**\n• 国外：Nest、TP-Link Kasa 等智能插座方案\n• 国内：小米智能家居、华为HiLink生态\n• 现有方案多为商业产品，缺乏低成本、可定制的开源方案\n\n**💡 你的切入点：**\n• 面向普通家庭的低成本用电管理方案\n• 结合负载识别技术，自动判断电器状态\n\n需要我帮你找更多相关文献吗？` },
    { role: 'user', content: '帮我列一下开题报告的整体结构吧。' },
    { role: 'ai', emoji: '📚', content: `开题报告标准结构：\n\n**📋 开题报告大纲**\n\n1. 选题背景与研究意义（约800字）\n2. 国内外研究现状与文献综述（约1200字）\n   2.1 智能家居发展现状\n   2.2 用电监测技术\n   2.3 负载识别算法\n3. 研究内容与目标（约500字）\n4. 技术路线与实施方案（约600字）\n5. 预期成果与创新点（约300字）\n6. 进度安排（表格形式）\n7. 参考文献（15-20篇）\n\n你想先从哪部分开始写？` },
    { role: 'user', content: '先写文献综述部分，帮我找几篇关键文献。' },
    { role: 'ai', emoji: '📚', content: `为你推荐以下关键文献方向：\n\n**📖 核心参考文献：**\n\n1. [1] 王明等. "基于物联网的智能家居系统设计". 电子技术应用, 2023.\n   → 系统架构设计参考\n\n2. [2] Zhang L, et al. "Non-intrusive Load Monitoring Based on Deep Learning". IEEE Trans. Smart Grid, 2022.\n   → 负载识别算法参考\n\n3. [3] 李华等. "ESP32在智能家居中的应用". 单片机与嵌入式系统, 2023.\n   → 硬件平台参考\n\n这些文献涵盖了你的技术栈和应用场景。` }
  ],
  2: null, // 方案设计 — uses MOCK_DATA.designChat
  3: [ // 实现 — 代码教练
    { role: 'ai', emoji: '💻', content: `欢迎来到实现阶段！💻\n\n现在你已经有完整的技术方案了，接下来就是动手写代码。\n\n我们先从 ESP32 的传感器数据采集开始，我来帮你搭建基本框架。\n\n你目前开发环境准备好了吗？Arduino IDE 还是 PlatformIO？` },
    { role: 'user', content: '我用的是 Arduino IDE，ESP32 开发板已经连上了。' },
    { role: 'ai', emoji: '💻', content: `好！我们先写一个传感器采集的基础程序：\n\n**📝 第一步：采集电流和温湿度**\n\n\`\`\`cpp\n#include <WiFi.h>\n#include <DHT.h>\n\n#define ACS712_PIN 34\n#define DHT_PIN 15\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(ACS712_PIN, INPUT);\n}\n\nvoid loop() {\n  int adc = analogRead(ACS712_PIN);\n  float current = (adc / 4095.0 * 3.3 - 1.65) / 0.066;\n  Serial.printf("电流: %.2fA\\n", current);\n  delay(2000);\n}\n\`\`\`\n\n试试烧录，看看串口输出是否正常？` },
    { role: 'user', content: '编译通过了，但是电流读数一直是0，怎么回事？' },
    { role: 'ai', emoji: '💻', content: `电流读数为0，我们逐步排查：\n\n**🔍 排查步骤：**\n\n1. **检查接线** — ACS712 的 VCC 接 5V，GND 接 GND，OUT 接 GPIO34\n2. **测量 OUT 引脚电压** — 无电流时应约 1.65V\n3. **ADC 精度** — ESP32 ADC 非线性，建议先校准\n\n**快速测试代码：**\n\`\`\`cpp\nvoid loop() {\n  int raw = analogRead(ACS712_PIN);\n  float voltage = raw / 4095.0 * 3.3;\n  Serial.printf("ADC: %d, 电压: %.3fV\\n", raw, voltage);\n  delay(1000);\n}\n\`\`\`\n\n先跑这个，告诉我读数。` },
    { role: 'user', content: '测了，电压是1.65V，看来传感器没问题，是没接负载。' },
    { role: 'ai', emoji: '💻', content: `✅ 确认传感器工作正常！\n\n接下来接上一个小负载（比如LED灯或手机充电器），再观察电压变化。\n\n**📋 实现阶段任务清单：**\n\n- [x] ESP32 开发环境搭建\n- [x] 传感器数据采集（电流+温湿度）\n- [ ] Wi-Fi 连接 + MQTT 通信\n- [ ] 云平台数据上传\n- [ ] 微信小程序界面\n- [ ] 负载识别算法\n- [ ] 继电器自动控制\n\n下一步我们做 MQTT 通信，把数据发送到云平台。准备好了告诉我！` }
  ],
  4: [ // 论文 — 论文导师
    { role: 'ai', emoji: '✍️', content: `欢迎来到论文阶段！✍️\n\n你的项目实现已经完成了，现在需要把整个过程整理成学术论文。\n\n电子信息工程本科论文通常包含以下结构：\n1. 摘要（中英文）\n2. 引言\n3. 系统总体设计\n4. 硬件设计\n5. 软件设计\n6. 系统测试与分析\n7. 结论\n\n你目前完成了哪些部分？我们一步步来。` },
    { role: 'user', content: '我硬件和软件部分有些草稿，但感觉逻辑比较乱。' },
    { role: 'ai', emoji: '✍️', content: `没问题，我帮你梳理一下逻辑框架：\n\n**📐 论文结构建议：**\n\n**第3章 系统总体设计**\n→ 系统需求分析 → 总体架构 → 功能模块划分\n\n**第4章 硬件设计**（由总到分）\n→ 主控模块 → 传感器模块 → 控制模块 → 电源模块\n\n**第5章 软件设计**（分层描述）\n→ 底层驱动 → 数据采集 → MQTT通信 → 负载识别算法\n\n**第6章 测试与分析**\n→ 单元测试 → 集成测试 → 性能分析\n\n这个顺序是从宏观到微观，评委老师看起来会很有条理。要我从哪一章开始帮你改？` },
    { role: 'user', content: '先帮我看一下摘要部分，我写了但感觉不够精炼。' },
    { role: 'ai', emoji: '✍️', content: `把你的摘要发给我，我帮你润色。\n\n**摘要写作要点：**\n• **背景**：1-2句说明研究背景\n• **目的**：1句说明研究目标\n• **方法**：2-3句说明采用的技术手段\n• **结果**：1-2句说明实现效果\n• **意义**：1句说明应用价值\n\n总字数控制在300-400字。发过来吧，我帮你改。` },
    { role: 'user', content: '"本文设计了一种基于ESP32的家庭用电管理系统，通过电流传感器ACS712采集用电数据，利用Wi-Fi传输到云平台，实现用电监测和智能控制。"' },
    { role: 'ai', emoji: '✍️', content: `你的摘要基础不错，但可以更精炼、更学术化。修改如下：\n\n**修改后：**\n\n> 针对家庭待机功耗浪费问题，本文设计并实现了一种基于物联网的家庭用电智能管理系统。系统以ESP32为主控核心，采用ACS712电流传感器实现非侵入式用电数据采集，通过Wi-Fi及MQTT协议将数据上传至阿里云IoT平台。测试结果表明，系统电流测量误差<5%，响应时间<2s，可有效降低家庭待机功耗约30%。\n\n**主要改进：**\n• 补充了研究背景（待机功耗问题）\n• 增加了具体技术细节（MQTT、阿里云）\n• 补充了测试数据（误差<5%，节能30%）\n• 语言更学术化\n\n感觉怎么样？` }
  ],
  5: [ // 答辩 — 答辩教练
    { role: 'ai', emoji: '🎤', content: `欢迎来到答辩阶段！🎤\n\n你的论文已经完成，现在需要准备答辩了。\n\n答辩通常包括三个环节：\n1. **PPT 汇报**（10-15分钟）\n2. **演示环节**（实物/系统演示）\n3. **问答环节**（评委提问，5-10分钟）\n\n我们先从 PPT 大纲开始，你觉得你的项目亮点在哪里？` },
    { role: 'user', content: '我觉得亮点是成本低、系统完整、有实际测试数据。' },
    { role: 'ai', emoji: '🎤', content: `很好！这三个亮点很有说服力。我来帮你设计 PPT 结构：\n\n**📑 答辩 PPT 大纲（约20页，12分钟）**\n\n1. **封面**（1页）— 题目、姓名、导师\n2. **研究背景**（2页）— 待机功耗问题 + 市场现状\n3. **研究目标**（1页）— 一句话说明你要解决什么\n4. **系统架构**（2页）— 总体架构图 + 模块划分\n5. **硬件设计**（3页）— 电路设计 + 实物照片 + 选型对比\n6. **软件设计**（3页）— 流程图 + 关键代码 + 算法说明\n7. **系统测试**（3页）— 测试数据 + 结果分析\n8. **创新与不足**（1页）— 亮点 + 改进方向\n9. **总结**（1页）\n10. **致谢**（1页）\n\n要不要我帮你细化每一页的内容？` },
    { role: 'user', content: '帮我设计一下系统架构那页 PPT 的内容。' },
    { role: 'ai', emoji: '🎤', content: `**📊 系统架构页 PPT 设计：**\n\n**标题：系统总体架构**\n\n**布局建议：左图右文**\n\n**左侧 — 架构图：**\n\`\`\`\n┌─────────────────────────────┐\n│     微信小程序 (用户界面)     │\n├─────────────────────────────┤\n│   阿里云IoT + MQTT 服务器    │\n├─────────────────────────────┤\n│  ESP32 主控 (Wi-Fi + 采集)  │\n├──────┬──────┬──────┬────────┤\n│电流  │温湿度│继电器│ OLED   │\n└──────┴──────┴──────┴────────┘\n\`\`\`\n\n**右侧 — 要点：**\n• **三层架构**：感知层 → 传输层 → 应用层\n• **数据流**：采集 → 处理 → 上传 → 展示\n• **控制流**：识别 → 决策 → 执行` },
    { role: 'user', content: '评委可能会问什么问题？帮我准备一下。' },
    { role: 'ai', emoji: '🎤', content: `根据你这个项目，评委最可能问的问题：\n\n**🔥 高频问题 & 参考答案：**\n\n**Q1: 为什么选ESP32而不是STM32？**\nA: ESP32集成Wi-Fi/蓝牙，开发成本低，社区生态好。\n\n**Q2: 负载识别算法的准确率如何？**\nA: 在实验室环境下对5种常用电器的识别准确率达到92%。\n\n**Q3: 系统的功耗如何？电池能用多久？**\nA: 工作电流约150mA，睡眠模式约10μA，间歇工作模式可续航约30天。\n\n**Q4: 和市面上的智能插座比有什么优势？**\nA: 成本降低60%（单路<50元），且支持负载识别和自动节能策略。\n\n**💡 答辩技巧：**\n• 被问住时诚实说"这个问题我还需要进一步研究"\n• 演示环节提前录好备用视频，防止现场翻车\n• 控制语速，每页PPT停留40-60秒` }
  ]
};

// ---- Stage-specific artifact panel content ----
const STAGE_ARTIFACTS = {
  0: {
    title: '选题说明：基于IoT的家庭用电智能管理系统',
    fileBadge: 'topic-proposal.json',
    fileSize: '12.8 KB',
    aiRatio: 30,
    editRate: 85,
    completeness: 90,
    completenessLabel: '选题完整度',
    items: [
      { type: 'h3', text: '1. 选题背景' },
      { type: 'p', text: '家庭待机功耗占总用电量的5-10%，全国年浪费数百亿度电。本项目旨在通过IoT技术实现家庭用电智能管理，减少待机能耗。' },
      { type: 'h3', text: '2. 技术可行性' },
      { type: 'p', text: 'ESP32集成Wi-Fi，开发成本低；ACS712电流传感器成熟可靠；阿里云IoT平台提供完善的数据管理能力。整体方案技术风险低。' },
      { type: 'h3', text: '3. 创新点' },
      { type: 'p', text: '• 基于阈值判定的轻量级负载识别\n• 自动待机切断策略\n• 低成本方案（单路<50元）' }
    ]
  },
  1: {
    title: '开题报告：基于IoT的家庭用电智能管理系统',
    fileBadge: 'proposal.json',
    fileSize: '38.5 KB',
    aiRatio: 40,
    editRate: 75,
    completeness: 80,
    completenessLabel: '开题完整度',
    items: [
      { type: 'h3', text: '1. 研究背景与意义' },
      { type: 'p', text: '家庭待机功耗问题日益突出，智能节能是绿色生活的重要方向。' },
      { type: 'h3', text: '2. 文献综述' },
      { type: 'p', text: '引用中外文献18篇，涵盖IoT智能家居、用电监测技术、负载识别算法三个领域。' },
      { type: 'h3', text: '3. 研究方案' },
      { type: 'p', text: '采用ESP32+传感器方案，结合轻量级负载识别算法，实现家庭用电智能管理。' },
      { type: 'h3', text: '4. 进度安排' },
      { type: 'p', text: '第1-2周：方案设计 → 第3-6周：硬件实现 → 第7-8周：软件开发 → 第9-10周：论文撰写 → 第11-12周：答辩准备' }
    ]
  },
  2: null, // 方案设计 — keep existing hardcoded artifacts
  3: {
    title: '实现记录：ESP32智能用电管理系统',
    fileBadge: 'implementation-log.md',
    fileSize: '62.1 KB',
    aiRatio: 50,
    editRate: 65,
    completeness: 78,
    completenessLabel: '代码覆盖率',
    items: [
      { type: 'h3', text: '1. 已完成模块' },
      { type: 'p', text: '✅ 传感器数据采集（电流/温湿度）\n✅ MQTT通信与云平台对接\n✅ 微信小程序基础界面' },
      { type: 'h3', text: '2. 进行中模块' },
      { type: 'p', text: '🔄 负载识别算法开发\n🔄 继电器自动控制逻辑' },
      { type: 'h3', text: '3. 测试数据' },
      { type: 'p', text: '电流测量误差: <5% | 响应时间: <2s | MQTT延迟: ~200ms' }
    ]
  },
  4: {
    title: '论文：基于IoT的家庭用电智能管理系统',
    fileBadge: 'thesis-draft.md',
    fileSize: '85.3 KB',
    aiRatio: 45,
    editRate: 70,
    completeness: 92,
    completenessLabel: '结构完整度',
    items: [
      { type: 'h3', text: '1. 摘要（已完成）' },
      { type: 'p', text: '中英文摘要均已完成，字数符合要求。' },
      { type: 'h3', text: '2. 正文（修改中）' },
      { type: 'p', text: '已完成系统总体设计、硬件设计、软件设计章节。测试章节待补充实验数据。' },
      { type: 'h3', text: '3. 查重率' },
      { type: 'p', text: '当前查重率: 12.5%（要求<15%）' }
    ]
  },
  5: {
    title: '答辩准备：PPT大纲与QA',
    fileBadge: 'defense-ppt-outline.md',
    fileSize: '18.6 KB',
    aiRatio: 35,
    editRate: 80,
    completeness: 70,
    completenessLabel: 'PPT完成度',
    items: [
      { type: 'h3', text: '1. PPT 结构（约20页）' },
      { type: 'p', text: '封面 → 背景 → 目标 → 架构 → 硬件 → 软件 → 测试 → 创新 → 总结 → 致谢' },
      { type: 'h3', text: '2. 高频问答准备' },
      { type: 'p', text: '已准备5个高频问题：ESP32选型理由、识别准确率、系统功耗、竞品对比、安全性保障' },
      { type: 'h3', text: '3. 演示准备' },
      { type: 'p', text: '✅ 实物已调试通过 | ✅ 备用视频已录制 | ⏳ 演示PPT待完善' }
    ]
  }
};

// ---- Mock Data ----
const MOCK_DATA = {
  student: {
    name: '张三',
    id: '2022001',
    major: '电子信息工程',
    advisor: '李教授',
    currentStage: 2, // 0-5: 选题, 开题, 方案设计, 实现, 论文, 答辩
    topic: '基于ESP32的智能垃圾桶设计',
    agents: [
      { emoji: '🧭', name: '方向顾问', stage: '选题', status: 'done' },
      { emoji: '📚', name: '文献助手', stage: '开题', status: 'done' },
      { emoji: '🏗️', name: '架构师', stage: '方案设计', status: 'active' },
      { emoji: '💻', name: '代码教练', stage: '实现', status: 'pending' },
      { emoji: '✍️', name: '论文导师', stage: '论文', status: 'pending' },
      { emoji: '🎤', name: '答辩教练', stage: '答辩', status: 'pending' }
    ],
    aiDisclosure: {
      model: 'deepseek-v3',
      assistedContent: '技术选型对比、架构图、实验方案',
      editRate: 70,
      aiRatio: 55,
      revisionRate: 40,
      adoptionRate: 85,
      qualityImprovement: 70
    },
    metrics: {
      rounds: 7,
      duration: '~40min',
      aiCalls: 6,
      wordCount: 1800
    }
  },
  advisor: {
    name: '李教授',
    students: [
      {
        name: '张三', id: '2022001', topic: '基于ESP32的智能垃圾桶设计',
        stage: 2, aiRatio: 55, editRate: 70, progress: 50
      },
      {
        name: '李四', id: '2022002', topic: '基于树莓派的智能家居系统',
        stage: 1, aiRatio: 60, editRate: 65, progress: 33
      },
      {
        name: '王五', id: '2022003', topic: '基于YOLO的垃圾分类识别',
        stage: 4, aiRatio: 45, editRate: 55, progress: 83
      },
      {
        name: '赵六', id: '2022004', topic: '基于FPGA的数字信号处理系统',
        stage: 1, aiRatio: 70, editRate: 45, progress: 28
      },
      {
        name: '孙七', id: '2022005', topic: '基于51单片机的智能小车',
        stage: 3, aiRatio: 50, editRate: 60, progress: 62
      }
    ],
    agents: [
      { emoji: '📋', name: '审核助手' },
      { emoji: '📊', name: '进度管家' },
      { emoji: '🔔', name: '通知助手' },
      { emoji: '📈', name: '统计助手' }
    ]
  },
  admin: {
    totalStudents: 256,
    totalAdvisors: 48,
    overallProgress: 73,
    laggingCount: 12,
    stageStats: [
      { stage: '选题', count: 256, pct: 100 },
      { stage: '开题', count: 236, pct: 92 },
      { stage: '方案设计', count: 199, pct: 78 },
      { stage: '实现', count: 141, pct: 55 },
      { stage: '论文', count: 59, pct: 23 },
      { stage: '答辩', count: 13, pct: 5 }
    ],
    aiMetrics: {
      avgAiRatio: 55,
      avgEditRate: 63,
      avgAdoptionRate: 82,
      disclosureCoverage: 98,
      qualityImprovement: 35,
      learningCurve: 3.2
    }
  },
  // Chat messages for design stage
  designChat: [
    {
      role: 'ai',
      emoji: '🏗️',
      content: `欢迎来到方案设计阶段！🔧

现在我们需要完成：
1. 系统总体方案设计（架构图、技术选型）
2. 硬件设计方案（电路图、PCB布局）
3. 软件设计方案（模块划分、接口定义）
4. 实验方案设计（测试用例、测试数据）

我们先从"系统总体方案"开始，还是你有其他想法？`
    },
    {
      role: 'user',
      content: '先做系统总体方案，画个架构图。'
    },
    {
      role: 'ai',
      emoji: '🏗️',
      content: `好的！我来帮你设计系统的总体架构。

**系统总体方案**

系统采用分层架构设计，自下而上分为四层：

• **供电层**：18650电池 + TP4056充电管理 + AMS1117稳压
• **感知层**：ESP32-WROOM-32E + 超声波(HC-SR04) + 压力传感器 + DHT11
• **通信层**：Wi-Fi + MQTT协议 → 阿里云IoT平台
• **应用层**：微信小程序 + 云服务器 + MySQL数据库

数据流：传感器采集 → 数据滤波 → 阈值判断 → Wi-Fi上传 → 云平台存储 → 小程序展示

这个架构是否满足需求？我可以继续完善硬件选型对比。`
    },
    {
      role: 'user',
      content: '谢谢，架构图很好。现在帮我做一个硬件选型对比表。'
    },
    {
      role: 'ai',
      emoji: '🏗️',
      content: `好的！我来帮你整理硬件选型对比表。

| 组件 | 型号 | 成本 | 优势 | 推荐程度 |
|------|------|------|------|----------|
| 主控 | ESP32-WROOM-32E | ¥35 | 集成Wi-Fi/BT，生态好 | ★★★★★ |
| 超声波 | HC-SR04 | ¥3 | 成本低，使用简单 | ★★★★☆ |
| 压力 | 应变片+HX711 | ¥8 | 精度高 | ★★★★☆ |
| 通信 | ESP32内置Wi-Fi | 已含 | 集成度高 | ★★★★★ |
| 电源 | 18650+TP4056 | ¥15 | 容量大，可充电 | ★★★★★ |

**推荐方案**：ESP32-WROOM-32E + HC-SR04 + 18650电池

说明：ESP32虽然成本较高，但集成了Wi-Fi和蓝牙，开发简单，社区支持好。

这个选型方案是否合适？`
    },
    {
      role: 'user',
      content: '能帮我再详细写一下ESP32的硬件设计吗？'
    },
    {
      role: 'ai',
      emoji: '🏗️',
      content: `好的！我来帮你详细描述ESP32的硬件设计。

**ESP32硬件设计**

📌 **引脚分配**
• GPIO14 → 超声波TRIG
• GPIO12 → 超声波ECHO  
• GPIO25 → HX711 DT（压力数据）
• GPIO26 → HX711 SCK（压力时钟）
• GPIO15 → DHT11（温湿度）
• GPIO2 → LED指示灯
• GPIO0 → 按键输入

🔋 **电源设计**
• 电池：18650锂电池（3.7V, 2500mAh）
• 充电管理：TP4056模块（过充/过放保护）
• 稳压模块：AMS1117-3.3V
• 工作模式：150mA @ 3.3V
• 睡眠模式：10μA
• 自动休眠：无数据上传时每5分钟休眠3分钟

硬件设计部分已完成，需要我继续设计软件方案吗？`
    }
  ]
};

// ---- Pipeline Stage Names ----
const STAGE_NAMES = ['选题', '开题', '方案设计', '实现', '论文', '答辩'];
const STAGE_ICONS = ['🧭', '📚', '🏗️', '💻', '✍️', '🎤'];
const STAGE_AGENTS = [
  { emoji: '🧭', name: '方向顾问', expertise: '选题方向引导' },
  { emoji: '📚', name: '文献助手', expertise: '文献推荐与框架梳理' },
  { emoji: '🏗️', name: '架构师', expertise: '技术选型与架构设计' },
  { emoji: '💻', name: '代码教练', expertise: '代码调试与测试引导' },
  { emoji: '✍️', name: '论文导师', expertise: '论文结构与逻辑润色' },
  { emoji: '🎤', name: '答辩教练', expertise: 'PPT制作与模拟问答' }
];

// ---- Particle Background ----
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 150)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    // Update and draw particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ---- Chat Simulation ----
class ChatSimulation {
  constructor(containerId, typingId) {
    this.container = document.getElementById(containerId);
    this.typingIndicator = document.getElementById(typingId);
    this.messages = [];
    this.currentIndex = 0;
    this.isTyping = false;
  }

  loadMessages(messages) {
    this.messages = messages;
    this.currentIndex = 0;
    this.renderAll();
  }

  renderAll() {
    this.container.innerHTML = '';
    // Show first 2 messages immediately, then simulate the rest
    this.renderMessage(this.messages[0], true);
    this.renderMessage(this.messages[1], true);
    this.currentIndex = 2;
    this.simulateNext();
  }

  renderMessage(msg, instant = false) {
    if (!msg) return;
    const div = document.createElement('div');
    div.className = `chat-message ${msg.role}`;

    if (msg.role === 'ai') {
      div.innerHTML = `
        <span class="msg-avatar">${msg.emoji}</span>
        <div class="msg-bubble"><p>${msg.content.replace(/\n/g, '<br>')}</p></div>
      `;
    } else {
      div.innerHTML = `
        <div class="msg-bubble"><p>${msg.content}</p></div>
      `;
    }

    if (instant) {
      this.container.appendChild(div);
    } else {
      this.container.appendChild(div);
      div.style.opacity = '0';
      div.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      });
    }

    this.container.scrollTop = this.container.scrollHeight;
  }

  async simulateNext() {
    if (this.currentIndex >= this.messages.length) return;

    const msg = this.messages[this.currentIndex];

    // Show typing indicator
    if (msg.role === 'ai') {
      this.typingIndicator.classList.add('visible');
      await this.delay(800 + Math.random() * 500);
      this.typingIndicator.classList.remove('visible');
    } else {
      this.typingIndicator.classList.add('visible');
      await this.delay(400 + Math.random() * 300);
      this.typingIndicator.classList.remove('visible');
    }

    this.renderMessage(msg);
    this.currentIndex++;

    // Continue with next message
    if (this.currentIndex < this.messages.length) {
      setTimeout(() => this.simulateNext(), 500 + Math.random() * 1000);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ---- Router / Page Navigation ----
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    // Small delay for transition effect
    requestAnimationFrame(() => {
      target.classList.add('active');
    });
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ---- Theme Toggle ----
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  localStorage.setItem('thesis-mate-theme', current === 'dark' ? 'light' : 'dark');
}

// ---- Initialize Welcome Page ----
function initWelcomePage() {
  // Team tabs
  document.querySelectorAll('.team-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.team-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const team = tab.dataset.team;
      document.querySelectorAll('.team-grid').forEach(g => g.classList.remove('active'));
      document.querySelector(`.${team}-team`).classList.add('active');
    });
  });

  // Role selection
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      if (role === 'student') {
        navigateTo('studentDashboard');
        initStudentDashboard();
      } else if (role === 'advisor') {
        navigateTo('advisorDashboard');
        initAdvisorDashboard();
      } else if (role === 'admin') {
        navigateTo('adminDashboard');
        initAdminDashboard();
      }
    });
  });
}

// ---- Initialize Student Dashboard ----
function initStudentDashboard() {
  // Pipeline stage click
  document.querySelectorAll('#studentPipelineBar .pipeline-node').forEach(node => {
    node.addEventListener('click', () => {
      const stage = parseInt(node.dataset.stage);
      updateStageInfo(stage);
      animatePipelineFill(stage);
      updateSidebarAgents(stage);
    });
  });

  // Sidebar nav
  document.querySelectorAll('#studentSidebarNav .sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('#studentSidebarNav .sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Back button
  document.querySelector('[data-back="welcome"]')?.addEventListener('click', () => {
    navigateTo('welcomePage');
  });

  // Prev/Next stage navigation
  const prevBtn = document.querySelector('.stage-nav-btn.prev');
  const nextBtn = document.querySelector('.stage-nav-btn.next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStage > 0) {
        updateStageInfo(currentStage - 1);
        animatePipelineFill(currentStage);
        updateSidebarAgents(currentStage);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStage < 5) {
        updateStageInfo(currentStage + 1);
        animatePipelineFill(currentStage);
        updateSidebarAgents(currentStage);
      }
    });
  }

  // Init chat — save reference for stage switching
  activeChatSim = new ChatSimulation('chatMessages', 'typingIndicator');
  const initialChat = STAGE_CHAT_DATA[currentStage] || MOCK_DATA.designChat;
  activeChatSim.loadMessages(initialChat);

  // Init sidebar agents
  updateSidebarAgents(currentStage);
}

// ---- Update Sidebar Agent Status per Stage ----
function updateSidebarAgents(stage) {
  const container = document.querySelector('.sidebar-agents');
  if (!container) return;
  container.innerHTML = STAGE_AGENTS.map((agent, idx) => {
    let status, statusClass;
    if (idx < stage) { status = '✅'; statusClass = 'done'; }
    else if (idx === stage) { status = '🔵'; statusClass = 'active'; }
    else { status = '⏳'; statusClass = 'pending'; }
    return `<div class="sidebar-agent${idx === stage ? ' active' : ''}">
      <span class="sidebar-agent-avatar">${agent.emoji}</span>
      <span class="sidebar-agent-name">${agent.name}</span>
      <span class="sidebar-agent-status ${statusClass}">${status}</span>
    </div>`;
  }).join('');
}

// ---- Apply Stage Theme Colors ----
let lastStageApplied = -1;

function applyStageTheme(stage) {
  const colors = STAGE_COLORS[stage];
  if (!colors) return;
  const root = document.documentElement.style;
  root.setProperty('--stage-primary', colors.primary);
  root.setProperty('--stage-glow', colors.glow);
  root.setProperty('--stage-glow-strong', colors.glowStrong);
  root.setProperty('--stage-gradient', colors.gradient);

  // Update typing indicator avatar to match current stage agent
  const agent = STAGE_AGENTS[stage];
  const typingAvatar = document.querySelector('.typing-avatar');
  if (typingAvatar) typingAvatar.textContent = agent.emoji;
  const typingText = document.querySelector('.typing-text');
  if (typingText) typingText.textContent = `${agent.name}正在思考...`;

  // Trigger flash animation on stage switch (not on initial load)
  if (lastStageApplied >= 0) {
    const overlay = document.createElement('div');
    overlay.className = 'stage-switch-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 700);
  }
  lastStageApplied = stage;
}

// ---- Update Artifact Panel for Stage ----
function updateArtifacts(stage) {
  const data = STAGE_ARTIFACTS[stage];
  const artifactHeader = document.querySelector('.artifact-header h4');
  const fileBadge = document.querySelector('.file-badge');
  const fileSize = document.querySelector('.file-size');
  const artifactContent = document.getElementById('artifactContent');
  const statBars = document.querySelectorAll('.stat-bar-fill');

  if (!data) return; // stage 2 uses hardcoded HTML

  if (artifactHeader) artifactHeader.textContent = `# ${data.title}`;
  if (fileBadge) fileBadge.textContent = `📄 ${data.fileBadge}`;
  if (fileSize) fileSize.textContent = data.fileSize;

  // Update stat bars (AI ratio, edit rate, completeness)
  if (statBars[0]) statBars[0].style.width = `${data.aiRatio}%`; statBars[0].textContent = `${data.aiRatio}%`;
  if (statBars[1]) statBars[1].style.width = `${data.editRate}%`; statBars[1].textContent = `${data.editRate}%`;
  if (statBars[2]) { statBars[2].style.width = `${data.completeness}%`; statBars[2].textContent = `${data.completeness}%`; }

  // Update stat labels
  const statLabels = document.querySelectorAll('.stat-label');
  if (statLabels[2]) statLabels[2].textContent = data.completenessLabel;

  // Build artifact content
  if (artifactContent) {
    artifactContent.innerHTML = data.items.map(item => {
      if (item.type === 'h3') return `<h3>${item.text}</h3>`;
      if (item.type === 'p') return `<p>${item.text.replace(/\n/g, '<br>')}</p>`;
      return '';
    }).join('');
  }
}

// ---- Update Stage Info (with theme + content switching) ----
let currentStage = MOCK_DATA.student.currentStage;
let activeChatSim = null;

function updateStageInfo(stage) {
  currentStage = stage;

  // Update pipeline nodes
  document.querySelectorAll('#studentPipelineBar .pipeline-node').forEach(node => {
    const s = parseInt(node.dataset.stage);
    node.classList.remove('active', 'active-current');
    if (s <= stage) node.classList.add('active');
    if (s === stage) node.classList.add('active-current');
  });

  // Update stage info bar
  const agent = STAGE_AGENTS[stage];
  const badge = document.querySelector('#studentStageInfo .current-agent-badge');
  badge.innerHTML = `
    <span class="badge-avatar">${agent.emoji}</span>
    <span class="badge-name">${agent.name}</span>
    <span class="badge-expertise">${agent.expertise}</span>
  `;

  // Update stage nav title
  document.querySelector('.stage-nav-title').textContent = `当前: ${STAGE_NAMES[stage]}`;

  // Update prev/next nav buttons
  const prevBtn = document.querySelector('.stage-nav-btn.prev');
  const nextBtn = document.querySelector('.stage-nav-btn.next');
  if (prevBtn) {
    prevBtn.classList.toggle('disabled', stage === 0);
    if (stage > 0) prevBtn.textContent = `← ${STAGE_NAMES[stage - 1]}`;
  }
  if (nextBtn) {
    nextBtn.classList.toggle('disabled', stage === 5);
    if (stage < 5) nextBtn.textContent = `${STAGE_NAMES[stage + 1]} →`;
  }

  // Apply stage theme colors
  applyStageTheme(stage);

  // Switch chat messages
  const chatMessages = STAGE_CHAT_DATA[stage] || MOCK_DATA.designChat;
  if (activeChatSim) {
    activeChatSim.loadMessages(chatMessages);
  }

  // Switch artifact panel
  updateArtifacts(stage);
}

// ---- Initialize Advisor Dashboard ----
function initAdvisorDashboard() {
  document.querySelector('[data-back="welcome"]')?.addEventListener('click', () => {
    navigateTo('welcomePage');
  });

  // Pending review items
  document.querySelectorAll('.pending-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.pending-item').forEach(i => i.style.background = '');
      item.style.background = 'rgba(99, 102, 241, 0.15)';
    });
  });
}

// ---- Initialize Admin Dashboard ----
function initAdminDashboard() {
  document.querySelector('[data-back="welcome"]')?.addEventListener('click', () => {
    navigateTo('welcomePage');
  });

  // Trace tabs
  document.querySelectorAll('.trace-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.trace-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Animate stage stat bars on load
  setTimeout(() => {
    document.querySelectorAll('.stage-stat-fill').forEach(fill => {
      const width = fill.style.width;
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        fill.style.width = width;
      });
    });
  }, 300);
}

// ---- Animate pipeline fill percentage ----
function animatePipelineFill(currentStage) {
  const fill = document.getElementById('studentPipelineFill');
  if (fill) {
    const pct = ((currentStage + 1) / 6) * 100;
    fill.style.width = `${pct}%`;
  }
}

// ---- Main Initialization ----
document.addEventListener('DOMContentLoaded', () => {
  // Particle background
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    new ParticleSystem(canvas);
  }

  // Theme toggle
  const savedTheme = localStorage.getItem('thesis-mate-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('studentThemeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('advisorThemeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('adminThemeToggle')?.addEventListener('click', toggleTheme);

  // Pipeline fill animation
  animatePipelineFill(MOCK_DATA.student.currentStage);

  // Apply initial stage theme (for when student dashboard loads)
  applyStageTheme(MOCK_DATA.student.currentStage);

  // Init welcome page
  initWelcomePage();

  // Animate agent cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.agent-card, .feature-card').forEach(card => {
    observer.observe(card);
  });

  // Pipeline step hover effects
  document.querySelectorAll('.pipeline-step').forEach((step, idx) => {
    step.style.animationDelay = `${idx * 0.1}s`;
  });

  console.log('🎨 ThesisMate Story Board initialized');
});
