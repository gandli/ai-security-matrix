# About

## What Is the AI Security Matrix?

The AI Security Matrix helps you find AI-enabled security testing tools for your engagements.

Searching for them leads down a rabbit hole. GitHub stars, blog reviews, Reddit threads, and it's still hard to tell what's what. The matrix categorizes each tool by purpose and testing scope. It also flags the risk of what running the tool does to your machine so you can determine if you can trust the tool in your scenario.

## What is an AI Security Tool?

An AI security tool evaluates the security posture of a system during an assessment, with a language model doing part of the work. Teams use them for vulnerability assessments, penetration testing, and red team engagements.

Their scope runs in two directions. Some point at traditional targets like web apps, enterprise systems, and cloud. Others are built to test AI systems themselves: model scanners, prompt injection testing, agent and RAG assessment.

## Who it is for

Anyone running security assessments. Pentesters, red teamers, bug bounty hunters, and the defenders who need to know what those tools do.

The scope labels tell you which tools point at your targets, whether that's web applications, internal networks, Active Directory, cloud, reverse engineering, or AI systems themselves. The last-push date tells you whether anyone still maintains it. The risk flags tell you what the tool installs, what privilege it wants, and whether it reaches for your credentials.

## What the AI Security Matrix is not

The matrix does not rank tools and does not test them. Nothing here has been verified to work as described, so treat every listing as a starting point you check yourself.

## Can you trust these tools?

The AI Security Matrix flags risk to give you a starting point, but treat everything here as unsafe until you vet and test it yourself.

## What it does to your machine

Every tool here is a repo you could clone yourself. Six checks tell you what happens if you do. Nothing on this list is ever executed to find out: the repo is cloned, read, and thrown away. The risk column idendifies observed risks.

## What lands on your host

Binaries means the project ships something already compiled. You did not build it and you cannot read it.

Installs means running it puts more software on your machine. A script piped from the internet straight into your shell, a hook that fires quietly during install, or a dependency list loose enough that you get whichever versions happen to be current that day.

## What it asks for

Root means the setup wants privilege somewhere: sudo, a privileged container, the Docker socket.

Credentials means the code reaches toward the places your keys live. Your AWS profile, your SSH directory, your Kubernetes config.

## What you cannot see

Calls out means there is analytics in the code, so using the tool tells someone else you used it.

Opaque means part of the project is unreadable. Vendored code, minified files, long encoded blobs.

## None of this is an accusation

Plenty of good tools need root. Most projects vendor something. A flag tells you what to look at before you run it, not what to avoid.

An entry with no flags is not a clean bill. Where a check could not read something, the entry says not checked rather than no.

## Creators

Joe Vest

The threat gets a vote. If you build a defense without understanding how an adversary actually operates, you're not making security decisions. The threat is making them for you.

Joe has spent over 20 years in cybersecurity, the last 15 focused on offensive security operations.

He is not interested in findings-based testing that grows a backlog of vulnerabilities. He focuses on the threat perspective: understanding adversary behavior to drive measurable disruption.

He is a hands-on technical lead who would rather solve systemic issues than document theoretical flaws, and relays complex technical concepts in a way engineers can use.

- Adversary disruption. Moving past simulation to whether a system can detect and stop a specific threat before it has impact.
- Bridging the gap. Working between offensive and defensive teams to turn technical insight into better visibility and response.
- Focusing on what matters. Pruning the noise to concentrate effort where it affects a threat's ability to succeed.

He is here to disrupt the threat's ability to succeed, not just document it.

Joe wrote Red Team Development and Operations, hosts the Red Team Guide, built a cybersecurity company that later merged with SpecterOps, and led Cobalt Strike strategy post-acquisition.

---

_Source: <https://aisecuritymatrix.com/about.html>_
