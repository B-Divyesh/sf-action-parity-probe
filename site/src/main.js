import "./styles.css";
import report from "./demo-report.json";

const app = document.querySelector("#app");
const status = document.querySelector("#route-status");

const routeInfo = {
  "/": {
    title: "Action Parity Probe — check runner differences",
    description: "Check GitHub Actions workflow requirements against versioned runner profiles before moving CI.",
  },
  "/demo": {
    title: "Demo — Action Parity Probe",
    description: "Read a real compatibility report for the bundled sample workflow.",
  },
  "/privacy": {
    title: "Privacy — Action Parity Probe",
    description: "See what the Action Parity Probe site and CLI store and send.",
  },
  "/terms": {
    title: "Terms — Action Parity Probe",
    description: "Read the terms for using Action Parity Probe.",
  },
};

function gateMark() {
  return `<svg class="gate-mark" viewBox="0 0 36 36" aria-hidden="true"><path d="M5 6h26v24H5z"/><path d="M11 12h6v6h-6zm8 8h6v6h-6z"/><path d="m21 11 5 5m0-5-5 5"/></svg>`;
}

function header() {
  return `<header class="site-header">
    <a class="wordmark route-link" href="/" aria-label="Action Parity Probe home">${gateMark()}<span>Action Parity Probe</span></a>
    <nav aria-label="Main navigation">
      <a class="route-link" href="/demo">Demo</a>
      <a class="route-link" href="/#install">Install</a>
      <a class="route-link" href="/privacy">Privacy</a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <p>Check workflow differences before changing CI runners.</p>
    <div class="footer-links">
      <a class="route-link" href="/privacy">Privacy</a>
      <a class="route-link" href="/terms">Terms</a>
      <a href="https://github.com/B-Divyesh/sf-action-parity-probe">Source <span class="sr-only">(external)</span></a>
    </div>
    <p>Built by Param Factory · v0.1.0</p>
  </footer>`;
}

function factList() {
  return `<ul class="facts" aria-label="Product facts">
    <li><span aria-hidden="true">×</span> No workflow steps run</li>
    <li><span aria-hidden="true">⌁</span> No accounts or telemetry</li>
    <li><span aria-hidden="true">$</span> Free and open source</li>
  </ul>`;
}

function reportRows(limit = 4) {
  return report.findings.slice(0, limit).map((finding) => `
    <li class="terminal-row ${finding.severity}">
      <span class="row-mark" aria-hidden="true">${finding.severity === "error" ? "×" : "!"}</span>
      <span><b>${escapeText(finding.rule_id)} · ${escapeText(finding.title)}</b><small>${escapeText(finding.evidence)} · ${escapeText(finding.source)}</small></span>
    </li>`).join("");
}

function terminalPreview(full = false) {
  const limit = full ? report.findings.length : 4;
  return `<section class="terminal-shell ${full ? "terminal-full" : ""}" aria-label="Recorded sample report">
    <div class="terminal-top"><span></span><span></span><span></span><p>sample-repo / release.yml</p></div>
    <div class="terminal-body"${full ? ' tabindex="0" aria-label="Scrollable sample report"' : ""}>
      <p class="command"><span>$</span> action-parity-probe check . --profile act</p>
      <p class="target">TARGET&nbsp; ${escapeText(report.profile.id)}@${escapeText(report.profile.version)}</p>
      <div class="result-line"><strong>NONPORTABLE</strong><span>${report.summary.errors} errors</span><span>${report.summary.warnings} warnings</span></div>
      <ol class="terminal-list">${reportRows(limit)}</ol>
      ${!full ? `<a class="terminal-more route-link" href="/demo">Read all ${report.findings.length} findings →</a>` : ""}
    </div>
  </section>`;
}

function homePage() {
  return `<main id="main" tabindex="-1">
    <section class="hero wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> Runner migration check</p>
        <h1>Check workflow differences before changing CI runners</h1>
        <p class="lede">For platform teams comparing local or alternate runners before an outage forces the move.</p>
        <div class="hero-action">
          <a class="button primary route-link" href="/demo">Try it with sample data</a>
          <span>See a real report in one click.</span>
        </div>
        ${factList()}
      </div>
      <figure class="hero-art">
        <img src="/assets/hero-market.webp" width="1440" height="960" alt="Runner racks line a night market under connected parity signs." fetchpriority="high" />
        <figcaption><span>01</span> Every bright sign is a declared requirement.</figcaption>
      </figure>
    </section>

    <section class="preview-section wrap" aria-labelledby="preview-title">
      <div class="section-label"><span>LIVE / 02</span></div>
      <div class="section-intro">
        <h2 id="preview-title">See the mismatch before the migration</h2>
        <p>This recorded output comes from the bundled workflow and the real CLI.</p>
      </div>
      ${terminalPreview()}
    </section>

    <section class="process wrap" aria-labelledby="process-title">
      <div class="section-label"><span>ROUTE / 03</span></div>
      <h2 id="process-title">How the check works</h2>
      <ol class="process-list">
        <li><b>01</b><div><h3>Point at a repository</h3><p>The CLI reads YAML files under <code>.github/workflows</code>.</p></div></li>
        <li><b>02</b><div><h3>Choose a runner profile</h3><p>Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux.</p></div></li>
        <li><b>03</b><div><h3>Carry the report</h3><p>Share terminal, JSON, Markdown, or SARIF output with your migration review.</p></div></li>
      </ol>
    </section>

    <section id="install" class="install wrap" aria-labelledby="install-title">
      <div>
        <p class="eyebrow"><span></span> Start for real</p>
        <h2 id="install-title">Run the check on your repository</h2>
        <p>Build the single Rust binary. Then choose a versioned target profile.</p>
      </div>
      <div class="install-command">
        <code>cargo install --git https://github.com/B-Divyesh/sf-action-parity-probe</code>
        <button class="copy-button" type="button" data-copy="cargo install --git https://github.com/B-Divyesh/sf-action-parity-probe">Copy install command</button>
      </div>
      <pre tabindex="0" aria-label="Example commands"><code>action-parity-probe check . --profile act
action-parity-probe check . --profile self-hosted --probe --sandbox</code></pre>
    </section>

    <section class="limits wrap" aria-labelledby="limits-title">
      <div class="section-label"><span>BOUNDARY / 04</span></div>
      <div>
        <h2 id="limits-title">A readiness report, not another runner</h2>
        <p>It does not execute actions, translate YAML, or promise a passing build.</p>
        <p>Static findings show declared risks. Observed findings show local probe failures.</p>
        <a class="text-link route-link" href="/privacy">Read the privacy boundary →</a>
      </div>
    </section>
  </main>`;
}

function demoPage() {
  const actions = report.inventory.actions.map((item) => `<li><code>${escapeText(item.value)}</code></li>`).join("");
  const images = [...report.inventory.job_images, ...report.inventory.service_images].map((item) => `<li><code>${escapeText(item.value)}</code></li>`).join("");
  return `<div class="demo-banner" role="status"><span>Demo — sample data, nothing is saved</span><div><button type="button" data-reset-demo>Reset demo</button><a class="route-link" href="/#install">Start for real</a></div></div>
  <main id="main" tabindex="-1" class="demo-main wrap">
    <section class="demo-heading">
      <p class="eyebrow"><span></span> Isolated sample</p>
      <h1>See the sample workflow differences</h1>
      <p class="lede">A release workflow meets the act runner profile before your repository does.</p>
    </section>
    <div class="sample-strip" aria-label="Sample inventory">
      <div><b>${report.inventory.workflow_files.length}</b><span>workflow</span></div>
      <div><b>${report.inventory.actions.length}</b><span>actions</span></div>
      <div><b>${report.inventory.service_images.length + report.inventory.job_images.length}</b><span>images</span></div>
      <div><b>${report.summary.requirements}</b><span>requirements</span></div>
    </div>
    ${terminalPreview(true)}
    <section class="demo-source" aria-labelledby="sample-title">
      <div><p class="section-label"><span>INPUT / SAMPLE</span></p><h2 id="sample-title">What the sample declares</h2></div>
      <div><h3>Actions</h3><ul>${actions}</ul></div>
      <div><h3>Images</h3><ul>${images}</ul></div>
    </section>
    <section class="demo-command" aria-labelledby="demo-command-title">
      <h2 id="demo-command-title">Run this demo in your terminal</h2>
      <pre tabindex="0" aria-label="Demo command"><code>action-parity-probe demo</code></pre>
      <p>The CLI creates a temporary sample and prints the Markdown report path.</p>
    </section>
  </main>`;
}

function privacyPage() {
  return legalPage(
    "Privacy — Action Parity Probe",
    "See what this product stores",
    `<h2>The CLI stays local</h2><p>The CLI reads the workflow paths you provide. It does not include telemetry or network client code.</p>
     <h2>The site collects nothing</h2><p>This site has no analytics, accounts, cookies, forms, or third-party runtime requests.</p>
     <h2>The demo is separate</h2><p>The browser demo reads bundled sample data. Its reset action only restarts the on-page recording.</p>
     <h2>Questions</h2><p>Review or report privacy issues in the <a href="https://github.com/B-Divyesh/sf-action-parity-probe/issues">public issue tracker <span class="sr-only">(external)</span></a>.</p>`,
  );
}

function termsPage() {
  return legalPage(
    "Terms — Action Parity Probe",
    "Use the report as migration evidence",
    `<h2>License</h2><p>The software is provided under the MIT License.</p>
     <h2>No build guarantee</h2><p>The report finds known differences in declared requirements. A portable result does not guarantee a passing workflow.</p>
     <h2>Your responsibility</h2><p>Review findings before changing production CI. Keep secrets out of workflow fixtures and shared reports.</p>
     <h2>Changes</h2><p>Profile versions make rule updates visible. This page was last updated on 28 August 2026.</p>`,
  );
}

function legalPage(label, headline, body) {
  return `<main id="main" tabindex="-1" class="legal wrap"><p class="eyebrow"><span></span>${label}</p><h1>${headline}</h1><div class="legal-copy">${body}</div></main>`;
}

function notFoundPage() {
  return `<main id="main" tabindex="-1" class="not-found wrap">
    <div class="broken-cable" aria-hidden="true"><span></span><i>404</i><span></span></div>
    <p class="eyebrow"><span></span> Route disconnected</p>
    <h1>This runner label does not exist</h1>
    <p>Check the address or return to the main parity check.</p>
    <a class="button primary route-link" href="/">Return home</a>
  </main>`;
}

function render({ focus = true, scrollY = 0 } = {}) {
  const path = normalisePath(location.pathname);
  const page = path === "/" ? homePage() : path === "/demo" ? demoPage() : path === "/privacy" ? privacyPage() : path === "/terms" ? termsPage() : notFoundPage();
  const info = routeInfo[path] || { title: "Not found — Action Parity Probe", description: "Return to Action Parity Probe." };
  document.title = info.title;
  document.querySelector('meta[name="description"]').setAttribute("content", info.description);
  const canonical = `https://action-parity-probe.sociobot.in${path === "/" ? "/" : path}`;
  document.querySelector('link[rel="canonical"]').setAttribute("href", canonical);
  document.querySelector('meta[property="og:title"]').setAttribute("content", info.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", info.description);
  document.querySelector('meta[property="og:url"]').setAttribute("content", canonical);
  document.querySelector('meta[name="twitter:title"]').setAttribute("content", info.title);
  document.querySelector('meta[name="twitter:description"]').setAttribute("content", info.description);
  app.innerHTML = `${header()}${page}${footer()}`;
  bindInteractions();
  const heading = document.querySelector("h1");
  heading?.setAttribute("tabindex", "-1");
  if (focus) {
    requestAnimationFrame(() => {
      heading?.focus({ preventScroll: true });
      window.scrollTo({ top: scrollY, behavior: "instant" });
    });
  }
  status.textContent = info.title;
}

function bindInteractions() {
  document.querySelectorAll(".route-link").forEach((link) => link.addEventListener("click", navigate));
  document.querySelector("[data-reset-demo]")?.addEventListener("click", () => {
    document.querySelector(".terminal-shell")?.classList.remove("replay");
    requestAnimationFrame(() => document.querySelector(".terminal-shell")?.classList.add("replay"));
    status.textContent = "Demo reset. Sample data is unchanged.";
  });
  document.querySelector("[data-copy]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "Install command copied";
    } catch {
      button.textContent = "Copy failed — select the command";
    }
  });
}

function navigate(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(event.currentTarget.href);
  if (url.origin !== location.origin) return;
  event.preventDefault();
  history.replaceState({ ...history.state, scrollY: window.scrollY }, "");
  history.pushState({ scrollY: 0 }, "", `${url.pathname}${url.hash}`);
  render();
  if (url.hash) requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
}

function normalisePath(path) {
  if (path.length > 1) return path.replace(/\/$/, "");
  return path;
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

window.addEventListener("popstate", (event) => render({ scrollY: event.state?.scrollY ?? 0 }));
history.scrollRestoration = "manual";
history.replaceState({ ...history.state, scrollY: window.scrollY }, "");
render({ focus: false });
