# Prompt And Query Patterns

Use these patterns when the user wants practical OpenClaw call wording or Flux2-style prompt shaping.

## Flux2 Prompt Structure

Preferred order:

```text
[subject], [environment], [lighting], [style/camera], [details]
```

Examples:

```text
a cinematic portrait of a traveler standing in light rain on a neon street in Shanghai, realistic, detailed, moody lighting
```

```text
a beautiful young Asian woman in ancient traditional Chinese clothing, standing on a stone bridge in light rain, ancient water town and river in the background, soft natural lighting, cinematic photography, elegant smile, holding a traditional umbrella
```

## Standard OpenClaw Tool Template

```text
Call the local ComfyUI MCP tool generate_local_image.
Do not use any built-in image generation model.
Prompt: [English prompt]
width: 1024
height: 1024
steps: 8
guidance: 4.0
filename_prefix: openclaw
```

## Chinese Request To English Prompt

When the user gives a Chinese request:

1. preserve subject and scene first
2. add only a few quality/style words
3. keep the prompt concise and concrete

Avoid overloading with tags such as:

- masterpiece
- best quality
- 8k

unless the user explicitly wants that style.

## Slow Job Follow-up Template

When the first call returns only `prompt_id`:

```text
Call the local ComfyUI MCP tool get_local_image_result.
prompt_id: [the previous prompt_id]
```

## Duplicate Submission Warning

After `status: submitted`:

- do not call `generate_local_image` again for the same request
- always query with `get_local_image_result`
