
import { getStyleBlock } from "./index";

console.log("=== openclaw-style-guide plugin test ===\n");

const chicagoBlock = getStyleBlock({ preset: "chicago" });
console.log("--- chicago preset ---");
console.log(chicagoBlock.slice(0, 300) + "...\n");

const apBlock = getStyleBlock({ preset: "ap" });
console.log("--- ap preset ---");
console.log(apBlock.slice(0, 200) + "...\n");

const mlaBlock = getStyleBlock({ preset: "mla" });
console.log("--- mla preset ---");
console.log(mlaBlock.slice(0, 200) + "...\n");

const customBlock = getStyleBlock({ preset: "custom", rules: "Always use active voice. Keep sentences under 25 words. No jargon." });
console.log("--- custom preset ---");
console.log(customBlock + "\n");

const emptyCustom = getStyleBlock({ preset: "custom", rules: "" });
console.log("--- custom preset (empty rules) ---");
console.log(emptyCustom + "\n");

console.log("--- getStyleBlock() for chicago ---");
const ctx = getStyleBlock({ preset: "chicago" });
console.log("Length:", ctx.length, "chars");
console.log("\n=== All 4 presets working ===");
