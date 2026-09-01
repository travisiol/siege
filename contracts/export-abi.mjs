// Turn the compiled ABIs into a typed TS module for the site and the indexer.
//
// Emitted `as const` so viem can infer argument and return types from the ABI
// itself: a renamed function or a changed argument then fails at the type level
// rather than at runtime against a live chain.
//
//   node contracts/export-abi.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const NAMES = ["Battle", "Map", "Season", "HexwarToken"];

let out = `/*
 * GENERATED — do not edit by hand. Regenerate with \`npm run contracts:abi\`.
 *
 * Emitted from the solc output so the site cannot drift from the contracts it
 * talks to.
 */

`;

for (const name of NAMES) {
  const abi = JSON.parse(readFileSync(join(here, "out", `${name}.abi.json`), "utf8"));
  // Errors and constructors are noise for the client; keep the callable surface.
  const keep = abi.filter((e) => e.type === "function" || e.type === "event");
  out += `export const ${name.toLowerCase()}Abi = ${JSON.stringify(keep)} as const;\n\n`;
}

writeFileSync(join(here, "..", "src", "lib", "abi.ts"), out);
console.log(`abi written  ${NAMES.join(", ")}`);
