import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, lstatSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const binary = join(process.cwd(), "target/debug/action-parity-probe");

function run(args) {
  return spawnSync(binary, args, { encoding: "utf8" });
}

function snapshotTree(root) {
  const entries = [];
  function visit(directory, prefix = "") {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
      const path = join(directory, entry.name);
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const metadata = lstatSync(path);
      const item = {
        path: relativePath,
        type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : "file",
        mode: metadata.mode & 0o777,
        size: metadata.size,
        mtimeMs: metadata.mtimeMs,
      };
      if (entry.isFile()) item.bytes = readFileSync(path).toString("base64");
      if (entry.isSymbolicLink()) item.target = readlinkSync(path);
      entries.push(item);
      if (entry.isDirectory()) visit(path, relativePath);
    }
  }
  visit(root);
  return entries;
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
  const repository = mkdtempSync(join(tmpdir(), "parity-demo-repository-"));
  const workflowDirectory = join(repository, ".github", "workflows");
  const nestedDirectory = join(repository, "fixtures", "nested");
  mkdirSync(workflowDirectory, { recursive: true });
  mkdirSync(nestedDirectory, { recursive: true });
  writeFileSync(join(repository, ".hidden-config"), "mode=strict\n");
  writeFileSync(join(workflowDirectory, "untouched.yml"), "name: untouched\non: push\n");
  writeFileSync(join(nestedDirectory, "binary.dat"), Buffer.from([0, 1, 2, 127, 255]));
  writeFileSync(join(repository, "sentinel.sh"), "#!/bin/sh\necho unchanged\n");
  chmodSync(join(repository, "sentinel.sh"), 0o751);
  symlinkSync("fixtures/nested/binary.dat", join(repository, "sample-link"));
  const before = snapshotTree(repository);
  const result = spawnSync(binary, ["demo"], { encoding: "utf8", cwd: repository });
  expect(result.status).toBe(0);
  expect(result.stdout).toContain("Demo — bundled sample data");
  const reportPath = result.stdout.match(/Report: (.+)/)?.[1]?.trim();
  expect(reportPath).toBeTruthy();
  expect(readFileSync(reportPath, "utf8")).toContain("# Action Parity Probe report");
  expect(snapshotTree(repository)).toEqual(before);
  rmSync(join(reportPath, ".."), { recursive: true });
});

test("@claim:versioned-profiles ships four versioned runner profiles", () => {
  const result = run(["profiles", "--json"]);
  expect(result.status).toBe(0);
  const profiles = JSON.parse(result.stdout);
  expect(profiles.map((profile) => profile.id).sort()).toEqual([
    "act-nektos-ubuntu-22.04",
    "generic-linux-x64",
    "github-hosted-ubuntu-24.04",
    "self-hosted-linux-x64",
  ]);
  expect(profiles.every((profile) => /^\d{4}-\d{2}$/.test(profile.version))).toBe(true);
  for (const [alias, id] of Object.entries({ github: "github-hosted-ubuntu-24.04", "github-hosted": "github-hosted-ubuntu-24.04", act: "act-nektos-ubuntu-22.04", generic: "generic-linux-x64", "self-hosted": "self-hosted-linux-x64" })) {
    const result = run(["check", "examples/sample-repo", "--profile", alias, "--format", "json"]);
    expect(JSON.parse(result.stdout).profile.id, alias).toBe(id);
  }
});

test("@claim:browser-demo-entry opens the isolated sample in one mobile click", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "the claim measures the 390px first viewport");
  await page.goto("/");
  await page.getByRole("link", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\/?\?demo=1$/);
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  const result = page.getByRole("region", { name: "Sample compatibility result" });
  await expect(result).toContainText("NONPORTABLE");
  await expect(result).toContainText("Floating runner image can drift");
  const box = await result.boundingBox();
  expect(box.y + box.height).toBeLessThanOrEqual(844);
});

test("@claim:browser-cli-sample keeps the browser report equal to the real CLI sample", async ({ page }) => {
  const result = run(["check", "examples/sample-repo", "--profile", "act", "--format", "json"]);
  expect(result.status).toBe(1);
  const cli = JSON.parse(result.stdout);
  const browserFixture = JSON.parse(readFileSync("site/src/demo-report.json", "utf8"));
  expect(browserFixture.profile).toEqual(cli.profile);
  expect(browserFixture.summary).toEqual(cli.summary);
  expect(browserFixture.inventory).toEqual(cli.inventory);
  expect(browserFixture.findings).toEqual(cli.findings);
  await page.goto("/?demo=1");
  await expect(page.getByRole("region", { name: "Recorded sample report" })).toContainText(`${cli.summary.errors} errors`);
  await expect(page.getByRole("region", { name: "Recorded sample report" }).getByText(cli.findings[0].title)).toBeVisible();
});

test("@claim:terminal-recording shows the real CLI demo command and outcome", async ({ page }) => {
  const result = run(["demo"]);
  expect(result.status).toBe(0);
  const lines = result.stdout.trim().split("\n");
  const shownOutput = [
    "Target: ",
    "Result: ",
    "Scanned: ",
  ].map((prefix) => lines.find((line) => line.startsWith(prefix)));
  expect(shownOutput.every(Boolean)).toBe(true);
  const reportPath = lines.find((line) => line.startsWith("Report: "))?.slice("Report: ".length).trim();
  expect(reportPath).toBeTruthy();
  expect(reportPath.startsWith(tmpdir())).toBe(true);
  expect(readFileSync(reportPath, "utf8")).toContain("# Action Parity Probe report");

  const recording = readFileSync("site/public/assets/terminal-recording.svg", "utf8");
  expect(recording).toContain("$ action-parity-probe demo");
  for (const line of shownOutput) expect(recording).toContain(line);
  expect(recording).toContain("Report: /tmp/action-parity-probe-demo-…/parity-report.md");

  await page.goto("/");
  const image = page.getByRole("img", { name: "Terminal recording of Action Parity Probe checking the bundled sample workflow." });
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect(page.locator(".terminal-recording figcaption")).toContainText("action-parity-probe demo");
  rmSync(join(reportPath, ".."), { recursive: true });
});

test("@claim:demo-reset restores the report and visibly restarts its recording", async ({ page }) => {
  await page.goto("/?demo=1");
  const terminal = page.locator("[data-demo-terminal]");
  const body = terminal.locator(".terminal-body");
  await body.evaluate((element) => { element.scrollTop = element.scrollHeight; });
  expect(await body.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("Sample restored. Recording restarted.")).toBeVisible();
  expect(await body.evaluate((element) => element.scrollTop)).toBe(0);
  await expect(terminal).toHaveClass(/replay/);
  expect(await terminal.locator(".terminal-row").first().evaluate((element) => getComputedStyle(element).animationName)).toBe("reset-sign-on");
});

test("@claim:exit-codes returns the documented outcomes", () => {
  const portable = mkdtempSync(join(tmpdir(), "parity-portable-"));
  const workflowDir = join(portable, ".github", "workflows");
  mkdirSync(workflowDir, { recursive: true });
  writeFileSync(join(workflowDir, "portable.yml"), "name: portable\non: push\njobs:\n  test:\n    runs-on: ubuntu-24.04\n    steps:\n      - run: echo ready\n");
  expect(run(["check", portable, "--profile", "github", "--format", "json"]).status).toBe(0);
  expect(run(["check", "examples/sample-repo", "--profile", "generic", "--format", "json"]).status).toBe(1);
  expect(run(["check", join(portable, "missing")]).status).toBe(2);
});

test("@claim:probe-scope observes declared commands, shells, case behavior, and Docker without workflow execution", () => {
  const root = mkdtempSync(join(tmpdir(), "parity-probe-scope-"));
  const workflowDir = join(root, ".github", "workflows");
  const marker = join(root, "executed-marker");
  mkdirSync(workflowDir, { recursive: true });
  writeFileSync(join(workflowDir, "scope.yml"), `name: probe scope\non: push\njobs:\n  test:\n    runs-on: ubuntu-24.04\n    steps:\n      - shell: bash\n        run: docker --version; touch ${marker}\n`);
  const result = spawnSync(binary, ["check", root, "--profile", "github", "--format", "json", "--probe", "--sandbox"], { encoding: "utf8", env: { ...process.env, PATH: "" } });
  const report = JSON.parse(result.stdout);
  const probes = report.observations.map((item) => item.probe);
  expect(probes).toEqual(expect.arrayContaining(["command:bash", "command:docker", "filesystem:case-sensitive", "docker:socket"]));
  expect(existsSync(marker)).toBe(false);
});

test("@claim:rule-coverage reports every documented static rule category", () => {
  const report = JSON.parse(run(["check", "examples/sample-repo", "--profile", "generic", "--format", "json"]).stdout);
  const ids = new Set(report.findings.map((finding) => finding.rule_id));
  expect([...ids]).toEqual(expect.arrayContaining(["APP001", "APP003", "APP010", "APP011", "APP012", "APP020", "APP030", "APP040", "APP041", "APP050", "APP051", "APP060"]));
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
