import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

for (const route of ["/", "/demo", "/privacy", "/terms", "/missing-route"]) {
  test(`route ${route} has one h1 and no serious accessibility issues`, async ({ page }) => {
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("[style]")).toHaveCount(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("history navigation restores the page and focuses its heading", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Try it with sample data" }).click();
  await expect(page).toHaveURL(/\/?\?demo=1$/);
  await expect(page.locator("h1")).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toBeFocused();
});

test("back navigation restores the saved scroll position", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  await page.evaluate(() => document.querySelector('a[href="/demo"]').click());
  await expect(page).toHaveURL(/\/demo$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
});

test("mobile first screen keeps the main action visible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const action = page.getByRole("link", { name: "Try it with sample data" });
  await expect(action).toBeVisible();
  const box = await action.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("mobile navigation and footer links meet the 44px touch-target minimum", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  for (const name of ["Demo", "Privacy", "Terms", "Source"]) {
    const box = await page.getByRole("link", { name: new RegExp(`^${name}`) }).last().boundingBox();
    expect(box, `${name} has a measurable target`).not.toBeNull();
    expect(box.width, `${name} is at least 44px wide`).toBeGreaterThanOrEqual(44);
    expect(box.height, `${name} is at least 44px tall`).toBeGreaterThanOrEqual(44);
  }
});

test("static host configuration returns a styled 404 for unknown paths", () => {
  const config = JSON.parse(readFileSync("site/public/staticwebapp.config.json", "utf8"));
  expect(config.navigationFallback).toBeUndefined();
  expect(config.routes.filter((route) => ["/demo", "/privacy", "/terms"].includes(route.route)).map((route) => route.rewrite)).toEqual(["/index.html", "/index.html", "/index.html"]);
  expect(config.responseOverrides?.["404"]).toEqual({ rewrite: "/404.html", statusCode: 404 });
  const document = readFileSync("site/public/404.html", "utf8");
  expect(document).toContain("<main id=\"main\"");
  expect(document).toContain("This runner label does not exist");
  expect(document).toContain('rel="canonical"');
  expect(document).toContain('property="og:title"');
  expect(document).toContain('name="twitter:card"');
  expect(document).toContain('rel="apple-touch-icon"');
  expect(document).toContain('href="/#install"');
});
