# 使用指南

## 类别（Category）

- **agent（智能体工具）**：运行自己的任务循环，根据上一步的发现决定下一步。
- **scanner（扫描器）**：执行一组固定的检查并报告其发现。
- **mcp（MCP 服务器）**：通过模型上下文协议向模型提供工具，由模型来驱动。
- **skill（技能集）**：给模型的提示词与指令，本身没有独立程序。

## 范围（Scope）

- **ad**：Active Directory——本地域身份。
- **agentic**：作为被测对象的 AI 智能体及其运行的循环。
- **api**：应用背后的 HTTP 与 RPC 接口。
- **binary**：已编译的可执行文件与固件。
- **cloud**：云账号及其配置。
- **code**：代码仓库或 diff 中的源码。
- **container**：镜像、镜像仓库及其内部运行的内容。
- **entra**：Entra ID——微软的云端身份。
- **llm**：模型本身——它的提示词、护栏与产出。
- **logging**：测试的记录——覆盖面、发现及其背后的证据。
- **mobile**：iOS 与 Android 应用。
- **modfile**：序列化模型文件，其格式可能携带可执行代码。
- **network**：主机、端口与流量。
- **recon**：在任何东西被测试前，先发现存在什么。
- **redteam**：跨整个地盘的对手模拟。
- **social**：人——钓鱼、借口（pretexting）以及他们会交出的东西。
- **webapp**：面向浏览器的应用。

---

_来源：<https://aisecuritymatrix.com/guide.html>_
