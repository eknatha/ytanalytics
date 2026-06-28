# ytanalytics

**The premium YouTube growth studio that never sees your data.**

A fast, offline-first YouTube analytics and channel-auditing tool — title scoring, thumbnail grading, retention diagnostics and niche-calibrated benchmarks for cloud/DevOps creators. Everything runs in your browser. Nothing is uploaded.

Live at **[ytanalytics.eknathalabs.com](https://ytanalytics.eknathalabs.com)**

---

## Why it's different

Tools like vidIQ, TubeBuddy and Social Blade are powerful because of data they hold on *their* servers — live API quota, scraped channel histories, aggregated search corpora. ytanalytics takes the opposite bet: it's private, niche-tuned, and free. Your advantages are the ones the incumbents structurally can't claim.

| Capability | vidIQ / TubeBuddy | ytanalytics |
|---|---|---|
| Niche-calibrated title scoring | global averages | **DevOps-tuned** |
| Thumbnail auto-grade | partial / editor only | **on-canvas, local** |
| Deep retention diagnostics | partial | **full** |
| Your data stays in your browser | no | **always** |
| No account / no extension | no | **yes** |
| Historical scrape of any channel | yes | not offline (by design) |
| Price | $24/mo | **free** |

We're upfront about what we *don't* do: no historical time-series of arbitrary channels and no invented "search-volume" numbers. Those need a server-side database we don't run. We'd rather show fewer numbers you can trust.

---

## Features

**Optimize (pre-publish, no data needed)**
- **Title analyzer** — 0–100 score with written reasoning on length, power words, specificity, front-loading and curiosity.
- **Thumbnail auditor** — contrast, detail density and mobile readability graded on a canvas. Nothing leaves the page.
- **Hook builder** — scaffolds the first 15 seconds to beat the 0:18 retention cliff.

**Channel Optimization (no data)**
- A scored 12-point checklist of channel fundamentals (branding, cadence, playlists, SEO hygiene, end screens…). Progress saved locally with a live completion score.

**Money Calculator (no data)**
- Estimates ad revenue from monthly views, niche RPM, audience geography and monetized-view share. Shows low/likely/high monthly and yearly ranges plus effective RPM. RPM figures are realistic post-cut values.

**Research (no key)**
- **Tag generator** — niche co-occurrence (k8s → kubectl, helm…) plus proven modifiers.
- **Title idea spinner** — high-scoring templates, auto-graded.

**Top Creators / By Niche (no key)**
- Most-subscribed channels worldwide and category leaders, with a strong cloud/DevOps list. Bundled offline snapshot with a visible "as of" date — not a live feed.

**Audit by CSV (bring your own Studio export)**
- Niche-benchmarked CTR, retention and average view duration; velocity-decay tagging; hidden-gem detection. The only way to get real CTR/retention, because the owner exports it.

**Audit by URL (needs your API key)**
- Paste any channel URL, @handle or ID → real public data: subscribers, recent video performance, upload cadence, and title scoring on actual titles. CTR/retention are deliberately absent here — they're private and no public method exposes them.

**Compare (optional live mode)**
- Public channel lookup via the YouTube Data API. Requires *your own* key (stored locally, your quota). Off by default — no key is ever bundled.

---

## Architecture

Offline-first, zero-dependency, vanilla HTML/CSS/JS. No frameworks, no build step required to run — the shipped `dist/index.html` is a single self-contained file with PapaParse and Chart.js inlined.

```
ytanalytics/
├── src/
│   ├── index.html          # markup + styles, references local scripts
│   ├── ytanalytics.js      # all app logic (engines, router, views)
│   └── vendor/
│       ├── papaparse.min.js
│       └── chart.min.js
├── build.py                # inlines src/ → dist/index.html
├── dist/
│   └── index.html          # deployed artifact (single file)
├── .nojekyll
├── CNAME
└── README.md
```

### Build

```bash
python3 build.py
```

Inlines every local script into `dist/index.html` and copies `.nojekyll` / `CNAME`. The result has no external dependencies and works offline.

### Develop

Edit files in `src/`. Open `src/index.html` directly in a browser to test — it loads `ytanalytics.js` and the vendored libraries from disk. Re-run `build.py` before deploying.

---

## Deploy (GitHub Pages)

GitHub Pages serves the repo root, so the deploy target is `dist/index.html` published to the Pages branch. Options:

- **Simplest:** copy `dist/index.html`, `.nojekyll` and `CNAME` to the repo root on the `main` branch and point Pages at `/ (root)`.
- **Cleaner:** publish the `dist/` folder via a Pages action, or set Pages to serve from `/docs` and build into `docs/`.

DNS: a `CNAME` record `ytanalytics` → `eknatha.github.io`, with the custom domain set to `ytanalytics.eknathalabs.com` and HTTPS enforced.

---

## Privacy

There is no backend. CSV files are parsed with PapaParse in your browser; thumbnails are graded on an in-memory canvas. Nothing is sent to any server. Closing the tab clears everything except an API key you explicitly choose to save in local storage.

---

## Notes & honest limitations

- **Retention** uses the average-percentage-viewed figure from the Studio export, not a per-second curve — second-by-second retention isn't in the standard table export.
- **Niche benchmarks** are reasoned DevOps estimates, worth calibrating against your own channel over time.
- **Compare** genuinely cannot work without a key; embedding one would expose it and burn its quota.

---

Built in public under **EknathaLabs™** · [github.com/eknatha](https://github.com/eknatha)

MIT License — see [LICENSE](LICENSE).
