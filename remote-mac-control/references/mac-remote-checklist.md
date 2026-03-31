# Mac Remote Control Checklist

Use this reference when the user wants the shortest repeatable path for setting up or troubleshooting remote command-line access to a Mac.

## Goal

Reach a state where:

- target Mac is reachable through `Tailscale`
- `Remote Login` is enabled
- controller Mac can SSH into target Mac
- CLI tools are visible and usable in the remote shell

## 1. Join the target Mac to Tailscale

Expected result:

- target Mac joins the same private network as the controller machine
- target Mac has a `100.x.x.x` Tailscale IP

Validation:

```bash
tailscale ip -4
```

## 2. Enable Remote Login

Validation:

```bash
sudo systemsetup -getremotelogin
whoami
```

Expected result:

- `Remote Login: On`
- target username is known for SSH login

## 3. Validate SSH from controller Mac

From the controller machine:

```bash
ssh USER@TAILSCALE_IP 'whoami; hostname'
```

Expected result:

- target Mac returns the remote username and hostname

## 4. If a CLI tool is missing, inspect shell environment first

Run on the target Mac over SSH:

```bash
which openclaw
echo $PATH
sed -n '1,220p' ~/.zshrc ~/.zprofile ~/.zshenv ~/.profile 2>/dev/null
```

Common cause:

- SSH shell PATH differs from the GUI terminal PATH

## 5. Fix zsh completion initialization if needed

Symptom:

- shell login shows `compdef: command not found`

Fix pattern:

```zsh
autoload -Uz compinit
compinit
source "/Users/USERNAME/.openclaw/completions/openclaw.zsh"
```

## 6. Fix Homebrew path visibility if needed

Symptom:

- `openclaw` is running or installed
- but current SSH shell cannot find it

Check:

```bash
ls -l /opt/homebrew/bin/openclaw /opt/homebrew/bin/node /opt/homebrew/bin/npm 2>/dev/null
echo $PATH
```

Fix pattern:

```zsh
export PATH="/opt/homebrew/bin:$PATH"
```

## 7. Re-validate tool availability

```bash
which openclaw
openclaw --version
```

## 8. Troubleshooting order

When something fails, check in this order:

1. Is target Mac online in `Tailscale`?
2. Is `Remote Login` enabled?
3. Can controller Mac SSH to the target?
4. Does the target shell PATH include `/opt/homebrew/bin`?
5. Is the tool actually running as a process?
6. Are zsh completions sourced before `compinit`?

## 9. Security follow-up

After initial bring-up:

- rotate any password that was shared in chat
- switch from password login to SSH public-key login
- keep SSH off the public internet when `Tailscale` is available
