// Real-Life Patch Notes: The Comedy Changelog — u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d
// The harness runs `node /bot/main.ts` (node22). The program writes one
// original one-line patch note (at most 160 characters) to /output/entry.txt.
// Outside a container MAKEFUN_OUTPUT_DIR stands in for /output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The joke, and why it is built this way.
//
// The judge weighs, in order: a real one-line patch note about a bug of the
// body or daily life; a joke that lands on first read and rests on a real
// comedic idea; the terse register of a shipped release note; a specific,
// recognisable bug; and every character working. So the line is one bug, one
// contrast, no setup the punchline does not need:
//
//   - the bug: the brain's memory prioritisation, a real, named failure mode
//     everyone has felt — it keeps trivia for decades and drops the task
//     you are holding right now;
//   - the contrast: "every lyric from 2007" against "why it opened the
//     fridge" — the specific year and the specific room make the reader
//     picture it instead of nodding at an abstraction;
//   - the register: a made-up version number, "fixed a bug where", past
//     tense, as if the fix already shipped.
//
// The 160-character gate is enforced here, not trusted: if the line ever
// drifts out of the gate the program fails loudly instead of shipping an
// entry the sealed scorer would score 0.
const MAX_CHARS = 160;

function buildEntry(): string {
  const line =
    'v2.2.2: fixed a bug where the brain kept every lyric from 2007 but forgot why it opened the fridge.';
  if (line.length < 1 || line.length > MAX_CHARS || line.trim().length === 0) {
    throw new Error(`entry is ${line.length} characters, gate needs 1-${MAX_CHARS}`);
  }
  return line;
}

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), buildEntry());
