# AI 安全矩阵（AI Security Matrix）

[![数据来源](https://img.shields.io/badge/数据来源-aisecuritymatrix.com-blue)](https://aisecuritymatrix.com)
![项目数](https://img.shields.io/badge/收录项目-65-informational)
[![English](https://img.shields.io/badge/lang-English-lightgrey)](README.md)

> 一份精选的开源 AI 安全测试工具清单，涵盖 LLM 红队平台、智能体化渗透测试系统，以及面向安全的模型上下文协议（MCP）服务器。
>
> 本 README 仅作为目录索引；每个工具的详细信息见 `tools/<slug>.zh.md`。
>
_最近更新：2026-09-18 02:49 UTC（由 GitHub Actions 自动同步）_

共收录 **65** 个开源项目：

- [智能体工具](#agent) — 22（自主运行或多步骤编排的 AI 工具）
- [扫描器](#scanner) — 20（基于规则或 LLM 的检测与评估工具）
- [MCP 服务器](#mcp) — 14（模型上下文协议（MCP）工具服务器）
- [技能集](#skill) — 9（智能体技能包、提示词与剧本）

## 静态页面

| 页面 | 说明 |
|---|---|
| [关于 (about.zh.md)](about.zh.md) | 站点背景与收录标准 |
| [使用指南 (guide.zh.md)](guide.zh.md) | 维度、范围与图例说明 |
| [贡献 (contribute.zh.md)](contribute.zh.md) | 提交与贡献指引 |
| [商业方案 (commercial.zh.md)](commercial.zh.md) | 商业化相关信息 |

## 分类目录

### agent · 智能体工具

_自主运行或多步骤编排的 AI 工具_

| 项目 | Stars | 更新 | 描述 | 作用范围/特征 |
|:---|---:|:---|:---|:---|
| [strix](tools/usestrix-strix.zh.md)<br><sub>usestrix</sub> | 63k | today | Open-source AI penetration testing tool to find and fix your app’s vulnerabilities. | `webapp`（浏览器应用） / `api`（HTTP/RPC 接口） / `code`（源代码） / *root* / *credentials* |
| [pentagi](tools/vxcontrol-pentagi.zh.md)<br><sub>vxcontrol</sub> | 25k | 7d | Fully autonomous AI Agents system capable of performing complex penetration testing tasks | `webapp`（浏览器应用） / `network`（主机/端口/流量） / `recon`（信息收集） / *root* / *credentials* |
| [PentestGPT](tools/greydgl-pentestgpt.zh.md)<br><sub>GreyDGL</sub> | 16k | 65d | Automated Penetration Testing Agentic Framework Powered by Large Language Models | `webapp`（浏览器应用） / `network`（主机/端口/流量） / `recon`（信息收集） / *root* |
| [cai](tools/aliasrobotics-cai.zh.md)<br><sub>aliasrobotics</sub> | 9.8k | archived | Cybersecurity AI (CAI), the framework for AI Security | `network`（主机/端口/流量） / `webapp`（浏览器应用） / `recon`（信息收集） / *root* / *credentials* |
| [CyberStrikeAI](tools/aipentest-cyberstrikeai.zh.md)<br><sub>AIPentest</sub> | 6.8k | 1d | The system of action for AI-native cybersecurity—where intent becomes governed execution, evidence becomes operational memory, and every operation improves the next. | `network`（主机/端口/流量） / `webapp`（浏览器应用） / *root* / *credentials* |
| [Decepticon](tools/purpleailab-decepticon.zh.md)<br><sub>PurpleAILAB</sub> | 5.5k | 18d | Autonomous Hacking Agent for Red Team | `redteam`（攻击模拟） / `network`（主机/端口/流量） / `webapp`（浏览器应用） / *root* / *credentials* |
| [pentestagent](tools/gh05tcrew-pentestagent.zh.md)<br><sub>GH05TCREW</sub> | 3.1k | 10d | PentestAgent is an AI agent framework for black-box security testing, supporting bug bounty, red-team, and penetration testing workflows. | `webapp`（浏览器应用） / `api`（HTTP/RPC 接口） / *root* |
| [Pentest-Swarm-AI](tools/armur-ai-pentest-swarm-ai.zh.md)<br><sub>Armur-Ai</sub> | 2.5k | 1d | Autonomous penetration testing using a swarm of AI agents. Orchestrates recon, classification, exploitation, and reporting specialists with ReAct reasoning — supports bug bounty, continuous monitoring, and CTF modes. Built with Go and 7+ native security tools. | `webapp`（浏览器应用） / `network`（主机/端口/流量） / `recon`（信息收集） / *root* |
| [redamon](tools/samugit83-redamon.zh.md)<br><sub>samugit83</sub> | 2.5k | 1d | An AI-powered agentic red team framework that automates offensive security operations, from reconnaissance to exploitation to post-exploitation, with zero human intervention. | `redteam`（攻击模拟） / `ad`（Active Directory 域） / `network`（主机/端口/流量） / `recon`（信息收集） / *root* / *credentials* |
| [pentest-ai](tools/0xsteph-pentest-ai.zh.md)<br><sub>0xSteph</sub> | 1.7k | 4d | Open-source AI pentester that proves every finding. Machine oracles re-run each exploit; verified bugs ship a proof capsule you can replay yourself. | `webapp`（浏览器应用） / `network`（主机/端口/流量） / *root* |
| [pentest-copilot](tools/bugbasesecurity-pentest-copilot.zh.md)<br><sub>bugbasesecurity</sub> | 1.5k | 34d | Pentest Copilot is an AI-powered browser based ethical hacking assistant tool designed to streamline pentesting workflows. | `webapp`（浏览器应用） / *root* / *credentials* |
| [hackingBuddyGPT](tools/ipa-lab-hackingbuddygpt.zh.md)<br><sub>ipa-lab</sub> | 1.2k | 4d | Helping Ethical Hackers use LLMs in 50 Lines of Code or less.. | `network`（主机/端口/流量） / *root* |
| [nebula](tools/berylliumsec-nebula.zh.md)<br><sub>berylliumsec</sub> | 1.1k | today | AI-powered penetration testing assistant for automating recon, note-taking, and vulnerability analysis. | `network`（主机/端口/流量） / `recon`（信息收集） / *root* |
| [xalgorix](tools/xalgorix-xalgorix.zh.md)<br><sub>xalgorix</sub> | 1.1k | 2d | Autonomous AI pentesting agents — real-time reconnaissance, vulnerability detection, and exploitation orchestration. Go + TypeScript. | `recon`（信息收集） / `webapp`（浏览器应用） / `network`（主机/端口/流量） / *root* / *credentials* |
| [AdStrike](tools/capture0x-adstrike.zh.md)<br><sub>capture0x</sub> | 354 | 98d | AI-powered modular Active Directory red-team framework for authorized penetration testing, AD enumeration, attack-path analysis, Kerberos/ADCS workflows, reporting, operator automation, and MCP server integration. | `ad`（Active Directory 域） / *root* / *credentials* |
| [RedteamAgent](tools/neothecapt-redteamagent.zh.md)<br><sub>NeoTheCapt</sub> | 132 | 46d | An AI red-team agent for authorized labs and web app pentesting workflows. Turns Claude Code / OpenCode / Codex into a structured recon → test → exploit → report workflow, with containerized tools and resumable state. | `webapp`（浏览器应用） / `redteam`（攻击模拟） / *credentials* |
| [ares](tools/dreadnode-ares.zh.md)<br><sub>dreadnode</sub> | 76 | 1d | Ares is an autonomous security operations platform where LLM-driven red and blue team agents operate against each other on live infrastructure, enabling realistic evaluation of attack and defense. | `ad`（Active Directory 域） / `network`（主机/端口/流量） / `redteam`（攻击模拟） / *root* / *credentials* |
| [LLMtary](tools/chetstriker-llmtary.zh.md)<br><sub>chetstriker</sub> | 35 | 159d | Autonomous AI-powered penetration testing platform. LLM-driven recon, vulnerability analysis, and exploit validation for internal &amp; external targets. Supports local AI (Ollama, LM Studio) and cloud models (Claude, GPT-4, Gemini). Linux · macOS · Windows | `recon`（信息收集） / `webapp`（浏览器应用） / *root* |
| [Sage](tools/mythicagents-sage.zh.md)<br><sub>MythicAgents</sub> | 25 | 22d | Sage is a virtual Mythic agent that that uses an AI agentic system to operate Mythic and Mythic agents running on compromised hosts. | `redteam`（攻击模拟） / `ad`（Active Directory 域） / *root* / *credentials* |
| [rift](tools/cettocdx-rift.zh.md)<br><sub>cettocdx</sub> | 11 | 85d | RIFT - Autonomous AI Penetration Testing Agent | `webapp`（浏览器应用） / `network`（主机/端口/流量） / *root* |
| [AI-Pentest-Agent](tools/mayank-dev-15-ai-pentest-agent.zh.md)<br><sub>mayank-dev-15</sub> | 3 | 86d | Autonomous AI penetration testing agent with scanning, reconnaissance, and exploitation modules | `webapp`（浏览器应用） / `recon`（信息收集） |
| [nightly](tools/nightlysec-nightly.zh.md)<br><sub>Nightlysec</sub> | 1 | 35d | Autonomous AI penetration testing agent | `webapp`（浏览器应用） / `api`（HTTP/RPC 接口） / `code`（源代码） / *root* / *credentials* |

### scanner · 扫描器

_基于规则或 LLM 的检测与评估工具_

| 项目 | Stars | 更新 | 描述 | 作用范围/特征 |
|:---|---:|:---|:---|:---|
| [promptfoo](tools/promptfoo-promptfoo.zh.md)<br><sub>promptfoo</sub> | 25k | today | Test your prompts, agents, and RAGs. Red teaming/pentesting/vulnerability scanning for AI. Compare performance of GPT, Claude, Gemini, DeepSeek, and more. Simple declarative configs with command line and CI/CD integration. Used by OpenAI and Anthropic. | `llm`（大模型本身） / `agentic`（智能体及其循环） / *root* / *credentials* |
| [garak](tools/nvidia-garak.zh.md)<br><sub>NVIDIA</sub> | 9.3k | 1d | the LLM vulnerability scanner | `llm`（大模型本身） / *root* |
| [AI-Infra-Guard](tools/tencent-ai-infra-guard.zh.md)<br><sub>Tencent</sub> | 6.4k | today | A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation. | `llm`（大模型本身） / `agentic`（智能体及其循环） / *root* / *credentials* |
| [PyRIT](tools/microsoft-pyrit.zh.md)<br><sub>microsoft</sub> | 4.5k | 1d | The Python Risk Identification Tool for generative AI (PyRIT) is an open source framework built to empower security professionals and engineers to proactively identify risks in generative AI systems. | `llm`（大模型本身） / *root* |
| [agent-scan](tools/snyk-agent-scan.zh.md)<br><sub>snyk</sub> | 3.1k | today | Security scanner for AI agents, MCP servers and agent skills. | `agentic`（智能体及其循环） / *root* / *credentials* |
| [vulnhuntr](tools/protectai-vulnhuntr.zh.md)<br><sub>protectai</sub> | 2.8k | 1.6y | Zero shot vulnerability discovery using LLMs | `code`（源代码） |
| [deepteam](tools/confident-ai-deepteam.zh.md)<br><sub>confident-ai</sub> | 2.8k | 27d | DeepTeam is a framework to red team LLMs and AI agents. | `llm`（大模型本身） / `agentic`（智能体及其循环） |
| [agentic_security](tools/msoedov-agentic_security.zh.md)<br><sub>msoedov</sub> | 2.0k | 6d | Agentic LLM Vulnerability Scanner / AI red teaming kit 🧪 | `llm`（大模型本身） / `agentic`（智能体及其循环） |
| [FuzzyAI](tools/cyberark-fuzzyai.zh.md)<br><sub>cyberark</sub> | 1.6k | 223d | A powerful tool for automated LLM fuzzing. It is designed to help developers and security researchers identify and mitigate potential jailbreaks in their LLM APIs. | `llm`（大模型本身） |
| [promptmap](tools/utkusen-promptmap.zh.md)<br><sub>utkusen</sub> | 1.3k | 290d | a security scanner for custom LLM applications | `llm`（大模型本身） |
| [power-pwn](tools/mbrg-power-pwn.zh.md)<br><sub>mbrg</sub> | 1.2k | 270d | An offensive/defense security toolset for discovery, recon and ethical assessment of AI Agents | `cloud`（云账号） / `llm`（大模型本身） / *root* |
| [agentic-radar](tools/splx-ai-agentic-radar.zh.md)<br><sub>splx-ai</sub> | 1.1k | 294d | A security scanner for your LLM agentic workflows | `agentic`（智能体及其循环） |
| [mcp-scanner](tools/cisco-ai-defense-mcp-scanner.zh.md)<br><sub>cisco-ai-defense</sub> | 1.1k | today | Scan MCP servers for potential threats &amp; security findings. | `agentic`（智能体及其循环） / *root* / *credentials* |
| [counterfit](tools/azure-counterfit.zh.md)<br><sub>Azure</sub> | 939 | 1.2y | a CLI that provides a generic automation layer for assessing the security of ML models | `llm`（大模型本身） / *root* |
| [modelscan](tools/protectai-modelscan.zh.md)<br><sub>protectai</sub> | 774 | 211d | Protection against Model Serialization Attacks | `modfile`（序列化模型文件） / *credentials* |
| [fickling](tools/trailofbits-fickling.zh.md)<br><sub>trailofbits</sub> | 669 | 7d | A Python pickling decompiler and static analyzer | `modfile`（序列化模型文件） / *credentials* |
| [AgentHound](tools/adithyan-ak-agenthound.zh.md)<br><sub>adithyan-ak</sub> | 436 | 5d | Offensive security framework for AI agent infrastructure - recon, credential looting, model exfiltration, poisoning, and attack-path analysis across MCP, A2A, gateways, and AI services. BloodHound for the agentic stack. | `agentic`（智能体及其循环） / *root* / *credentials* |
| [picklescan](tools/mmaitre314-picklescan.zh.md)<br><sub>mmaitre314</sub> | 423 | 16d | Security scanner detecting Python Pickle files performing suspicious actions | `modfile`（序列化模型文件） |
| [aisbom](tools/lab700xorg-aisbom.zh.md)<br><sub>Lab700xOrg</sub> | 79 | 2d | Static security scanner for ML model files — detects pickle bombs, Keras Lambda RCE and GGUF template injection, and generates CycloneDX / SPDX AI-BOMs (AIBOM) as EU AI Act, CRA and FDA §524B evidence. | `modfile`（序列化模型文件） |
| [modelaudit](tools/promptfoo-modelaudit.zh.md)<br><sub>promptfoo</sub> | 72 | 1d | Security scanner for AI/ML model files. Detects malicious code, backdoors, and vulnerabilities before deployment | `modfile`（序列化模型文件） / *root* / *credentials* |

### mcp · MCP 服务器

_模型上下文协议（MCP）工具服务器_

| 项目 | Stars | 更新 | 描述 | 作用范围/特征 |
|:---|---:|:---|:---|:---|
| [ida-pro-mcp](tools/mrexodia-ida-pro-mcp.zh.md)<br><sub>mrexodia</sub> | 12k | 1d | AI-powered reverse engineering assistant that bridges IDA Pro with language models through MCP. | `binary`（二进制/固件） |
| [hexstrike-ai](tools/0x4m4-hexstrike-ai.zh.md)<br><sub>0x4m4</sub> | 12k | 45d | HexStrike AI MCP Agents is an advanced MCP server that lets AI agents (Claude, GPT, Copilot, etc.) autonomously run 150+ cybersecurity tools for automated pentesting, vulnerability discovery, bug bounty automation, and security research. Seamlessly bridge LLMs with real-world offensive security capabilities. | `webapp`（浏览器应用） / `network`（主机/端口/流量） / `recon`（信息收集） / `binary`（二进制/固件） / *root* |
| [GhidraMCP](tools/lauriewired-ghidramcp.zh.md)<br><sub>LaurieWired</sub> | 10k | 1.2y | MCP Server for Ghidra | `binary`（二进制/固件） |
| [mcp-server](tools/portswigger-mcp-server.zh.md)<br><sub>PortSwigger</sub> | 1.2k | 20d | MCP Server for Burp | `webapp`（浏览器应用） / `api`（HTTP/RPC 接口） |
| [MCP-Kali-Server](tools/wh0am123-mcp-kali-server.zh.md)<br><sub>Wh0am123</sub> | 826 | 184d | MCP configuration to connect AI agent to a Linux machine. | `network`（主机/端口/流量） / `webapp`（浏览器应用） / *root* |
| [mcp-security-hub](tools/fuzzinglabs-mcp-security-hub.zh.md)<br><sub>FuzzingLabs</sub> | 791 | 162d | A growing collection of MCP servers bringing offensive security tools to AI assistants. Nmap, Ghidra, Nuclei, SQLMap, Hashcat and more. | `network`（主机/端口/流量） / `webapp`（浏览器应用） / `binary`（二进制/固件） / *root* / *credentials* |
| [MetasploitMCP](tools/gh05tcrew-metasploitmcp.zh.md)<br><sub>GH05TCREW</sub> | 728 | 224d | MCP Server for Metasploit | `network`（主机/端口/流量） |
| [mcp-for-security](tools/cyproxio-mcp-for-security.zh.md)<br><sub>cyproxio</sub> | 631 | archived | MCP for Security: A collection of Model Context Protocol servers for popular security tools like SQLMap, FFUF, NMAP, Masscan and more. Integrate security testing and penetration testing into AI workflows. | `webapp`（浏览器应用） / `network`（主机/端口/流量） / `recon`（信息收集） |
| [BloodHound-MCP-AI](tools/mordavid-bloodhound-mcp-ai.zh.md)<br><sub>MorDavid</sub> | 376 | 1.3y | BloodHound-MCP-AI is integration that connects BloodHound with AI through Model Context Protocol, allowing security professionals to analyze Active Directory attack paths using natural language instead of complex Cypher queries. | `ad`（Active Directory 域） |
| [bloodhound_mcp](tools/mwnickerson-bloodhound_mcp.zh.md)<br><sub>mwnickerson</sub> | 131 | 29d | A Model Context Protocol (MCP) server to converse with data in Bloodhound | `ad`（Active Directory 域） |
| [NetExec-mcp](tools/mpgn-netexec-mcp.zh.md)<br><sub>mpgn</sub> | 78 | 11d | NetExec MCP | `ad`（Active Directory 域） / `network`（主机/端口/流量） |
| [roadrecon_mcp_server](tools/atomicchonk-roadrecon_mcp_server.zh.md)<br><sub>atomicchonk</sub> | 52 | 1.5y | Claude MCP server to perform analysis on ROADrecon data | `entra`（Entra ID 云身份） / `cloud`（云账号） |
| [zebbern-kali-mcp](tools/zebbern-zebbern-kali-mcp.zh.md)<br><sub>zebbern</sub> | 47 | 12d | MCP server for Kali Linux penetration testing - 121 tools for AI-assisted security testing - Giving Agents access to full pentesting tools | `network`（主机/端口/流量） / `webapp`（浏览器应用） / `recon`（信息收集） / *root* / *credentials* |
| [red-clippy](tools/cspf-founder-red-clippy.zh.md)<br><sub>CSPF-Founder</sub> | 28 | 16d | open-source pentest management built to be operated by an AI agent | `redteam`（攻击模拟） / `logging`（测试记录/证据） / *root* |

### skill · 技能集

_智能体技能包、提示词与剧本_

| 项目 | Stars | 更新 | 描述 | 作用范围/特征 |
|:---|---:|:---|:---|:---|
| [skills](tools/trailofbits-skills.zh.md)<br><sub>trailofbits</sub> | 7.1k | 1d | Trail of Bits Claude Code skills for security research, vulnerability detection, and audit workflows | `agentic`（智能体及其循环） / `binary`（二进制/固件） / `code`（源代码） / `webapp`（浏览器应用） / *root* / *credentials* |
| [pentest-ai-agents](tools/0xsteph-pentest-ai-agents.zh.md)<br><sub>0xSteph</sub> | 2.2k | 32d | Turn Claude Code into your offensive security research assistant. Specialized AI subagents for authorized penetration testing plan engagements, analyze recon, research exploits, build detections, audit STIGs, and write reports. | `redteam`（攻击模拟） / `recon`（信息收集） / *root* / *credentials* |
| [skills](tools/specterops-skills.zh.md)<br><sub>SpecterOps</sub> | 628 | 14d | A marketplace for LLM skills | `ad`（Active Directory 域） / `binary`（二进制/固件） / `code`（源代码） / `entra`（Entra ID 云身份） / `network`（主机/端口/流量） / `recon`（信息收集） / `redteam`（攻击模拟） / `social`（社会工程） / `webapp`（浏览器应用） / *root* / *credentials* |
| [Claude-Code-CyberSecurity-Skill](tools/masriyan-claude-code-cybersecurity-skill.zh.md)<br><sub>Masriyan</sub> | 425 | 10d | 22 production-quality Claude Code Skills for cybersecurity professionals — covering offensive security, defensive operations, reverse engineering, threat hunting, threat intelligence, purple team / adversary emulation, CSOC automation, AI/LLM security, mobile, OT/ICS, GRC, software supply chain security, and more. | `redteam`（攻击模拟） / `binary`（二进制/固件） / `llm`（大模型本身） / *root* |
| [cybersecurity-skills](tools/briiirussell-cybersecurity-skills.zh.md)<br><sub>briiirussell</sub> | 393 | 113d | Cybersecurity skills for AI coding agents (Claude Code, Cursor, Codex) | `recon`（信息收集） / `webapp`（浏览器应用） / *root* |
| [offensive-claude](tools/hypnguyen1209-offensive-claude.zh.md)<br><sub>hypnguyen1209</sub> | 367 | 1d | Offensive security toolkit for Claude Code covering red team, exploit dev, AD attacks, EDR bypass, mobile pentest | `redteam`（攻击模拟） / `ad`（Active Directory 域） / *root* / *credentials* |
| [Claude-AD](tools/adscanpro-claude-ad.zh.md)<br><sub>ADScanPro</sub> | 201 | 24d | Active Directory pentest methodology for Claude Code: skills, agents and slash commands for internal AD red-team work (Kerberoasting, ADCS ESC1-17, DCSync, ACL abuse, NTLM relay, delegation), with per-technique OPSEC/telemetry notes. Drives netexec, impacket, certipy, bloodyAD, BloodHound CE. | `ad`（Active Directory 域） / *root* |
| [secskills](tools/trilwu-secskills.zh.md)<br><sub>trilwu</sub> | 143 | 13d | Transform Claude Code into your personal security engineer | `redteam`（攻击模拟） / `code`（源代码） / *root* / *credentials* |
| [security-skills-claude-code](tools/security-phoenix-demo-security-skills-claude-code.zh.md)<br><sub>Security-Phoenix-demo</sub> | 74 | 6d | This repository is a curated collection of skills, plugins, and automation pipelines designed for Claude Code — Anthropic's CLI for AI-assisted software engineering. It was built by the engineering and security engineering teams at Phoenix Security and released as open source so that security professionals, DevSecOps engineers, AppSec teams | `code`（源代码） / *root* |

---

## 数据文件

- [`tools.json`](tools.json) — 包含所有 65+ 工具的完整结构化 JSON 数据集

原始分类目录由 [aisecuritymatrix.com](https://aisecuritymatrix.com) 维护。本仓库为独立的社区镜像。