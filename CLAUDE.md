# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AppFinanceiro (repo name; formerly "Quick-Finance") — a personal-finance PWA. The entire app is a single file, `financas.html` (~10k lines), with no build step and no `npm`/`package.json`. `quick.html` is the older, now-frozen predecessor kept only for reference/import compatibility — don't add features to it.

Live at https://gabriel98pt-art.github.io/AppFinanceiro/financas.html (GitHub Pages).

## Commands

There's no build/test/lint tooling — validation is syntax-only, mirroring `.github/workflows/ci.yml`:

```bash
node .github/scripts/check-inline-js.js financas.html   # parses every inline <script> block (vm.Script, never executes)
node --check sw.js
node -e "JSON.parse(require('fs').readFileSync('manifest.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('database.rules.json','utf8'))"
```

Run the inline-JS check after editing `financas.html` — a syntax error there only surfaces in the end user's browser in production, since there's no other CI gate. (A PostToolUse hook in `.claude/settings.json` runs this automatically after Edit/Write on `financas.html`.)

There's no local dev server requirement — open `financas.html` directly via `file://` or serve statically; the app talks to Firebase directly from the client.

## Architecture

**Single-file structure**: `financas.html` has 3 inline `<script>` blocks (main app starts ~line 1336, TVDE module starts ~line 9041) plus CDN `<script src>` tags for Chart.js and the Firebase compat SDKs (`firebase-app-compat.js`, `firebase-database-compat.js`, `firebase-auth-compat.js` — v9.23.0, not modular SDK).

**State**: a single global `S` object (`loadState()`/`saveState()` around line 1955-1985), seeded from `DEFAULTS` (line 1784) and persisted to `localStorage` + synced to Firebase Realtime Database. `S.cfg` holds per-account settings (currency, TVDE visibility, etc).

**Multi-tenant sync**: `_FB_PATH` (line 1351) is computed in `onAuthStateChanged` — the owner account (`_FB_OWNER_UID`, hardcoded uid) uses the legacy path `fin_v4`; every other authenticated uid gets `users/<uid>/fin_v4`. `database.rules.json` has one generic rule per shape, so new accounts need no rule changes. Guest sign-up (`_fbSignupSubmit`, line 1521) is intentionally open, gated only by a hardcoded, non-secret invite code (`_FB_INVITE_CODE`) — a deterrent, not real access control.

**Deploying `database.rules.json` is manual**: copy/paste into Firebase Console → Realtime Database → Rules → Publish. There's no `firebase.json`/CLI wired to this directory, so `firebase deploy` doesn't apply here as-is.

**Currency**: `S.cfg.currency` (EUR/BRL/USD/GBP) drives `curSym()`/`fmt()` (the central money formatter, used ~118x). A handful of static labels outside the templated JS are patched separately by `_applyCurrencyLabels()` (line 1398), called at the same points as `_fbApplyTvdeVisibility()` (line 1389): boot, login, tab switch, settings save.

**TVDE module** (IIFE starting ~line 9041, fused from the standalone "Controle Motorista" app in 07/2026): self-contained, data lives in `S.tvde` (weeks/seg/desp/lanc + cfg), CSS scoped under `#p-tvde`/`.tvd-dlg`. Formulas in the header comment are pinned from the original spreadsheet — **do not change them without explicit user validation**. This module is opt-in per account (`S.cfg.showTvde`, toggle in Settings → Dados) and still uses fixed `Intl.NumberFormat` EUR formatters (`fEUR`/`fEUR0`), i.e. it does **not** follow the app-wide currency setting.

**Service worker** (`sw.js`): network-first caching with a versioned cache name (`CACHE = 'qf-vN'`) — bump the version on any change to force clients to pick up new files; `NO_CACHE` lists paths (currently `quick.html`) that always bypass the cache.

**Tabs/UI**: `sw(id, btn)` (line 2797, not to be confused with `sw.js`) switches the visible panel. `makeChart(id, type, labels, datasets, opts)` (line 2846) wraps Chart.js setup — pass `interaction:{mode:'index',intersect:false}` for tooltips that work across the full bar, not just its tip.

## Notes for edits

- Prefer editing directly over adding abstractions — this codebase is deliberately dependency-free and single-file; don't introduce a build step or split it into modules unless explicitly asked.
- `MELHORIAS.md`, `DEPLOYMENT_REPORT.md`, and `RELATORIO_FUSAO_TVDE.md` are gitignored, local-only working notes — not part of the shipped app.
