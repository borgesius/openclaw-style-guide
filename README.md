# @borgesius/openclaw-style-guide

[![npm version](https://img.shields.io/npm/v/@borgesius/openclaw-style-guide.svg)](https://www.npmjs.com/package/@borgesius/openclaw-style-guide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An OpenClaw context-engine plugin that injects writing style rules into every agent system prompt. Enforce consistent prose—Chicago, AP, MLA, or your own custom style—across all your AI outputs.

## Why?

LLMs default to inconsistent, often corporate-sounding prose. They overuse em dashes, hedge constantly, and throw in phrases like "Certainly!" and "Great question!" that make your assistant sound like a chatbot.

This plugin fixes that by injecting clear, forceful style rules into every system prompt. Your agents write better because they have explicit rules to follow.

## Installation

```bash
openclaw plugins install @borgesius/openclaw-style-guide
```

Or with npm:

```bash
npm install @borgesius/openclaw-style-guide
```

Then add to your `openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "@borgesius/openclaw-style-guide": {}
    }
  }
}
```

## Configuration

Configure via `plugins.entries.@borgesius/openclaw-style-guide.config`:

```json
{
  "plugins": {
    "entries": {
      "@borgesius/openclaw-style-guide": {
        "config": {
          "preset": "chicago"
        }
      }
    }
  }
}
```

### Presets

| Preset | Description |
|--------|-------------|
| `chicago` | **Default.** Chicago Manual of Style. Oxford comma, em dashes without spaces (used sparingly), spell out numbers 1–100. |
| `ap` | AP Style. No Oxford comma, em dashes with spaces, spell out 1–9 only. |
| `mla` | MLA Academic Style. Oxford comma, academic conventions. |
| `custom` | Your own rules via the `rules` field. |

### Custom Rules

Define your own style guide:

```json
{
  "plugins": {
    "entries": {
      "@borgesius/openclaw-style-guide": {
        "config": {
          "preset": "custom",
          "rules": "Always use active voice. Keep sentences under 25 words. No jargon. Oxford comma required. Never start a sentence with 'I'."
        }
      }
    }
  }
}
```

## What Gets Injected

When using `chicago` (the default), the plugin adds this to every system prompt:

```
## Writing Style: Chicago Manual of Style

You follow Chicago Manual of Style. These rules are non-negotiable:

**Em dashes:** No spaces around em dashes—like this, not like — this.
Use em dashes sparingly. Most of the time a colon, semicolon, or period
is the better choice.

**Oxford comma:** Always use the serial (Oxford) comma in lists of three
or more items: red, white, and blue.

**Quotation marks:** Double quotes for primary quotations. Single quotes
for quotations within quotations.

**Punctuation placement:** Periods and commas go inside quotation marks.
Colons and semicolons go outside.

**Numbers:** Spell out one through one hundred. Use numerals for 101 and
above. Spell out any number that begins a sentence.

**Voice:** No passive voice abuse. Prefer active constructions.

**Filler phrases to avoid:** Never write "certainly!", "great question!",
"I would be happy to", "absolutely!", or similar hollow corporate filler.
Just answer directly.
```

## Token Cost

The style rules add **~200–300 tokens** to each system prompt depending on the preset. That's negligible: a typical conversation uses thousands of tokens, so the style guide is <1% of your context budget.

The tradeoff is worth it. You get consistent, professional prose without manually adding style instructions to every agent config.

## Model Compatibility

**Works well:**
- Claude (Sonnet, Opus, Haiku) — excellent at following style rules
- GPT-4, GPT-4o — good adherence
- Gemini Pro/Ultra — follows most rules

**Mixed results:**
- GPT-3.5-turbo — follows basic rules but may ignore subtleties (em dash spacing, Oxford comma)
- Smaller/local models — YMMV; they may lack the capacity to internalize all rules simultaneously

The more capable the model, the better it follows style guidance. If you're using a smaller model, consider using `custom` preset with fewer, simpler rules.

## How It Works

This is a `context-engine` plugin. It hooks into OpenClaw's `before_prompt_build` event and appends the style rules to the system context. The rules appear in every agent's system prompt, ensuring consistent style across all conversations.

## TypeScript

The package exports types if you want to use the style blocks programmatically:

```typescript
import { getStyleBlock, StyleGuideConfig, StylePreset } from '@borgesius/openclaw-style-guide';

const config: StyleGuideConfig = { preset: 'chicago' };
const styleBlock = getStyleBlock(config);
```

## License

MIT
