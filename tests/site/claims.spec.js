import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const binary = join(process.cwd(), "target/debug/action-parity-probe");

function run(args) {
  return spawnSync(binary, args, { encoding: "utf8" });
}

test("@claim:static-inventory inventories declared workflow requirements", () => {
  const result = run(["check", "examples/sample-repo", "--profile", "generic", "--format", "json"]);
  expect(result.status).toBe(1);
  const report = JSON.parse(result.stdout);
  expect(report.inventory.actions.length).toBeGreaterThan(0);
  expect(report.inventory.job_images.length).toBeGreaterThan(0);
  expect(report.inventory.service_images.length).toBeGreaterThan(0);
  expect(report.inventory.permissions.length).toBeGreaterThan(0);
  expect(report.inventory.runner_labels.length).toBeGreaterThan(0);
  expect(report.inventory.shells.length).toBeGreaterThan(0);
  expect(report.inventory.commands.length).toBeGreaterThan(0);
});

test("@claim:no-workflow-execution never executes workflow steps", () => {
  const root = mkdtempSync(join(tmpdir(), "parity-no-exec-"));
  const workflowDir = join(root, ".github", "workflows");
  const marker = join(root, "workflow-ran");
  mkdirSync(workflowDir, { recursive: true });
  writeFileSync(join(workflowDir, "danger.yml"), `name: Do not run\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: touch ${marker}\n`);
  const result = run(["check", root, "--profile", "act", "--probe", "--sandbox"]);
  expect([0, 1]).toContain(result.status);
  expect(existsSync(marker)).toBe(false);
});

test("@claim:observed-probes labels host failures as observed", () => {
  const result = spawnSync(
    binary,
    ["check", "examples/sample-repo", "--profile", "generic", "--json", "--probe", "--sandbox"],
    { encoding: "utf8", env: { ...process.env, PATH: "" } },
  );
  expect(result.status).toBe(1);
  const report = JSON.parse(result.stdout);
  expect(report.summary.observed_failures).toBeGreaterThan(0);
  expect(report.findings.some((finding) => finding.source === "observed")).toBe(true);
});

test("@claim:report-formats emits four portable report formats", () => {
  for (const format of ["terminal", "json", "markdown", "sarif"]) {
    const result = run(["check", "examples/sample-repo", "--profile", "generic", "--format", format]);
    expect(result.status).toBe(1);
    expect(result.stdout.length).toBeGreaterThan(100);
  }
  const sarif = JSON.parse(run(["check", "examples/sample-repo", "--profile", "generic", "--format", "sarif"]).stdout);
  expect(sarif.version).toBe("2.1.0");
});

test("@claim:demo-sandbox demo uses sample data and preserves a report", () => {
  const result = run(["demo"]);
  expect(result.status).toBe(0);
  expect(result.stdout).toContain("Demo — bundled sample data");
  const reportPath = result.stdout.match(/Report: (.+)/)?.[1]?.trim();
  expect(reportPath).toBeTruthy();
  expect(readFileSync(reportPath, "utf8")).toContain("# Action Parity Probe report");
});

test("@claim:versioned-profiles ships four versioned runner profiles", () => {
  const result = run(["profiles", "--json"]);
  expect(result.status).toBe(0);
  const profiles = JSON.parse(result.stdout);
  expect(profiles).toHaveLength(4);
  expect(profiles.every((profile) => /^\d{4}-\d{2}$/.test(profile.version))).toBe(true);
});

test("@claim:site-privacy demo makes only same-origin requests and stores no data", async ({ page }) => {
  const origins = [];
  page.on("request", (request) => origins.push(new URL(request.url()).origin));
  await page.goto("/demo");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await page.getByRole("button", { name: "Reset demo" }).click();
  const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }));
  expect(storage).toEqual({ local: 0, session: 0 });
  expect(new Set(origins)).toEqual(new Set(["http://127.0.0.1:4173"]));
});

test("@claim:no-accounts-or-telemetry has no account surface or telemetry requests", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const origins = [];
  page.on("request", (request) => origins.push(new URL(request.url()).origin));

  for (const route of ["/", "/demo", "/privacy", "/terms"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
  }

  await page.goto("/");
  await expect(page.locator(".facts li").filter({ hasText: "No accounts or telemetry" })).toContainText("No accounts or telemetry");
  await expect(page.locator("form, input, select, textarea")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /sign in|log in|create account|register/i })).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(new Set(origins)).toEqual(new Set(["http://127.0.0.1:4173"]));
  await context.close();
});

test("@claim:cli-privacy CLI source has no network or telemetry client", () => {
  const manifest = readFileSync(join(process.cwd(), "Cargo.toml"), "utf8");
  const source = ["src/lib.rs", "src/main.rs", "src/analyze.rs", "src/inventory.rs", "src/output.rs", "src/probe.rs", "src/profile.rs"]
    .map((path) => readFileSync(join(process.cwd(), path), "utf8"))
    .join("\n");
  expect(manifest).not.toMatch(/\b(reqwest|ureq|hyper|opentelemetry|sentry)\b/);
  expect(source).not.toMatch(/std::net|TcpStream|UdpSocket|telemetry|analytics/);
});

test("@claim:free-open-source ships under the MIT license", () => {
  const license = readFileSync(join(process.cwd(), "LICENSE"), "utf8");
  expect(license).toContain("Permission is hereby granted, free of charge");
});
