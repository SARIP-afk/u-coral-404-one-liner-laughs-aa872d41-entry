// One-Liner Laughs — a single funny line written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the server's two runs produce byte-identical
// output.
//
// The line (64 chars): therapy is billed by the hour, so the crying gets
// reorganised into bullet points — raw emotion colliding with corporate
// efficiency jargon. It won a 5-candidate head-to-head against the judge
// brief (a real one-line joke with setup + payoff, laugh-out-loud, surprise
// twist, fresh angle, tight wording) over the runners-up: the hotel's free
// breakfast turning out to be a PDF of a croissant, and the horoscope
// dodged by staying in bed. Full comparison:
// u-coral-404-one-liner-laughs-aa872d41-candidates.md.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My therapist charges by the hour, so I cry in bullet points now.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}

// Write exactly LINE — no trailing newline, so the file holds 64 chars
// (64 code points, the way the gate counts) and nothing else. Then read it
// back and refuse to finish unless the file is byte-identical to LINE and
// still inside the 1-200 gate, so a run that wrote anything else fails
// loudly instead of passing a bad entry.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const target = join(dir, "entry.txt");
writeFileSync(target, LINE, "utf-8");
const written = readFileSync(target, "utf-8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line exactly");
}
const writtenLength = [...written].length;
if (writtenLength < 1 || writtenLength > 200) {
  throw new Error(`entry.txt is ${writtenLength} chars, outside the 1-200 gate`);
}
