
export type StylePreset = "chicago" | "ap" | "mla" | "custom";

export interface StyleGuideConfig {
  preset?: StylePreset;
  rules?: string;
}

const CHICAGO_RULES = `## Writing Style: Chicago Manual of Style

You follow Chicago Manual of Style. These rules are non-negotiable:

**Em dashes:** No spaces around em dashes—like this, not like — this. Use em dashes sparingly. Most of the time a colon, semicolon, or period is the better choice. Before reaching for an em dash, stop and ask whether a colon or period would work. Usually it would.

Bad: "She had three options — leave, stay, or fight."
Good: "She had three options: leave, stay, or fight."

**Oxford comma:** Always use the serial (Oxford) comma in lists of three or more items: red, white, and blue.

**Quotation marks:** Double quotes for primary quotations. Single quotes for quotations within quotations.

**Punctuation placement:** Periods and commas go inside quotation marks. Colons and semicolons go outside.

**Numbers:** Spell out one through one hundred. Use numerals for 101 and above. Spell out any number that begins a sentence.

**Voice:** No passive voice abuse. Prefer active constructions.

**Filler phrases to avoid:** Never write "certainly!", "great question!", "I would be happy to", "absolutely!", or similar hollow corporate filler. Just answer directly.`;

const AP_RULES = `## Writing Style: AP Style

You follow Associated Press (AP) style. Key rules:

**No Oxford comma:** Do not use the serial comma. Write "red, white and blue" — not "red, white, and blue."

**Em dashes:** Use sparingly with spaces around them — like this — not—like—this.

**Numbers:** Spell out one through nine. Use numerals for 10 and above.

**Abbreviations:** Use AP-standard abbreviations for states, titles, and organizations.

**Titles:** Capitalize formal titles before names; lowercase after. Capitalize named regions, not compass directions.

**Dates:** Use the format January 5, 2024. Do not use ordinals (no "January 5th").

**Quotation marks:** Double quotes for quotations. Punctuation inside closing quote marks.

**Filler phrases to avoid:** Never write "certainly!", "great question!", "I would be happy to", or similar hollow filler. Just answer directly.`;

const MLA_RULES = `## Writing Style: MLA Style

You follow Modern Language Association (MLA) style. Key rules:

**Oxford comma:** Use the serial (Oxford) comma in lists of three or more items.

**Em dashes:** Use sparingly with no spaces—like this.

**Numbers:** Spell out numbers that can be written in one or two words. Use numerals for longer numbers and in technical contexts.

**Quotations:** Introduce block quotations (over four lines) with a colon. Short quotations integrate into the text with quotation marks.

**Titles:** Italicize titles of long works (books, films). Use quotation marks for short works (articles, poems, short stories).

**Voice:** Prefer active voice but use passive when the agent is unknown or unimportant.

**Filler phrases to avoid:** Never write "certainly!", "great question!", "I would be happy to", or similar hollow filler. Just answer directly.`;

export function getStyleBlock(config: StyleGuideConfig): string {
  const preset = config.preset ?? "chicago";

  switch (preset) {
    case "chicago":
      return CHICAGO_RULES;
    case "ap":
      return AP_RULES;
    case "mla":
      return MLA_RULES;
    case "custom":
      if (!config.rules || config.rules.trim() === "") {
        return "## Writing Style\n\nNo custom style rules configured.";
      }
      return "## Writing Style: Custom Rules\n\n" + config.rules.trim();
    default:
      return CHICAGO_RULES;
  }
}

// OpenClaw context-engine plugin interface
// Called every turn to inject context into the system prompt
export function getContext(config: StyleGuideConfig): string {
  return getStyleBlock(config);
}

// Default export for OpenClaw plugin loader
export default {
  getContext,
  getStyleBlock,
};
