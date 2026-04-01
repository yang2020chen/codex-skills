---
name: project-research
description: Use this skill when researching and analyzing an external project, repository, framework, toolchain, open source tool, methodology, or ecosystem. Produce a structured report that explains what the project is, who it is for, what it does well, what its limits are, how it compares with alternatives, and whether it is worth adopting.
---

# Project Research

## Overview

Use this skill when the user asks to:

- research a repository or project
- analyze an open source tool or framework
- compare similar projects
- evaluate whether a project is worth adopting
- summarize a project into a reusable written report
- convert project research into a structured Markdown document

This skill is optimized for:

- GitHub repositories
- AI agent tools
- developer tools
- frameworks and SDKs
- open source methodologies
- workflow systems
- ecosystem or competitor analysis

This skill is not only for technical frameworks. It also applies to method documents, books-as-repos, playbooks, and open-source knowledge projects.

## Goals

Your job is not just to summarize the README. Your job is to help the user decide:

1. What this project actually is
2. What problem it tries to solve
3. Who it is best suited for
4. What it does well
5. What its risks and limits are
6. How it compares with nearby alternatives
7. Whether it is worth adopting, borrowing from, or ignoring

## Core Principles

### 1. Distinguish facts from judgment

Separate:

- direct facts from README, docs, repo structure, releases, and source tree
- your analysis or inference based on those facts

When a conclusion is inferred rather than explicitly stated by the project authors, say so plainly.

### 2. Do not stop at feature lists

Always go beyond:

- stars
- hype
- headings in the README

Focus on:

- actual project positioning
- workflow impact
- maturity
- tradeoffs
- adoption fit

### 3. Weaknesses are mandatory

Every report must include:

- real drawbacks
- failure modes
- likely mismatches
- adoption costs

Do not write praise-only research.

### 4. Be decision-oriented

The report should help answer:

- Should we use this?
- Who should use it?
- Who should not?
- Should we adopt it fully or only borrow parts?

## Required Analysis Dimensions

Unless the user explicitly requests a shorter format, cover these areas.

### 1. Project Positioning

Answer all of the following:

- What is the project?
- What is it not?
- What problem does it solve?
- Is it a tool, framework, platform, template, sample repo, methodology, or ecosystem layer?

### 2. Target Users

Identify:

- who it is best suited for
- who may benefit secondarily
- who it is not a good fit for

### 3. Core Capabilities and Boundaries

Explain:

- the main capabilities
- supporting capabilities
- important boundaries or non-goals
- anything users might wrongly assume it can do

### 4. Workflow Value

Describe:

- how people work before using it
- how the workflow changes after using it
- where the practical value actually comes from

### 5. Architecture or Structure

Inspect repository structure when possible and explain:

- major folders or modules
- extension points
- configuration model
- whether it is easy to customize or integrate

For non-code repositories, analyze:

- chapter structure
- content organization
- publishing approach
- asset model

### 6. Adoption and Maintenance Cost

Evaluate:

- setup cost
- learning cost
- operational complexity
- maintenance burden
- team rollout difficulty

For non-software projects, translate this into:

- reading cost
- actionability
- implementation effort
- need for extra interpretation or execution support

### 7. Risks, Drawbacks, and Failure Modes

This section is mandatory.

Look for:

- overengineering risk
- immaturity
- dependency risk
- platform lock-in
- security or compliance concerns
- inconsistent quality
- unclear maintenance outlook
- mismatch with real production needs
- over-claimed outcomes versus practical reality

### 8. Ecosystem and Sustainability

Review signals such as:

- stars, forks, commit history
- maintainers and update patterns
- docs quality
- release maturity
- ecosystem fit

Use these signals carefully. Popularity is not the same as quality.

### 9. Comparison With Similar Projects

Compare with 2 to 5 relevant alternatives when possible.

For each comparison, explain:

- whether it is a competitor, substitute, or complement
- the main differences in positioning
- the strongest reason to choose one over the other

### 10. Suitability Judgment

End with a practical recommendation:

- who should use it
- who should avoid it
- whether to adopt fully or borrow only parts
- the safest way to evaluate it

## Recommended Research Process

Follow this order when possible:

1. Read the repository landing page and README
2. Inspect visible directory structure
3. Check install, usage, architecture, and examples sections
4. Identify concrete capabilities instead of repeating marketing claims
5. Look for maturity and maintenance signals
6. Find nearby alternatives for comparison
7. Separate facts from analysis
8. Write the final report

## Source Quality Rules

- Prefer primary sources such as repository README, docs, source tree, and official project pages.
- If you compare alternatives, prefer their official repositories or docs as sources.
- Use current information when the project may have changed recently.
- Clearly distinguish direct facts from your interpretation.

## Default Output Style

Unless the user requests another format:

- write in Chinese
- produce Markdown
- use a structured research-report style
- save the result to the current workspace or to the location requested by the user

Recommended report structure:

```md
# 项目研究：<项目名>

## 1. 项目概述
## 2. 目标用户
## 3. 核心能力
## 4. 典型使用场景
## 5. 架构与设计特点
## 6. 优势
## 7. 缺点与风险
## 8. 同类项目对比
## 9. 适用性判断
## 10. 结论
## 参考资料
## 研究说明
```

## Summary Mode

If the user asks for a shorter version after the full report, produce a one-page summary that includes:

- what the project is
- core value
- best-fit users
- biggest strengths
- biggest drawbacks
- practical recommendation

## Special Notes for AI-Agent and Developer-Tool Projects

When the research target is an AI coding tool, agent framework, skills pack, MCP server, dev workflow system, or automation framework, also answer:

- Does it enhance model capability or workflow capability?
- Is it tool-agnostic or tied to one host?
- Is cross-platform support a real strength or a compromise?
- Does it introduce extra token cost or execution overhead?
- Does it help with governance, safety, verification, or repeatability?
- Is it better for solo power users or for teams?

## Practical Guidance

Do not end with vague language like:

- "It depends"
- "Looks interesting"
- "Could be useful"

Instead, make a useful judgment with conditions and tradeoffs.

## Example User Requests

- "按项目研究框架分析这个仓库：<link>"
- "研究一下这个 GitHub 项目，并整理成文档"
- "Compare this framework with similar tools and tell me whether it is worth adopting"
- "Analyze this repo and turn it into a concise Chinese research report"
