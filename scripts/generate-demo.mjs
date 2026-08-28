import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";

mkdirSync("site/src", { recursive: true });
const result = spawnSync(
  "cargo",
  [
    "run",
    "--quiet",
    "--",
    "check",
    "examples/sample-repo",
    "--profile",
    "act-nektos-ubuntu-22.04",
    "--format",
    "json",
    "--output",
    "site/src/demo-report.json",
  ],
  { stdio: "inherit" },
);

if (![0, 1].includes(result.status ?? 2)) {
  process.exit(result.status ?? 2);
}
