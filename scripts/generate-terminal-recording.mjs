import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const command = "action-parity-probe demo";
const result = spawnSync("cargo", ["run", "--quiet", "--", "demo"], { encoding: "utf8" });

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout);
  process.exit(result.status ?? 2);
}

const lines = result.stdout.trim().split("\n");
const target = lines.find((line) => line.startsWith("Target: "));
const outcome = lines.find((line) => line.startsWith("Result: "));
const scanned = lines.find((line) => line.startsWith("Scanned: "));
const reportLine = lines.find((line) => line.startsWith("Report: "));

if (!target || !outcome || !scanned || !reportLine) {
  throw new Error("The CLI demo output is missing a terminal-recording field.");
}

const reportPath = reportLine.slice("Report: ".length).trim();
const demoDirectory = resolve(dirname(reportPath));
const temporaryRoot = `${resolve(tmpdir())}/action-parity-probe-demo-`;
if (!demoDirectory.startsWith(temporaryRoot)) {
  throw new Error(`Refusing to remove unexpected demo directory: ${demoDirectory}`);
}

const shownLines = [
  `$ ${command}`,
  "Action Parity Probe v0.1.0",
  target,
  outcome,
  scanned,
  "Static and observed findings stay separate.",
  "Report: /tmp/action-parity-probe-demo-…/parity-report.md",
];

const escapeXml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
})[character]);

const textRows = shownLines.map((line, index) => {
  const fill = index === 0 ? "#f4f1df" : index === 3 ? "#ff7272" : index === 6 ? "#37e6ff" : "#b8c1c8";
  const weight = index === 3 ? ' font-weight="700"' : "";
  return `  <text x="42" y="${78 + index * 34}" fill="${fill}"${weight} font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="18">${escapeXml(line)}</text>`;
}).join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="348" viewBox="0 0 1120 348" role="img" aria-labelledby="title description">
  <title id="title">Action Parity Probe demo terminal recording</title>
  <desc id="description">The real CLI checks the bundled workflow, reports a nonportable result, and prints a temporary Markdown report path.</desc>
  <path fill="#090d13" stroke="#324557" stroke-width="2" d="M1 1h1090l28 28v318H1z"/>
  <path fill="#111823" d="M2 2h1089l27 27v24H2z"/>
  <circle fill="#ff5ca8" cx="24" cy="27" r="6"/><circle fill="#ffc857" cx="45" cy="27" r="6"/><circle fill="#78f7a6" cx="66" cy="27" r="6"/>
  <text x="91" y="33" fill="#b8c1c8" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="15">recording / bundled sample</text>
${textRows}
</svg>\n`;

mkdirSync("site/public/assets", { recursive: true });
writeFileSync(join("site", "public", "assets", "terminal-recording.svg"), svg);
rmSync(demoDirectory, { recursive: true });
