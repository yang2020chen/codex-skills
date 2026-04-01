# codex-skills

A small collection of reusable Codex / Claude-style skills for practical work.

## Skills

### `project-research`

Research and analyze an external project, repository, framework, toolchain, methodology, or open source tool.

Best for:

- GitHub repository analysis
- framework evaluation
- AI tool comparison
- adoption decisions
- structured Chinese Markdown research reports

What it does:

- identifies what a project is and is not
- analyzes target users, core capabilities, workflow value, structure, risks, and adoption cost
- compares relevant alternatives
- ends with a practical recommendation

Path:

- [project-research/SKILL.md](./project-research/SKILL.md)

### `project-research-summary`

Create a one-page executive summary for a project after a full analysis, or directly when the user wants a fast decision-oriented brief.

Best for:

- summary handoffs
- executive briefs
- chat-friendly project snapshots
- turning a long report into a one-page version

What it does:

- compresses research into a short, decision-oriented summary
- highlights project type, core value, fit, strengths, drawbacks, and recommendation
- works well as a companion to `project-research`

Path:

- [project-research-summary/SKILL.md](./project-research-summary/SKILL.md)

### `remote-mac-control`

Guide for setting up, validating, troubleshooting, and documenting remote command-line control of a Mac from another machine.

Best for:

- Tailscale + SSH remote workflows
- macOS Remote Login setup
- Homebrew PATH problems
- OpenClaw / Claude Code command visibility differences
- shell initialization troubleshooting

Path:

- [remote-mac-control/SKILL.md](./remote-mac-control/SKILL.md)

### `remote-windows-control`

Guide for setting up, validating, troubleshooting, and documenting remote command-line control of a Windows machine from another machine.

Best for:

- Tailscale + OpenSSH Server
- PowerShell and `winget` setup
- execution-policy issues
- OpenClaw / Claude Code remote invocation
- Windows path and shim troubleshooting

Path:

- [remote-windows-control/SKILL.md](./remote-windows-control/SKILL.md)

## Suggested Usage

For a full project analysis:

```text
Use project-research to analyze this repository: <link>
```

For a one-page summary:

```text
Use project-research-summary to summarize this repository: <link>
```

For a two-step workflow:

1. Run `project-research`
2. Then run `project-research-summary`

## Notes

- These skills are written to be broadly reusable rather than tied to one machine path.
- `project-research` defaults to Chinese structured reports unless the user requests another language.
