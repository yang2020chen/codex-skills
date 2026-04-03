---
name: openclaw-comfyui-local-image
description: Use this skill when connecting OpenClaw to a local ComfyUI instance for image generation, especially through an MCP bridge, a fixed ComfyUI API workflow, Flux2-style prompt shaping, local adapter scripts, long-running image jobs, and troubleshooting OpenClaw tool timeouts or duplicate submissions.
---

# OpenClaw ComfyUI Local Image

## Overview

Use this skill when the user wants OpenClaw to generate images through a local ComfyUI workflow instead of a hosted image model.

This skill is optimized for a practical local chain:

```text
OpenClaw -> MCP server -> local ComfyUI adapter -> ComfyUI HTTP API -> output image paths
```

Use it for:

- connecting OpenClaw to ComfyUI through MCP
- turning a validated ComfyUI workflow into an API-backed local image tool
- shaping Chinese requests into Flux2-friendly English prompts
- handling slow generations without tool-level false failures
- avoiding duplicate submissions when a job is still running
- documenting or templatizing the setup for reuse

Do not use this skill when the user only wants to tweak a ComfyUI node graph manually in the GUI with no OpenClaw integration.

## Goals

When using this skill, aim to produce a setup that is:

1. Local-first
2. Reusable
3. Safe to retry
4. Easy to validate from the terminal before relying on OpenClaw
5. Explicit about how slow jobs are queried after submission

## Recommended Structure

Prefer a fixed workflow template plus a thin adapter layer.

Recommended roles:

- `ComfyUI`: runs inference and owns the workflow JSON
- `adapter script`: fills prompt and generation parameters, submits jobs, and reads results
- `MCP server`: exposes stable tools such as `generate_local_image` and `get_local_image_result`
- `OpenClaw`: decides prompt and parameters, then calls the MCP tools

Do not make OpenClaw assemble arbitrary ComfyUI node graphs on the fly unless the user explicitly wants that complexity.

## Workflow

Follow this order unless the user asks for only one part.

### 1. Confirm the local ComfyUI baseline

First verify:

- ComfyUI is already installed and starts locally
- the target workflow works in the ComfyUI UI before automation
- the workflow can be exported in API format
- the workflow uses a stable model combination that fits local memory limits

If the user wants a reusable handoff checklist, read [references/setup-checklist.md](references/setup-checklist.md).

### 2. Freeze a single API workflow template

Prefer one known-good API JSON template over many variants.

Expose only the parameters the agent actually needs:

- `prompt`
- `width`
- `height`
- `steps`
- `guidance`
- `seed`
- `filename_prefix`

Keep model selection fixed inside the template unless the user explicitly wants multi-model routing.

### 3. Add a local adapter script

The adapter should:

- load the workflow JSON
- replace prompt and generation inputs
- submit to ComfyUI at `/prompt`
- poll `/history/<prompt_id>`
- return absolute output image paths

Prefer two code paths:

- a normal generate path that waits for completion
- a start-or-submit path that returns `prompt_id` when the job is still running

### 4. Expose two MCP tools

Recommended minimum tool set:

- `generate_local_image`
- `get_local_image_result`

Expected behavior:

- fast jobs return `image_paths`
- slow jobs return `status: submitted` plus `prompt_id`
- follow-up calls query by `prompt_id`

Do not resubmit the same request after `status: submitted`, because that creates duplicate images.

### 5. Validate outside OpenClaw first

Before testing the full agent path, validate in this order:

1. ComfyUI UI works
2. the adapter script works from the terminal
3. the MCP server is registered
4. OpenClaw can see the MCP tools

Treat terminal validation as the source of truth for whether ComfyUI and the workflow are healthy.

### 6. Shape prompts for Flux2-style workflows

When the user gives Chinese image requirements, convert them into concise English prompts with this structure:

```text
[subject], [environment], [lighting], [style/camera], [details]
```

Prefer:

- explicit subject
- explicit setting
- realistic photography or cinematic wording when desired
- a few concrete detail words instead of many generic hype tags

For ready-to-use prompt patterns and slow-job usage wording, read [references/prompt-and-query-patterns.md](references/prompt-and-query-patterns.md).

## Practical Defaults

If the user does not specify otherwise, these are good defaults for a local Flux2-style setup:

- `width = 1024`
- `height = 1024`
- `steps = 8`
- `guidance = 4.0`
- English prompt
- one fixed workflow template

For faster previews, reduce:

- `width` and `height` to `768`
- `steps` to `6`

## Troubleshooting

### OpenClaw says the tool timed out

Do not immediately assume generation failed.

Check whether:

- ComfyUI received the prompt
- a `prompt_id` was returned
- the output eventually appeared in the ComfyUI output directory

Best fix:

- make `generate_local_image` wait only a short time
- return `status: submitted` when the job is still running
- use `get_local_image_result` for the second step

### OpenClaw generates two images for one request

Most likely cause:

- the agent or server resubmitted the same request after timeout

Best fix:

- submit only once
- return the original `prompt_id`
- query status later instead of resubmitting

### OpenClaw falls back to a built-in image model

Use explicit wording in the user-facing template:

- call the local MCP tool by name
- say not to use the built-in image model

### Terminal works but OpenClaw does not

Check these in order:

1. ComfyUI is still reachable locally
2. the MCP server is registered in the OpenClaw config
3. the OpenClaw client has been restarted
4. the test is running in a fresh conversation

## Output Expectations

When helping with this workflow, prefer outputs such as:

- a new skill or setup guide
- an adapter script
- an MCP server file
- a workflow template path
- a clear tool-calling template for OpenClaw
- a concise troubleshooting checklist

Keep the advice operational. Favor concrete file paths, tool names, and validation steps over broad conceptual explanations.
