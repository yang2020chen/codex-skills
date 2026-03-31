---
name: remote-windows-control
description: Use this skill when setting up, validating, troubleshooting, or documenting remote command-line control of a Windows computer from another machine, especially with Tailscale, OpenSSH Server, PowerShell, winget, Node.js, OpenClaw, Claude Code, and Windows execution-policy issues.
---

# Remote Windows Control

## Overview

Use this skill for practical remote control of a Windows machine over command line, not GUI desktop sharing.

It is optimized for the workflow validated in this environment:

- Controller machine: macOS
- Remote machine: Windows
- Private network: `Tailscale`
- Remote command entry: `OpenSSH Server`
- Common post-setup tasks:
  - install tools with `winget`
  - install Node-based CLIs with `npm`
  - fix PowerShell execution-policy problems
  - verify `OpenClaw` and `Claude Code`

## When To Use

Use this skill when the user wants any of the following:

- connect to a Windows machine remotely without GUI desktop control
- prepare a Windows machine for remote maintenance
- install or troubleshoot `Tailscale` or `OpenSSH Server`
- validate SSH connectivity from macOS to Windows
- install tools on Windows through remote SSH
- fix "`*.ps1` cannot run" or PowerShell execution-policy problems
- install or validate `OpenClaw` or `Claude Code` on Windows
- capture the process into docs, checklists, or reusable runbooks

Do not use this skill when the task is mainly about:

- full GUI remote desktop workflows
- Active Directory / enterprise Windows domain policy
- deep Windows server hardening beyond SSH access

## Workflow

Follow this order unless the user requests a narrower task.

For a compact step-by-step checklist, read [references/windows-remote-checklist.md](references/windows-remote-checklist.md) when the user wants a runbook, handoff doc, or repeatable setup flow.

### 1. Confirm the network path

Prefer a private-network approach over direct public exposure.

Recommended structure:

- controller machine joins `Tailscale`
- target Windows machine joins the same `Tailscale` network
- SSH is used over the Tailscale IP, not a public IP

Key Windows validation commands:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "100.*"} | Select-Object IPAddress
```

### 2. Enable the Windows command entry point

Preferred remote entry: `OpenSSH Server`

Use these commands in elevated PowerShell:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

Then validate:

```powershell
Get-Service sshd
whoami
```

Expected outcome:

- `sshd` is `Running`
- the user account is known and can log in through SSH

### 3. Validate SSH from the controller machine

From macOS, connect with:

```bash
ssh USER@TAILSCALE_IP
```

Prefer a minimal read-only validation first, such as:

- `whoami`
- `hostname`
- `Get-ComputerInfo` through PowerShell

Keep the first remote action non-destructive.

### 4. Install tools in the Windows shell that actually works

On Windows, be careful about shell differences:

- `PowerShell` may block `*.ps1`
- `cmd` often works for Node CLI shims

For Node global installs, if `npm` fails in PowerShell because `npm.ps1` is blocked, use:

```powershell
cmd /c npm.cmd i -g PACKAGE_NAME
```

This is the preferred fallback for packages like `openclaw`.

### 5. Fix PowerShell execution-policy problems only when needed

Common symptom:

- command exists
- `where.exe` finds it
- PowerShell still says it cannot load `something.ps1`

Example fix:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
```

Then re-open PowerShell and validate:

```powershell
openclaw --version
claude --version
```

Use `CurrentUser`, not machine-wide scope, unless the user explicitly wants a broader change.

## Known Good Commands

### Windows SSH setup

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
Get-Service sshd
```

### Tailscale validation

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "100.*"} | Select-Object IPAddress
```

### Git for Windows

```powershell
winget install --id Git.Git -e --accept-package-agreements --accept-source-agreements
```

### OpenClaw install

```powershell
cmd /c npm.cmd i -g openclaw
openclaw --version
```

If blocked in PowerShell before execution-policy adjustment:

```powershell
openclaw.cmd --version
cmd /c openclaw --version
```

### Claude Code install

```powershell
winget install Anthropic.ClaudeCode --accept-package-agreements --accept-source-agreements
claude --version
```

If blocked in PowerShell before execution-policy adjustment:

```powershell
claude.cmd --version
cmd /c claude --version
```

## Troubleshooting

### Tailscale breaks local internet on macOS

Strong suspect:

- another app is already using TUN or a network extension

In the validated environment, the culprit was:

- `ClashX Pro` with enhanced mode / TUN enabled

Best practice:

- disable `ClashX Pro` TUN / enhanced mode
- keep it in normal system-proxy mode
- then reconnect `Tailscale`

### SSH works but tool commands fail

Check these in order:

1. Is the tool actually installed?
2. Does `where.exe TOOLNAME` find it?
3. Is PowerShell trying to run a blocked `*.ps1` shim?
4. Does `cmd /c TOOLNAME ...` work?

### A tool was installed but the terminal says command not found

Usually one of these:

- the shell window is old and has not picked up the new `PATH`
- the `winget` link or npm global path exists, but the current shell needs reopening
- PowerShell is intercepting a `*.ps1` shim and blocking execution

Use these checks:

```powershell
where.exe openclaw
where.exe claude
```

## Best Practices

- Prefer `Tailscale + OpenSSH Server` over exposing SSH directly to the internet.
- Start with read-only validation before making changes on the remote machine.
- Prefer `winget` for Windows-native packages and `cmd /c npm.cmd` for Node CLI installs when PowerShell is problematic.
- Use `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force` instead of broader execution-policy changes.
- Keep macOS controller networking simple; avoid stacking `Tailscale` with another active TUN-based tool.
- Do not treat a PowerShell `PSSecurityException` as proof that the package failed to install.
- Recommend SSH public-key login after initial bring-up.
- If the user shared a Windows password in chat, advise password rotation afterward.

## Output Expectations

When using this skill, prefer outputs that are practical and reusable:

- a shortest-path setup plan
- exact validation commands
- diagnosis of the current failure point
- a minimal safe fix
- a checklist or runbook if the user wants documentation

Keep the answer grounded in verified steps. Do not claim GUI control if only SSH has been validated.
