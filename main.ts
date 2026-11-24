// The Worst App Idea Ever Pitched — QueueBuddy.
// One sentence, at most 240 characters, pitching the worst app imaginable:
// a virtual queue for your own front door, with a premium tier that lets
// you skip ahead of yourself. The program writes it to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "QueueBuddy lets you join a virtual line for your own front door, so you can wait forty minutes to enter a house you already own, with premium users skipping ahead of themselves.";

const MAX_CHARS = 240;

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (LINE.trim() !== LINE) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  const sentences = LINE.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error("entry must be one sentence");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/entry.txt`;
  writeFileSync(outPath, LINE, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("entry.txt does not match the validated line");
  }
  console.log(`Wrote ${chars} characters, 1 sentence to ${outPath}`);
}

main();
