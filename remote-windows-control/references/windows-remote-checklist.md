# Windows Remote Control Checklist

Use this reference when the user wants the shortest repeatable path for setting up or troubleshooting remote command-line access to a Windows machine.

## Goal

Reach a state where:

- Windows is reachable through `Tailscale`
- `OpenSSH Server` is running
- macOS can SSH into Windows
- common CLI tools can be installed and validated remotely

## 1. Join the Windows machine to Tailscale

Expected result:

- Windows joins the same private network as the controller machine
- Windows has a `100.x.x.x` Tailscale IP

Validation:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "100.*"} | Select-Object IPAddress
```

## 2. Enable OpenSSH Server

Run in elevated PowerShell:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

Validate:

```powershell
Get-Service sshd
whoami
```

Expected result:

- `sshd` is `Running`
- the Windows username is known for SSH login

## 3. Validate SSH from macOS

From macOS:

```bash
ssh USER@TAILSCALE_IP
```

Use a read-only command first:

```bash
ssh USER@TAILSCALE_IP whoami
```

Expected result:

- Windows returns the remote username

## 4. Install base tooling

### Git for Windows

```powershell
winget install --id Git.Git -e --accept-package-agreements --accept-source-agreements
```

### OpenClaw

If PowerShell blocks `npm.ps1`, use:

```powershell
cmd /c npm.cmd i -g openclaw
```

Validate:

```powershell
openclaw.cmd --version
```

### Claude Code

```powershell
winget install Anthropic.ClaudeCode --accept-package-agreements --accept-source-agreements
```

Validate:

```powershell
claude.cmd --version
```

## 5. Fix PowerShell execution-policy issues

Symptom:

- the tool is installed
- `where.exe` finds it
- PowerShell says it cannot load `*.ps1`

Fix:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
```

Then reopen PowerShell and validate:

```powershell
openclaw --version
claude --version
```

## 6. Troubleshooting order

When something fails, check in this order:

1. Is the Windows machine online in `Tailscale`?
2. Does it have a `100.x.x.x` address?
3. Is `sshd` running?
4. Can macOS SSH to the Windows machine?
5. Is the tool installed?
6. Does `where.exe TOOLNAME` find it?
7. Is PowerShell blocking a `*.ps1` shim?

## 7. macOS controller caveat

If enabling `Tailscale` on macOS breaks local internet, suspect another active TUN-based tool.

Known-good fix from the validated environment:

- disable `ClashX Pro` enhanced mode / TUN
- keep `ClashX Pro` in normal system-proxy mode
- reconnect `Tailscale`

## 8. Security follow-up

After initial bring-up:

- rotate any password that was shared in chat
- switch from password login to SSH public-key login
- keep SSH off the public internet when `Tailscale` is available
