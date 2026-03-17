# @borgesius/openclaw-style-guide

An OpenClaw context-engine plugin that injects writing style rules into every agent system prompt, enforcing consistent prose across all outputs.

## Install

```
openclaw plugins install @borgesius/openclaw-style-guide
```

## What It Does

This plugin is a `context-engine` kind — it runs every turn and injects a style guide block into the agent system prompt. The injected block gives the agent clear, forceful rules about punctuation, grammar, and writing conventions to follow.

## Configuration

Configure via `plugins.entries.openclaw-style-guide.config` in your openclaw.json:

```json
{
  "plugins": {
    "entries": {
      "openclaw-style-guide": {
        "config": {
          "preset": "chicago",
          "rules": ""
        }
      }
    }
  }
}
```

### Presets

**`chicago`** (default) — Chicago Manual of Style:
- Em dashes with no spaces (word—word), used sparingly; prefer colon/semicolon/period
- Oxford comma always
- Double quotes primary, single quotes nested
- Numbers one through one hundred spelled out; 101+ use numerals
- Active voice preferred
- No hollow corporate filler ("certainly!", "great question!", etc.)

**`ap`** — AP Style:
- No Oxford comma
- Em dashes with spaces around them
- Numbers: spell out one–nine, numerals for 10+
- AP abbreviation conventions

**`mla`** — MLA Academic Style:
- Oxford comma
- Em dashes with no spaces
- Academic citation conventions
- Spell out numbers writable in one or two words

**`custom`** — User-defined rules:
```json
{
  "preset": "custom",
  "rules": "Always use active voice. Keep sentences under 25 words. No jargon. Oxford comma required."
}
```

## Injected Prompt Example

When `preset: "chicago"`, the plugin injects a block like this into every system prompt:

```
## Writing Style: Chicago Manual of Style

You follow Chicago Manual of Style. These rules are non-negotiable:

**Em dashes:** No spaces around em dashes—like this, not like — this. Use em dashes sparingly...
...
```

## License

MIT
