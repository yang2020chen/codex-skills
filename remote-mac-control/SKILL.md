---
name: remote-mac-control
description: Use this skill when setting up, validating, troubleshooting, or documenting remote command-line control of a Mac from another machine, especially with Tailscale, macOS Remote Login, SSH, Homebrew path issues, zsh shell initialization, OpenClaw, Claude Code, and command visibility differences between local GUI sessions and remote shells.
---

# Remote Mac Control

## Overview

Use this skill for practical command-line remote control of a macOS machine, not GUI screen sharing.

It is optimized for the workflow validated in this environment:

- controller machine: macOS
- target machine: macOS
- private network: `Tailscale`
- remote command entry: macOS `Remote Login` / SSH
- common post-setup tasks:
  - validate `Tailscale` reachability
  - enable and verify `Remote Login`
  - test SSH with read-only commands
  - troubleshoot shell startup issues
  - fix `Homebrew` path visibility in remote shells
  - verify `OpenClaw` and similar CLI tools

## When To Use

Use this skill when the user wants any of the following:

- remotely control a Mac over command line
- set up a Mac for SSH access over `Tailscale`
- verify `Remote Login` and SSH reachability
- debug why a command works locally on a Mac but not over SSH
- diagnose `zsh` startup problems such as `compdef` / `compinit` issues
- fix missing `/opt/homebrew/bin` in remote shell environments
- document or templatize Mac remote-control setup

Do not use this skill when the task is mainly about:

- full GUI desktop sharing
- Apple Remote Desktop workflows
- MDM, Jamf, or enterprise device management

## Workflow

Follow this order unless the user requests a narrower task.

For a compact repeatable runbook, read [references/mac-remote-checklist.md](references/mac-remote-checklist.md) when the user wants a checklist or handoff document.

### 1. Confirm the network path

Prefer a private-network approach over public exposure.

Recommended structure:

- controller Mac joins `Tailscale`
- target Mac joins the same `Tailscale` network
- SSH uses the target Mac's Tailscale IP

Useful validation command on the target Mac:

```bash
tailscale ip -4
```

### 2. Enable the macOS command entry point

Preferred entry point: `Remote Login`

Validation:

```bash
sudo systemsetup -getremotelogin
whoami
```

Expected outcome:

- `Remote Login: On`
- the target account name is known for SSH login

### 3. Validate SSH from the controller machine

From the controller Mac:

```bash
ssh USER@TAILSCALE_IP
```

Prefer a minimal read-only validation first:

```bash
ssh USER@TAILSCALE_IP 'whoami; hostname'
```

Keep the first remote action non-destructive.

### 4. Treat remote shell problems as environment problems first

If login succeeds but commands fail, do not immediately assume the tool is missing.

Check these first:

- current `PATH`
- `which TOOLNAME`
- shell startup files such as `~/.zshrc`, `~/.zprofile`, `~/.zshenv`
- whether the user normally launches the tool from a GUI terminal with a richer environment

This matters on macOS because GUI sessions and SSH sessions often expose different `PATH` values.

### 5. Fix zsh completion initialization only when needed

Validated failure pattern:

- shell startup loads an `openclaw.zsh` completion file
- `compdef` is not defined

That usually means `compinit` was not run before sourcing the completion script.

Minimal fix pattern:

```zsh
autoload -Uz compinit
compinit
source "/Users/USERNAME/.openclaw/completions/openclaw.zsh"
```

Apply the smallest change possible near the completion source line.

### 6. Fix Homebrew path visibility in remote shells

Validated failure pattern:

- tool is installed through Homebrew-backed Node/npm paths
- process is running
- completion files exist
- but `which openclaw` fails in SSH login shells

On Apple Silicon Macs, check whether `/opt/homebrew/bin` is missing from `PATH`.

Minimal fix pattern:

```zsh
export PATH="/opt/homebrew/bin:$PATH"
```

Prefer adding it to `~/.zshrc` only if the problem is specifically in interactive SSH shells.

## Known Good Commands

### Tailscale and Remote Login validation

```bash
tailscale ip -4
whoami
sudo systemsetup -getremotelogin
```

### SSH test from controller Mac

```bash
ssh USER@TAILSCALE_IP 'whoami; hostname'
```

### Shell environment inspection

```bash
which openclaw
echo $PATH
sed -n '1,220p' ~/.zshrc ~/.zprofile ~/.zshenv ~/.profile 2>/dev/null
```

### Homebrew path validation

```bash
ls -l /opt/homebrew/bin/openclaw /opt/homebrew/bin/node /opt/homebrew/bin/npm 2>/dev/null
echo $PATH
```

### OpenClaw validation

```bash
which openclaw
openclaw --version
```

## Troubleshooting

### SSH works but the tool command is missing

Check these in order:

1. Is the tool already running as a process?
2. Does the shell `PATH` include `/opt/homebrew/bin`?
3. Does `which TOOLNAME` fail only in SSH sessions?
4. Do shell startup files source completions before `compinit`?

Do not equate `command not found` with `not installed`.

### OpenClaw is running, but `openclaw` is not found

Validated environment pattern:

- `openclaw` and `openclaw-gateway` processes are active
- completion files exist in `~/.openclaw/completions`
- executable lives under `/opt/homebrew/bin/openclaw`
- current SSH shell path omits `/opt/homebrew/bin`

Best fix:

- add `/opt/homebrew/bin` to the target user's shell PATH
- then re-test `which openclaw` and `openclaw --version`

### `compdef: command not found`

Most likely cause:

- completion file was sourced before `compinit`

Best fix:

- initialize zsh completions before sourcing the tool completion file

## Best Practices

- Prefer `Tailscale + Remote Login` over exposing SSH directly to the internet.
- Start with read-only validation before editing the target Mac.
- When SSH works but commands fail, inspect shell environment before reinstalling software.
- On Apple Silicon Macs, explicitly consider `/opt/homebrew/bin` whenever tools seem to disappear in remote shells.
- Treat GUI session success and SSH session success as different environments until proven otherwise.
- Make the smallest shell-config change that explains the failure.
- Recommend SSH public-key login after initial bring-up.
- If the user shared a login password in chat, recommend password rotation afterward.

## Output Expectations

When using this skill, prefer outputs that are practical and reusable:

- a shortest-path setup sequence
- exact validation commands
- diagnosis of the current failure point
- a minimal shell or PATH fix
- a concise checklist or runbook if the user wants documentation

Keep the answer grounded in verified steps. Do not claim GUI desktop control if only SSH has been validated.
