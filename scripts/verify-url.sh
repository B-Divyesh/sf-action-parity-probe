#!/usr/bin/env bash
set -euo pipefail

url="${1:-http://127.0.0.1:4173/}"

node --input-type=module - "$url" <<'NODE'
import { chromium } from "playwright";

const url = process.argv[2];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
await page.goto(url, { waitUntil: "networkidle" });
const result = await page.evaluate(() => ({
  title: document.title,
  lang: document.documentElement.lang,
  mains: document.querySelectorAll("main").length,
  h1s: document.querySelectorAll("h1").length,
  missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length,
}));
await browser.close();
if (!result.title || !result.lang || result.mains !== 1 || result.h1s !== 1 || result.missingAlt || errors.length) {
  console.error(JSON.stringify({ url, ...result, errors }, null, 2));
  process.exit(1);
}
console.log(`URL check passed: ${url}`);
NODE
