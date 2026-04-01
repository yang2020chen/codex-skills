---
name: project-research-summary
description: Use this skill to create a one-page executive summary of an external project, repository, framework, toolchain, methodology, or open source tool. It is designed for concise, decision-oriented output and works especially well after a full project-research pass.
---

# Project Research Summary

## Overview

Use this skill when the user asks for:

- a one-page summary
- an executive summary
- a concise project brief
- a short comparison-oriented overview
- a compressed version of a longer project research report

This skill pairs naturally with `project-research`, but can also be used on its own when the user wants a faster answer.

## Goal

Your job is to compress a project analysis into a short, high-signal brief that helps the user decide:

- what the project is
- why it matters
- who it is for
- what its main strengths are
- what its main drawbacks are
- whether it is worth paying attention to

## Summary Rules

### 1. Be short, but not vague

Do not produce a generic paragraph. The summary must still contain real judgment.

### 2. Focus on decisions

The summary should help the user quickly understand:

- should I look deeper?
- is this for me?
- is this a framework, tool, methodology, or example repo?

### 3. Preserve tradeoffs

Even in summary mode, include:

- the biggest strength
- the biggest weakness
- a practical recommendation

### 4. Prefer clarity over completeness

You are not trying to include everything. You are trying to preserve the most decision-relevant points.

## Recommended Structure

Unless the user asks for another format, write in Chinese and use this structure:

```md
# <项目名> 一页摘要

## 项目是什么
## 核心价值
## 它最适合谁
## 它不太适合谁
## 最大优点
## 主要缺点
## 结论
## 建议用法
```

## Compression Guide

When summarizing a full report, keep:

- project positioning
- core value
- best-fit users
- biggest strengths
- biggest risks or drawbacks
- one practical recommendation

Cut or heavily compress:

- long architecture explanation
- detailed directory walkthroughs
- long alternative-by-alternative comparisons
- background narrative that does not change the decision

## Special Notes

For AI tools, agent frameworks, or coding workflow systems, make sure the summary clearly answers:

- is this a framework, a skills pack, a workflow system, or a sample repo?
- is it better for solo users or teams?
- is it light or heavy?
- should the user adopt it, study it, or just borrow ideas?

## Example Requests

- "Summarize this repo in one page"
- "Give me the executive summary version"
- "Compress the research into something I can forward"
- "按摘要模式总结这个项目：<link>"
