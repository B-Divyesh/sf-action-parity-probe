# Demo contract

## Entry points

- Browser: `https://action-parity-probe.sociobot.in/demo`
- CLI: `action-parity-probe demo`
- Local site: `npm run dev`, then open `http://localhost:4173/demo`

The sample is a release workflow with CodeQL, OIDC, a job image, PostgreSQL,
PowerShell, GitHub CLI, Docker, GitHub-hosted paths, and a macOS job. It lives
under `examples/sample-repo/`.

The browser report is generated from the real Rust binary during every site
build. The browser demo is read-only and uses no storage namespace because it
stores no state. **Reset demo** only restarts the terminal row animation.

The CLI demo copies the sample into a fresh operating-system temporary
directory, runs safe host probes, and leaves a Markdown report there. It never
reads or writes the current repository. Re-run the command for a fresh demo;
remove the printed temporary directory to discard its output.
