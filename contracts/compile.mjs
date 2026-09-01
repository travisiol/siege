// Compile-check the contracts without Foundry.
//
// Foundry is the project's test runner, but it is not installed here, so this
// runs solc directly to catch every syntax and type error. It resolves
// @openzeppelin imports out of node_modules, exactly as the foundry remapping
// does, so both paths see the same sources.
//
//   node contracts/compile.mjs

import solc from "solc";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const TARGETS = [
  "src/lib/FixedMath.sol",
  "src/lib/Rules.sol",
  "src/HexwarToken.sol",
  "src/Map.sol",
  "src/Battle.sol",
  "src/Season.sol",
  "test/Harness.sol",
  "test/Invariants.t.sol",
  "test/Unit.t.sol",
  "script/Deploy.s.sol",
];

function resolve(path) {
  if (path.startsWith("@openzeppelin/")) {
    return join(root, "node_modules", path);
  }
  if (path.startsWith("src/") || path.startsWith("test/") || path.startsWith("script/")) {
    return join(here, path);
  }
  return join(here, "src", path);
}

const sources = {};
for (const t of TARGETS) {
  sources[t] = { content: readFileSync(join(here, t), "utf8") };
}

function findImports(path) {
  const candidates = [resolve(path), join(here, path), join(root, "node_modules", path)];
  for (const c of candidates) {
    if (existsSync(c)) return { contents: readFileSync(c, "utf8") };
  }
  return { error: `not found: ${path}` };
}

const input = {
  language: "Solidity",
  sources,
  settings: {
    optimizer: { enabled: true, runs: 200 },
    evmVersion: "cancun",
    outputSelection: {
      "*": { "*": ["abi", "evm.bytecode.object", "evm.gasEstimates"] },
    },
  },
};

const out = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

let errors = 0;
let warnings = 0;
for (const e of out.errors ?? []) {
  // The OZ tree emits its own style warnings; only ours are worth printing.
  const ours = !(e.sourceLocation?.file ?? "").includes("node_modules");
  if (e.severity === "error") {
    errors++;
    console.log("\nERROR  " + e.formattedMessage);
  } else if (ours) {
    warnings++;
    console.log("\nwarn   " + e.formattedMessage);
  }
}

if (errors === 0) {
  console.log("\ncompiled clean" + (warnings ? ` (${warnings} warnings)` : ""));
  const outDir = join(here, "out");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  for (const [file, contracts] of Object.entries(out.contracts ?? {})) {
    for (const [name, c] of Object.entries(contracts)) {
      const size = (c.evm?.bytecode?.object?.length ?? 0) / 2;
      if (size > 0) {
        console.log(`  ${name.padEnd(14)} ${String(size).padStart(6)} bytes` +
          (size > 24576 ? "   OVER 24KB LIMIT" : ""));
      }
      writeFileSync(join(outDir, `${name}.abi.json`), JSON.stringify(c.abi, null, 2));
      file;
    }
  }
  console.log("\nABIs written to contracts/out/");
}

process.exit(errors === 0 ? 0 : 1);
