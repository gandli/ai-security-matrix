# AI Security Matrix

[![source](https://img.shields.io/badge/source-aisecuritymatrix.com-blue)](https://aisecuritymatrix.com)
![projects](https://img.shields.io/badge/projects-65-informational)
[![中文文档](https://img.shields.io/badge/lang-中文-lightgrey)](README.zh.md)

> A curated directory of open-source AI-enabled security testing tools, LLM red-teaming platforms, agentic pentesting systems, and security-focused Model Context Protocol (MCP) servers.
>
> Full mirror of [aisecuritymatrix.com](https://aisecuritymatrix.com). This README serves as a directory index only; each tool's detail page lives in `tools/<slug>.md`.
>
_Last updated: 2026-09-18 02:49 UTC (automatically synced via GitHub Actions)_

**65** open-source projects, grouped by category:

- [Agents](#agent) — 22 (Autonomous / multi-step AI orchestration)
- [Scanners](#scanner) — 20 (Rule / LLM-assisted detection & evaluation)
- [MCP Servers](#mcp) — 14 (Model Context Protocol tool servers)
- [Skills](#skill) — 9 (Agent skill bundles, prompts & playbooks)

## Static Pages

| Page | Description |
|---|---|
| [About](about.md) | Background and criteria |
| [Guide](guide.md) | Dimensions, scopes, and taxonomy |
| [Contribute](contribute.md) | Submissions instructions |
| [Commercial](commercial.md) | Commercial solutions |

## Categories

### agent · Agents

_Autonomous / multi-step AI orchestration_

| Project | Stars | Updated | Description | Scopes & traits |
|:---|---:|:---|:---|:---|
| [strix](tools/usestrix-strix.md)<br><sub>usestrix</sub> | 63k | today | Open-source AI penetration testing tool to find and fix your app’s vulnerabilities. | `webapp` `api` `code` *root* *credentials* _installs_ ~calls out~ |
| [pentagi](tools/vxcontrol-pentagi.md)<br><sub>vxcontrol</sub> | 25k | 7d | Fully autonomous AI Agents system capable of performing complex penetration testing tasks | `webapp` `network` `recon` *root* *credentials* _binaries_ _installs_ |
| [PentestGPT](tools/greydgl-pentestgpt.md)<br><sub>GreyDGL</sub> | 16k | 65d | Automated Penetration Testing Agentic Framework Powered by Large Language Models | `webapp` `network` `recon` *root* _installs_ |
| [cai](tools/aliasrobotics-cai.md)<br><sub>aliasrobotics</sub> | 9.8k | archived | Cybersecurity AI (CAI), the framework for AI Security | `network` `webapp` `recon` *root* *credentials* _installs_ |
| [CyberStrikeAI](tools/aipentest-cyberstrikeai.md)<br><sub>AIPentest</sub> | 6.8k | 1d | The system of action for AI-native cybersecurity—where intent becomes governed execution, evidence becomes operational memory, and every operation improves the next. | `network` `webapp` *root* *credentials* _installs_ ~opaque~ |
| [Decepticon](tools/purpleailab-decepticon.md)<br><sub>PurpleAILAB</sub> | 5.5k | 18d | Autonomous Hacking Agent for Red Team | `redteam` `network` `webapp` *root* *credentials* _installs_ ~calls out~ |
| [pentestagent](tools/gh05tcrew-pentestagent.md)<br><sub>GH05TCREW</sub> | 3.1k | 10d | PentestAgent is an AI agent framework for black-box security testing, supporting bug bounty, red-team, and penetration testing workflows. | `webapp` `api` *root* |
| [Pentest-Swarm-AI](tools/armur-ai-pentest-swarm-ai.md)<br><sub>Armur-Ai</sub> | 2.5k | 1d | Autonomous penetration testing using a swarm of AI agents. Orchestrates recon, classification, exploitation, and reporting specialists with ReAct reasoning — supports bug bounty, continuous monitoring, and CTF modes. Built with Go and 7+ native security tools. | `webapp` `network` `recon` *root* _installs_ |
| [redamon](tools/samugit83-redamon.md)<br><sub>samugit83</sub> | 2.5k | 1d | An AI-powered agentic red team framework that automates offensive security operations, from reconnaissance to exploitation to post-exploitation, with zero human intervention. | `redteam` `ad` `network` `recon` *root* *credentials* _installs_ ~calls out~ ~opaque~ |
| [pentest-ai](tools/0xsteph-pentest-ai.md)<br><sub>0xSteph</sub> | 1.7k | 4d | Open-source AI pentester that proves every finding. Machine oracles re-run each exploit; verified bugs ship a proof capsule you can replay yourself. | `webapp` `network` *root* _installs_ |
| [pentest-copilot](tools/bugbasesecurity-pentest-copilot.md)<br><sub>bugbasesecurity</sub> | 1.5k | 34d | Pentest Copilot is an AI-powered browser based ethical hacking assistant tool designed to streamline pentesting workflows. | `webapp` *root* *credentials* _installs_ |
| [hackingBuddyGPT](tools/ipa-lab-hackingbuddygpt.md)<br><sub>ipa-lab</sub> | 1.2k | 4d | Helping Ethical Hackers use LLMs in 50 Lines of Code or less.. | `network` *root* |
| [nebula](tools/berylliumsec-nebula.md)<br><sub>berylliumsec</sub> | 1.1k | today | AI-powered penetration testing assistant for automating recon, note-taking, and vulnerability analysis. | `network` `recon` *root* ~calls out~ |
| [xalgorix](tools/xalgorix-xalgorix.md)<br><sub>xalgorix</sub> | 1.1k | 2d | Autonomous AI pentesting agents — real-time reconnaissance, vulnerability detection, and exploitation orchestration. Go + TypeScript. | `recon` `webapp` `network` *root* *credentials* _installs_ ~calls out~ |
| [AdStrike](tools/capture0x-adstrike.md)<br><sub>capture0x</sub> | 354 | 98d | AI-powered modular Active Directory red-team framework for authorized penetration testing, AD enumeration, attack-path analysis, Kerberos/ADCS workflows, reporting, operator automation, and MCP server integration. | `ad` *root* *credentials* |
| [RedteamAgent](tools/neothecapt-redteamagent.md)<br><sub>NeoTheCapt</sub> | 132 | 46d | An AI red-team agent for authorized labs and web app pentesting workflows. Turns Claude Code / OpenCode / Codex into a structured recon → test → exploit → report workflow, with containerized tools and resumable state. | `webapp` `redteam` *credentials* |
| [ares](tools/dreadnode-ares.md)<br><sub>dreadnode</sub> | 76 | 1d | Ares is an autonomous security operations platform where LLM-driven red and blue team agents operate against each other on live infrastructure, enabling realistic evaluation of attack and defense. | `ad` `network` `redteam` *root* *credentials* _installs_ ~opaque~ |
| [LLMtary](tools/chetstriker-llmtary.md)<br><sub>chetstriker</sub> | 35 | 159d | Autonomous AI-powered penetration testing platform. LLM-driven recon, vulnerability analysis, and exploit validation for internal &amp; external targets. Supports local AI (Ollama, LM Studio) and cloud models (Claude, GPT-4, Gemini). Linux · macOS · Windows | `recon` `webapp` *root* _installs_ |
| [Sage](tools/mythicagents-sage.md)<br><sub>MythicAgents</sub> | 25 | 22d | Sage is a virtual Mythic agent that that uses an AI agentic system to operate Mythic and Mythic agents running on compromised hosts. | `redteam` `ad` *root* *credentials* _installs_ |
| [rift](tools/cettocdx-rift.md)<br><sub>cettocdx</sub> | 11 | 85d | RIFT - Autonomous AI Penetration Testing Agent | `webapp` `network` *root* _binaries_ _installs_ ~calls out~ |
| [AI-Pentest-Agent](tools/mayank-dev-15-ai-pentest-agent.md)<br><sub>mayank-dev-15</sub> | 3 | 86d | Autonomous AI penetration testing agent with scanning, reconnaissance, and exploitation modules | `webapp` `recon` |
| [nightly](tools/nightlysec-nightly.md)<br><sub>Nightlysec</sub> | 1 | 35d | Autonomous AI penetration testing agent | `webapp` `api` `code` *root* *credentials* _installs_ ~calls out~ |

### scanner · Scanners

_Rule / LLM-assisted detection & evaluation_

| Project | Stars | Updated | Description | Scopes & traits |
|:---|---:|:---|:---|:---|
| [promptfoo](tools/promptfoo-promptfoo.md)<br><sub>promptfoo</sub> | 25k | today | Test your prompts, agents, and RAGs. Red teaming/pentesting/vulnerability scanning for AI. Compare performance of GPT, Claude, Gemini, DeepSeek, and more. Simple declarative configs with command line and CI/CD integration. Used by OpenAI and Anthropic. | `llm` `agentic` *root* *credentials* _installs_ ~calls out~ ~opaque~ |
| [garak](tools/nvidia-garak.md)<br><sub>NVIDIA</sub> | 9.3k | 1d | the LLM vulnerability scanner | `llm` *root* |
| [AI-Infra-Guard](tools/tencent-ai-infra-guard.md)<br><sub>Tencent</sub> | 6.4k | today | A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation. | `llm` `agentic` *root* *credentials* _installs_ ~calls out~ |
| [PyRIT](tools/microsoft-pyrit.md)<br><sub>microsoft</sub> | 4.5k | 1d | The Python Risk Identification Tool for generative AI (PyRIT) is an open source framework built to empower security professionals and engineers to proactively identify risks in generative AI systems. | `llm` *root* _installs_ ~calls out~ ~opaque~ |
| [agent-scan](tools/snyk-agent-scan.md)<br><sub>snyk</sub> | 3.1k | today | Security scanner for AI agents, MCP servers and agent skills. | `agentic` *root* *credentials* _installs_ |
| [vulnhuntr](tools/protectai-vulnhuntr.md)<br><sub>protectai</sub> | 2.8k | 1.6y | Zero shot vulnerability discovery using LLMs | `code` _installs_ |
| [deepteam](tools/confident-ai-deepteam.md)<br><sub>confident-ai</sub> | 2.8k | 27d | DeepTeam is a framework to red team LLMs and AI agents. | `llm` `agentic` _installs_ ~calls out~ |
| [agentic_security](tools/msoedov-agentic_security.md)<br><sub>msoedov</sub> | 2.0k | 6d | Agentic LLM Vulnerability Scanner / AI red teaming kit 🧪 | `llm` `agentic` ~calls out~ |
| [FuzzyAI](tools/cyberark-fuzzyai.md)<br><sub>cyberark</sub> | 1.6k | 223d | A powerful tool for automated LLM fuzzing. It is designed to help developers and security researchers identify and mitigate potential jailbreaks in their LLM APIs. | `llm` |
| [promptmap](tools/utkusen-promptmap.md)<br><sub>utkusen</sub> | 1.3k | 290d | a security scanner for custom LLM applications | `llm` |
| [power-pwn](tools/mbrg-power-pwn.md)<br><sub>mbrg</sub> | 1.2k | 270d | An offensive/defense security toolset for discovery, recon and ethical assessment of AI Agents | `cloud` `llm` *root* |
| [agentic-radar](tools/splx-ai-agentic-radar.md)<br><sub>splx-ai</sub> | 1.1k | 294d | A security scanner for your LLM agentic workflows | `agentic` _installs_ |
| [mcp-scanner](tools/cisco-ai-defense-mcp-scanner.md)<br><sub>cisco-ai-defense</sub> | 1.1k | today | Scan MCP servers for potential threats &amp; security findings. | `agentic` *root* *credentials* |
| [counterfit](tools/azure-counterfit.md)<br><sub>Azure</sub> | 939 | 1.2y | a CLI that provides a generic automation layer for assessing the security of ML models | `llm` *root* |
| [modelscan](tools/protectai-modelscan.md)<br><sub>protectai</sub> | 774 | 211d | Protection against Model Serialization Attacks | `modfile` *credentials* |
| [fickling](tools/trailofbits-fickling.md)<br><sub>trailofbits</sub> | 669 | 7d | A Python pickling decompiler and static analyzer | `modfile` *credentials* _installs_ ~opaque~ |
| [AgentHound](tools/adithyan-ak-agenthound.md)<br><sub>adithyan-ak</sub> | 436 | 5d | Offensive security framework for AI agent infrastructure - recon, credential looting, model exfiltration, poisoning, and attack-path analysis across MCP, A2A, gateways, and AI services. BloodHound for the agentic stack. | `agentic` *root* *credentials* _installs_ |
| [picklescan](tools/mmaitre314-picklescan.md)<br><sub>mmaitre314</sub> | 423 | 16d | Security scanner detecting Python Pickle files performing suspicious actions | `modfile` |
| [aisbom](tools/lab700xorg-aisbom.md)<br><sub>Lab700xOrg</sub> | 79 | 2d | Static security scanner for ML model files — detects pickle bombs, Keras Lambda RCE and GGUF template injection, and generates CycloneDX / SPDX AI-BOMs (AIBOM) as EU AI Act, CRA and FDA §524B evidence. | `modfile` |
| [modelaudit](tools/promptfoo-modelaudit.md)<br><sub>promptfoo</sub> | 72 | 1d | Security scanner for AI/ML model files. Detects malicious code, backdoors, and vulnerabilities before deployment | `modfile` *root* *credentials* ~calls out~ |

### mcp · MCP Servers

_Model Context Protocol tool servers_

| Project | Stars | Updated | Description | Scopes & traits |
|:---|---:|:---|:---|:---|
| [ida-pro-mcp](tools/mrexodia-ida-pro-mcp.md)<br><sub>mrexodia</sub> | 12k | 1d | AI-powered reverse engineering assistant that bridges IDA Pro with language models through MCP. | `binary` |
| [hexstrike-ai](tools/0x4m4-hexstrike-ai.md)<br><sub>0x4m4</sub> | 12k | 45d | HexStrike AI MCP Agents is an advanced MCP server that lets AI agents (Claude, GPT, Copilot, etc.) autonomously run 150+ cybersecurity tools for automated pentesting, vulnerability discovery, bug bounty automation, and security research. Seamlessly bridge LLMs with real-world offensive security capabilities. | `webapp` `network` `recon` `binary` *root* |
| [GhidraMCP](tools/lauriewired-ghidramcp.md)<br><sub>LaurieWired</sub> | 10k | 1.2y | MCP Server for Ghidra | `binary` |
| [mcp-server](tools/portswigger-mcp-server.md)<br><sub>PortSwigger</sub> | 1.2k | 20d | MCP Server for Burp | `webapp` `api` _binaries_ |
| [MCP-Kali-Server](tools/wh0am123-mcp-kali-server.md)<br><sub>Wh0am123</sub> | 826 | 184d | MCP configuration to connect AI agent to a Linux machine. | `network` `webapp` *root* |
| [mcp-security-hub](tools/fuzzinglabs-mcp-security-hub.md)<br><sub>FuzzingLabs</sub> | 791 | 162d | A growing collection of MCP servers bringing offensive security tools to AI assistants. Nmap, Ghidra, Nuclei, SQLMap, Hashcat and more. | `network` `webapp` `binary` *root* *credentials* _installs_ |
| [MetasploitMCP](tools/gh05tcrew-metasploitmcp.md)<br><sub>GH05TCREW</sub> | 728 | 224d | MCP Server for Metasploit | `network` |
| [mcp-for-security](tools/cyproxio-mcp-for-security.md)<br><sub>cyproxio</sub> | 631 | archived | MCP for Security: A collection of Model Context Protocol servers for popular security tools like SQLMap, FFUF, NMAP, Masscan and more. Integrate security testing and penetration testing into AI workflows. | `webapp` `network` `recon` _installs_ |
| [BloodHound-MCP-AI](tools/mordavid-bloodhound-mcp-ai.md)<br><sub>MorDavid</sub> | 376 | 1.3y | BloodHound-MCP-AI is integration that connects BloodHound with AI through Model Context Protocol, allowing security professionals to analyze Active Directory attack paths using natural language instead of complex Cypher queries. | `ad` _installs_ |
| [bloodhound_mcp](tools/mwnickerson-bloodhound_mcp.md)<br><sub>mwnickerson</sub> | 131 | 29d | A Model Context Protocol (MCP) server to converse with data in Bloodhound | `ad` |
| [NetExec-mcp](tools/mpgn-netexec-mcp.md)<br><sub>mpgn</sub> | 78 | 11d | NetExec MCP | `ad` `network` |
| [roadrecon_mcp_server](tools/atomicchonk-roadrecon_mcp_server.md)<br><sub>atomicchonk</sub> | 52 | 1.5y | Claude MCP server to perform analysis on ROADrecon data | `entra` `cloud` |
| [zebbern-kali-mcp](tools/zebbern-zebbern-kali-mcp.md)<br><sub>zebbern</sub> | 47 | 12d | MCP server for Kali Linux penetration testing - 121 tools for AI-assisted security testing - Giving Agents access to full pentesting tools | `network` `webapp` `recon` *root* *credentials* |
| [red-clippy](tools/cspf-founder-red-clippy.md)<br><sub>CSPF-Founder</sub> | 28 | 16d | open-source pentest management built to be operated by an AI agent | `redteam` `logging` *root* |

### skill · Skills

_Agent skill bundles, prompts & playbooks_

| Project | Stars | Updated | Description | Scopes & traits |
|:---|---:|:---|:---|:---|
| [skills](tools/trailofbits-skills.md)<br><sub>trailofbits</sub> | 7.1k | 1d | Trail of Bits Claude Code skills for security research, vulnerability detection, and audit workflows | `agentic` `binary` `code` `webapp` *root* *credentials* _installs_ |
| [pentest-ai-agents](tools/0xsteph-pentest-ai-agents.md)<br><sub>0xSteph</sub> | 2.2k | 32d | Turn Claude Code into your offensive security research assistant. Specialized AI subagents for authorized penetration testing plan engagements, analyze recon, research exploits, build detections, audit STIGs, and write reports. | `redteam` `recon` *root* *credentials* _installs_ |
| [skills](tools/specterops-skills.md)<br><sub>SpecterOps</sub> | 628 | 14d | A marketplace for LLM skills | `ad` `binary` `code` `entra` `network` `recon` `redteam` `social` `webapp` *root* *credentials* _binaries_ _installs_ |
| [Claude-Code-CyberSecurity-Skill](tools/masriyan-claude-code-cybersecurity-skill.md)<br><sub>Masriyan</sub> | 425 | 10d | 22 production-quality Claude Code Skills for cybersecurity professionals — covering offensive security, defensive operations, reverse engineering, threat hunting, threat intelligence, purple team / adversary emulation, CSOC automation, AI/LLM security, mobile, OT/ICS, GRC, software supply chain security, and more. | `redteam` `binary` `llm` *root* _installs_ |
| [cybersecurity-skills](tools/briiirussell-cybersecurity-skills.md)<br><sub>briiirussell</sub> | 393 | 113d | Cybersecurity skills for AI coding agents (Claude Code, Cursor, Codex) | `recon` `webapp` *root* |
| [offensive-claude](tools/hypnguyen1209-offensive-claude.md)<br><sub>hypnguyen1209</sub> | 367 | 1d | Offensive security toolkit for Claude Code covering red team, exploit dev, AD attacks, EDR bypass, mobile pentest | `redteam` `ad` *root* *credentials* _installs_ |
| [Claude-AD](tools/adscanpro-claude-ad.md)<br><sub>ADScanPro</sub> | 201 | 24d | Active Directory pentest methodology for Claude Code: skills, agents and slash commands for internal AD red-team work (Kerberoasting, ADCS ESC1-17, DCSync, ACL abuse, NTLM relay, delegation), with per-technique OPSEC/telemetry notes. Drives netexec, impacket, certipy, bloodyAD, BloodHound CE. | `ad` *root* |
| [secskills](tools/trilwu-secskills.md)<br><sub>trilwu</sub> | 143 | 13d | Transform Claude Code into your personal security engineer | `redteam` `code` *root* *credentials* _installs_ |
| [security-skills-claude-code](tools/security-phoenix-demo-security-skills-claude-code.md)<br><sub>Security-Phoenix-demo</sub> | 74 | 6d | This repository is a curated collection of skills, plugins, and automation pipelines designed for Claude Code — Anthropic's CLI for AI-assisted software engineering. It was built by the engineering and security engineering teams at Phoenix Security and released as open source so that security professionals, DevSecOps engineers, AppSec teams | `code` *root* |

---

## Data Files

- [`tools.json`](tools.json) — Full structured JSON dataset

Original catalogue maintained at [aisecuritymatrix.com](https://aisecuritymatrix.com). This repository is an independent community mirror.