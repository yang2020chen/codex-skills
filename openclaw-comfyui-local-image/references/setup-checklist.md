# OpenClaw + ComfyUI Setup Checklist

Use this checklist when the user wants a compact implementation plan or handoff document.

## Local Components

Confirm these pieces exist:

- a working local ComfyUI install
- one fixed API-format workflow JSON
- one adapter script that calls the ComfyUI HTTP API
- one MCP server that exposes stable tools
- one OpenClaw config entry that registers the MCP server

## Recommended Files

Suggested layout:

```text
<COMFYUI_DIR>/workflows/<workflow_name>.json
<OPENCLAW_HOME>/scripts/comfyui_adapter.py
<OPENCLAW_HOME>/scripts/comfyui_mcp_server.py
<OPENCLAW_HOME>/openclaw.json
```

## ComfyUI Validation

Confirm all of the following before wiring OpenClaw:

1. ComfyUI starts locally
2. the browser UI opens
3. the workflow runs manually in the UI
4. the workflow has been exported in API format

## Adapter Responsibilities

The adapter should:

- load the API workflow JSON
- replace prompt and generation parameters
- submit to `/prompt`
- poll `/history/<prompt_id>`
- extract image filenames
- return absolute paths

## MCP Tool Design

Minimum tools:

- `generate_local_image`
- `get_local_image_result`

Expected return model:

- `status: completed` with `image_paths`
- or `status: submitted` with `prompt_id`

## Validation Order

Validate in this order:

1. ComfyUI UI
2. terminal adapter command
3. MCP server registration
4. OpenClaw tool call

If step 2 fails, do not debug OpenClaw yet.

## Slow Job Rule

If a job is still running:

- do not resubmit the same job
- return the original `prompt_id`
- query it later with `get_local_image_result`
