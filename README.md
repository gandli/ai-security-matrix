# AI Security Matrix

[![source](https://img.shields.io/badge/source-aisecuritymatrix.com-blue)](https://aisecuritymatrix.com)
![projects](https://img.shields.io/badge/projects-65-informational)

> A curated directory of open-source AI-enabled security testing tools, LLM red-teaming platforms, agentic pentesting systems, and security-focused Model Context Protocol (MCP) servers.
>
> Mirrored from [aisecuritymatrix.com](https://aisecuritymatrix.com).

## Summary

- **[Agents](#agents)** — 22 projects
- **[Scanners](#scanners)** — 20 projects
- **[MCP Servers](#mcp-servers)** — 14 projects
- **[Skills](#skills)** — 9 projects

## Taxonomy & Legend

| Dimension | Values / Meaning |
|:---|:---|
| **Category** | `agent` (autonomous/multi-step orchestration), `scanner` (rule/LLM-assisted detection), `mcp` (Model Context Protocol tool server), `skill` (agent skill bundle / prompts) |
| **Scope** (code) | Target surface: `webapp`, `api`, `code`, `llm`, `agentic`, `network`, `recon`, `binary`, `ad`, `entra`, `cloud`, `modfile`, `redteam`, `social`, `logging` |
| **Access** (*italic*) | Host privileges needed: *root*, *credentials*, *binaries* |
| **Execution** (_under_) | Local footprint: _installs_ (runs/installs on host) |
| **Traffic** (~strike~) | Egress visibility: ~calls out~ (outbound traffic), ~opaque~ (hidden/encrypted) |

## Agents

| Project | Stars | Freshness | Description | Scopes & Traits |
|:---|---:|:---|:---|:---|
| [strix](https://github.com/usestrix/strix)<br><sub>usestrix</sub> | 63k | &#9733; today | Open-source AI penetration testing tool to find and fix your app’s vulnerabilities. | `webapp` `api` `code` *root* *credentials* _installs_ ~calls out~ |
| [pentagi](https://github.com/vxcontrol/pentagi)<br><sub>vxcontrol</sub> | 25k | &#9733; 7d | Fully autonomous AI Agents system capable of performing complex penetration testing tasks | `webapp` `network` `recon` *root* *credentials* _binaries_ _installs_ |
| [PentestGPT](https://github.com/GreyDGL/PentestGPT)<br><sub>GreyDGL</sub> | 16k | 65d | Automated Penetration Testing Agentic Framework Powered by Large Language Models | `webapp` `network` `recon` *root* _installs_ |
| [cai](https://github.com/aliasrobotics/cai)<br><sub>aliasrobotics</sub> | 9.8k | archived | Cybersecurity AI (CAI), the framework for AI Security | `network` `webapp` `recon` *root* *credentials* _installs_ |
| [CyberStrikeAI](https://github.com/AIPentest/CyberStrikeAI)<br><sub>AIPentest</sub> | 6.8k | &#9733; 1d | The system of action for AI-native cybersecurity—where intent becomes governed execution, evidence becomes operational memory, and every operation improves the next. | `network` `webapp` *root* *credentials* _installs_ ~opaque~ |
| [Decepticon](https://github.com/PurpleAILAB/Decepticon)<br><sub>PurpleAILAB</sub> | 5.5k | &#9733; 18d | Autonomous Hacking Agent for Red Team | `redteam` `network` `webapp` *root* *credentials* _installs_ ~calls out~ |
| [pentestagent](https://github.com/GH05TCREW/pentestagent)<br><sub>GH05TCREW</sub> | 3.1k | &#9733; 10d | PentestAgent is an AI agent framework for black-box security testing, supporting bug bounty, red-team, and penetration testing workflows. | `webapp` `api` *root* |
| [Pentest-Swarm-AI](https://github.com/Armur-Ai/Pentest-Swarm-AI)<br><sub>Armur-Ai</sub> | 2.5k | &#9733; 1d | Autonomous penetration testing using a swarm of AI agents. Orchestrates recon, classification, exploitation, and reporting specialists with ReAct reasoning — supports bug bounty, continuous monitoring, and CTF modes. Built with Go and 7+ native security tools. | `webapp` `network` `recon` *root* _installs_ |
| [redamon](https://github.com/samugit83/redamon)<br><sub>samugit83</sub> | 2.5k | &#9733; 1d | An AI-powered agentic red team framework that automates offensive security operations, from reconnaissance to exploitation to post-exploitation, with zero human intervention. | `redteam` `ad` `network` `recon` *root* *credentials* _installs_ ~calls out~ ~opaque~ |
| [pentest-ai](https://github.com/0xSteph/pentest-ai)<br><sub>0xSteph</sub> | 1.7k | &#9733; 4d | Open-source AI pentester that proves every finding. Machine oracles re-run each exploit; verified bugs ship a proof capsule you can replay yourself. | `webapp` `network` *root* _installs_ |
| [pentest-copilot](https://github.com/bugbasesecurity/pentest-copilot)<br><sub>bugbasesecurity</sub> | 1.5k | 34d | Pentest Copilot is an AI-powered browser based ethical hacking assistant tool designed to streamline pentesting workflows. | `webapp` *root* *credentials* _installs_ |
| [hackingBuddyGPT](https://github.com/ipa-lab/hackingBuddyGPT)<br><sub>ipa-lab</sub> | 1.2k | &#9733; 4d | Helping Ethical Hackers use LLMs in 50 Lines of Code or less.. | `network` *root* |
| [nebula](https://github.com/berylliumsec/nebula)<br><sub>berylliumsec</sub> | 1.1k | &#9733; today | AI-powered penetration testing assistant for automating recon, note-taking, and vulnerability analysis. | `network` `recon` *root* ~calls out~ |
| [xalgorix](https://github.com/xalgorix/xalgorix)<br><sub>xalgorix</sub> | 1.1k | &#9733; 2d | Autonomous AI pentesting agents — real-time reconnaissance, vulnerability detection, and exploitation orchestration. Go + TypeScript. | `recon` `webapp` `network` *root* *credentials* _installs_ ~calls out~ |
| [AdStrike](https://github.com/capture0x/AdStrike)<br><sub>capture0x</sub> | 354 | 98d | AI-powered modular Active Directory red-team framework for authorized penetration testing, AD enumeration, attack-path analysis,   Kerberos/ADCS workflows, reporting, operator automation, and MCP server integration. | `ad` *root* *credentials* |
| [RedteamAgent](https://github.com/NeoTheCapt/RedteamAgent)<br><sub>NeoTheCapt</sub> | 132 | 46d | An AI red-team agent for authorized labs and web app pentesting workflows. Turns Claude Code / OpenCode / Codex into a structured recon → test → exploit → report workflow, with containerized tools and resumable state. | `webapp` `redteam` *credentials* |
| [ares](https://github.com/dreadnode/ares)<br><sub>dreadnode</sub> | 76 | &#9733; 1d | Ares is an autonomous security operations platform where LLM-driven red and blue team agents operate against each other on live infrastructure, enabling realistic evaluation of attack and defense. | `ad` `network` `redteam` *root* *credentials* _installs_ ~opaque~ |
| [LLMtary](https://github.com/chetstriker/LLMtary)<br><sub>chetstriker</sub> | 35 | 159d | Autonomous AI-powered penetration testing platform. LLM-driven recon, vulnerability analysis, and exploit validation for internal &amp; external targets. Supports local AI (Ollama, LM Studio) and cloud models (Claude, GPT-4, Gemini). Linux · macOS · Windows | `recon` `webapp` *root* _installs_ |
| [Sage](https://github.com/MythicAgents/Sage)<br><sub>MythicAgents</sub> | 25 | &#9733; 22d | Sage is a virtual Mythic agent that that uses an AI agentic system to operate Mythic and Mythic agents running on compromised hosts. | `redteam` `ad` *root* *credentials* _installs_ |
| [rift](https://github.com/cettocdx/rift)<br><sub>cettocdx</sub> | 11 | 85d | RIFT - Autonomous AI Penetration Testing Agent | `webapp` `network` *root* _binaries_ _installs_ ~calls out~ |
| [AI-Pentest-Agent](https://github.com/mayank-dev-15/AI-Pentest-Agent)<br><sub>mayank-dev-15</sub> | 3 | 86d | Autonomous AI penetration testing agent with scanning, reconnaissance, and exploitation modules | `webapp` `recon` |
| [nightly](https://github.com/Nightlysec/nightly)<br><sub>Nightlysec</sub> | 1 | 35d | Autonomous AI penetration testing agent | `webapp` `api` `code` *root* *credentials* _installs_ ~calls out~ |

## Scanners

| Project | Stars | Freshness | Description | Scopes & Traits |
|:---|---:|:---|:---|:---|
| [promptfoo](https://github.com/promptfoo/promptfoo)<br><sub>promptfoo</sub> | 25k | &#9733; today | Test your prompts, agents, and RAGs. Red teaming/pentesting/vulnerability scanning for AI. Compare performance of GPT, Claude, Gemini, DeepSeek, and more. Simple declarative configs with command line and CI/CD integration.  Used by OpenAI and Anthropic. | `llm` `agentic` *root* *credentials* _installs_ ~calls out~ ~opaque~ |
| [garak](https://github.com/NVIDIA/garak)<br><sub>NVIDIA</sub> | 9.3k | &#9733; 1d | the LLM vulnerability scanner | `llm` *root* |
| [AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)<br><sub>Tencent</sub> | 6.4k | &#9733; today | A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation. | `llm` `agentic` *root* *credentials* _installs_ ~calls out~ |
| [PyRIT](https://github.com/microsoft/PyRIT)<br><sub>microsoft</sub> | 4.5k | &#9733; 1d | The Python Risk Identification Tool for generative AI (PyRIT) is an open source framework built to empower security professionals and engineers to proactively identify risks in generative AI systems. | `llm` *root* _installs_ ~calls out~ ~opaque~ |
| [agent-scan](https://github.com/snyk/agent-scan)<br><sub>snyk</sub> | 3.1k | &#9733; today | Security scanner for AI agents, MCP servers and agent skills. | `agentic` *root* *credentials* _installs_ |
| [deepteam](https://github.com/confident-ai/deepteam)<br><sub>confident-ai</sub> | 2.8k | &#9733; 27d | DeepTeam is a framework to red team LLMs and AI agents. | `llm` `agentic` _installs_ ~calls out~ |
| [vulnhuntr](https://github.com/protectai/vulnhuntr)<br><sub>protectai</sub> | 2.8k | 1.6y | Zero shot vulnerability discovery using LLMs | `code` _installs_ |
| [agentic_security](https://github.com/msoedov/agentic_security)<br><sub>msoedov</sub> | 2.0k | &#9733; 6d | Agentic LLM Vulnerability Scanner / AI red teaming kit 🧪 | `llm` `agentic` ~calls out~ |
| [FuzzyAI](https://github.com/cyberark/FuzzyAI)<br><sub>cyberark</sub> | 1.6k | 223d | A powerful tool for automated LLM fuzzing. It is designed to help developers and security researchers identify and mitigate potential jailbreaks in their LLM APIs. | `llm` |
| [promptmap](https://github.com/utkusen/promptmap)<br><sub>utkusen</sub> | 1.3k | 290d | a security scanner for custom LLM applications | `llm` |
| [power-pwn](https://github.com/mbrg/power-pwn)<br><sub>mbrg</sub> | 1.2k | 270d | An offensive/defense security toolset for discovery, recon and ethical assessment of AI Agents | `cloud` `llm` *root* |
| [mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner)<br><sub>cisco-ai-defense</sub> | 1.1k | &#9733; today | Scan MCP servers for potential threats &amp; security findings. | `agentic` *root* *credentials* |
| [agentic-radar](https://github.com/splx-ai/agentic-radar)<br><sub>splx-ai</sub> | 1.1k | 294d | A security scanner for your LLM agentic workflows | `agentic` _installs_ |
| [counterfit](https://github.com/Azure/counterfit)<br><sub>Azure</sub> | 939 | 1.2y | a CLI that provides a generic automation layer for assessing the security of ML models | `llm` *root* |
| [modelscan](https://github.com/protectai/modelscan)<br><sub>protectai</sub> | 774 | 211d | Protection against Model Serialization Attacks | `modfile` *credentials* |
| [fickling](https://github.com/trailofbits/fickling)<br><sub>trailofbits</sub> | 669 | &#9733; 7d | A Python pickling decompiler and static analyzer | `modfile` *credentials* _installs_ ~opaque~ |
| [AgentHound](https://github.com/adithyan-ak/AgentHound)<br><sub>adithyan-ak</sub> | 436 | &#9733; 5d | Offensive security framework for AI agent infrastructure - recon, credential looting, model exfiltration, poisoning, and attack-path analysis across MCP, A2A, gateways, and AI services. BloodHound for the agentic stack. | `agentic` *root* *credentials* _installs_ |
| [picklescan](https://github.com/mmaitre314/picklescan)<br><sub>mmaitre314</sub> | 423 | &#9733; 16d | Security scanner detecting Python Pickle files performing suspicious actions | `modfile` |
| [aisbom](https://github.com/Lab700xOrg/aisbom)<br><sub>Lab700xOrg</sub> | 79 | &#9733; 2d | Static security scanner for ML model files — detects pickle bombs, Keras Lambda RCE and GGUF template injection, and generates CycloneDX / SPDX AI-BOMs (AIBOM) as EU AI Act, CRA and FDA §524B evidence. | `modfile` |
| [modelaudit](https://github.com/promptfoo/modelaudit)<br><sub>promptfoo</sub> | 72 | &#9733; 1d | Security scanner for AI/ML model files. Detects malicious code, backdoors, and vulnerabilities before deployment | `modfile` *root* *credentials* ~calls out~ |

## MCP Servers

| Project | Stars | Freshness | Description | Scopes & Traits |
|:---|---:|:---|:---|:---|
| [ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp)<br><sub>mrexodia</sub> | 12k | &#9733; 1d | AI-powered reverse engineering assistant that bridges IDA Pro with language models through MCP. | `binary` |
| [hexstrike-ai](https://github.com/0x4m4/hexstrike-ai)<br><sub>0x4m4</sub> | 12k | 45d | HexStrike AI MCP Agents is an advanced MCP server that lets AI agents (Claude, GPT, Copilot, etc.) autonomously run 150+ cybersecurity tools for automated pentesting, vulnerability discovery, bug bounty automation, and security research. Seamlessly bridge LLMs with real-world offensive security capabilities. | `webapp` `network` `recon` `binary` *root* |
| [GhidraMCP](https://github.com/LaurieWired/GhidraMCP)<br><sub>LaurieWired</sub> | 10k | 1.2y | MCP Server for Ghidra | `binary` |
| [mcp-server](https://github.com/PortSwigger/mcp-server)<br><sub>PortSwigger</sub> | 1.2k | &#9733; 20d | MCP Server for Burp | `webapp` `api` _binaries_ |
| [MCP-Kali-Server](https://github.com/Wh0am123/MCP-Kali-Server)<br><sub>Wh0am123</sub> | 826 | 184d | MCP configuration to connect AI agent to a Linux machine. | `network` `webapp` *root* |
| [mcp-security-hub](https://github.com/FuzzingLabs/mcp-security-hub)<br><sub>FuzzingLabs</sub> | 791 | 162d | A growing collection of MCP servers bringing offensive security tools to AI assistants. Nmap, Ghidra, Nuclei, SQLMap, Hashcat and more. | `network` `webapp` `binary` *root* *credentials* _installs_ |
| [MetasploitMCP](https://github.com/GH05TCREW/MetasploitMCP)<br><sub>GH05TCREW</sub> | 728 | 224d | MCP Server for Metasploit | `network` |
| [mcp-for-security](https://github.com/cyproxio/mcp-for-security)<br><sub>cyproxio</sub> | 631 | archived | MCP for Security: A collection of Model Context Protocol servers for popular security tools like SQLMap, FFUF, NMAP, Masscan and more. Integrate security testing and penetration testing into AI workflows. | `webapp` `network` `recon` _installs_ |
| [BloodHound-MCP-AI](https://github.com/MorDavid/BloodHound-MCP-AI)<br><sub>MorDavid</sub> | 376 | 1.3y | BloodHound-MCP-AI is integration that connects BloodHound with AI through Model Context Protocol, allowing security professionals to analyze Active Directory attack paths using natural language instead of complex Cypher queries. | `ad` _installs_ |
| [bloodhound_mcp](https://github.com/mwnickerson/bloodhound_mcp)<br><sub>mwnickerson</sub> | 131 | &#9733; 29d | A Model Context Protocol (MCP) server to converse with data in Bloodhound | `ad` |
| [NetExec-mcp](https://github.com/mpgn/NetExec-mcp)<br><sub>mpgn</sub> | 78 | &#9733; 11d | NetExec MCP | `ad` `network` |
| [roadrecon_mcp_server](https://github.com/atomicchonk/roadrecon_mcp_server)<br><sub>atomicchonk</sub> | 52 | 1.5y | Claude MCP server to perform analysis on ROADrecon data | `entra` `cloud` |
| [zebbern-kali-mcp](https://github.com/zebbern/zebbern-kali-mcp)<br><sub>zebbern</sub> | 47 | &#9733; 12d | MCP server for Kali Linux penetration testing - 121 tools for AI-assisted security testing - Giving Agents access to full pentesting tools | `network` `webapp` `recon` *root* *credentials* |
| [red-clippy](https://github.com/CSPF-Founder/red-clippy)<br><sub>CSPF-Founder</sub> | 28 | &#9733; 16d | open-source pentest management built to be operated by an AI agent | `redteam` `logging` *root* |

## Skills

| Project | Stars | Freshness | Description | Scopes & Traits |
|:---|---:|:---|:---|:---|
| [skills](https://github.com/trailofbits/skills)<br><sub>trailofbits</sub> | 7.1k | &#9733; 1d | Trail of Bits Claude Code skills for security research, vulnerability detection, and audit workflows | `agentic` `binary` `code` `webapp` *root* *credentials* _installs_ |
| [pentest-ai-agents](https://github.com/0xSteph/pentest-ai-agents)<br><sub>0xSteph</sub> | 2.2k | 32d | Turn Claude Code into your offensive security research assistant. Specialized AI subagents for authorized penetration testing plan engagements, analyze recon, research exploits, build detections, audit STIGs, and write reports. | `redteam` `recon` *root* *credentials* _installs_ |
| [skills](https://github.com/SpecterOps/skills)<br><sub>SpecterOps</sub> | 628 | &#9733; 14d | A marketplace for LLM skills | `ad` `binary` `code` `entra` `network` `recon` `redteam` `social` `webapp` *root* *credentials* _binaries_ _installs_ |
| [Claude-Code-CyberSecurity-Skill](https://github.com/Masriyan/Claude-Code-CyberSecurity-Skill)<br><sub>Masriyan</sub> | 425 | &#9733; 10d | 22 production-quality Claude Code Skills for cybersecurity professionals — covering offensive security, defensive operations, reverse engineering, threat hunting, threat intelligence, purple team / adversary emulation, CSOC automation, AI/LLM security, mobile, OT/ICS, GRC, software supply chain security, and more. | `redteam` `binary` `llm` *root* _installs_ |
| [cybersecurity-skills](https://github.com/briiirussell/cybersecurity-skills)<br><sub>briiirussell</sub> | 393 | 113d | Cybersecurity skills for AI coding agents (Claude Code, Cursor, Codex) | `recon` `webapp` *root* |
| [offensive-claude](https://github.com/hypnguyen1209/offensive-claude)<br><sub>hypnguyen1209</sub> | 367 | &#9733; 1d | Offensive security toolkit for Claude Code covering red team, exploit dev, AD attacks, EDR bypass, mobile pentest | `redteam` `ad` *root* *credentials* _installs_ |
| [Claude-AD](https://github.com/ADScanPro/Claude-AD)<br><sub>ADScanPro</sub> | 201 | &#9733; 24d | Active Directory pentest methodology for Claude Code: skills, agents and slash commands for internal AD red-team work (Kerberoasting, ADCS ESC1-17, DCSync, ACL abuse, NTLM relay, delegation), with per-technique OPSEC/telemetry notes. Drives netexec, impacket, certipy, bloodyAD, BloodHound CE. | `ad` *root* |
| [secskills](https://github.com/trilwu/secskills)<br><sub>trilwu</sub> | 143 | &#9733; 13d | Transform Claude Code into your personal security engineer | `redteam` `code` *root* *credentials* _installs_ |
| [security-skills-claude-code](https://github.com/Security-Phoenix-demo/security-skills-claude-code)<br><sub>Security-Phoenix-demo</sub> | 74 | &#9733; 6d | This repository is a curated collection of skills, plugins, and automation pipelines designed for Claude Code — Anthropic's CLI for AI-assisted software engineering.  It was built by the engineering and security engineering teams at Phoenix Security and released as open source so that security professionals, DevSecOps engineers, AppSec teams | `code` *root* |

---

## Raw Data

Structured dataset: [`tools.json`](tools.json).

## Upstream

Original catalogue maintained at [aisecuritymatrix.com](https://aisecuritymatrix.com). This repository is an independent community mirror.