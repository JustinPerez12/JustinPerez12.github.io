# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Justin Perez's personal portfolio — a single-page React app built with Vite, deployed to GitHub Pages at https://justindavidperez.com/ (custom domain via `public/CNAME`).

## Commands

```bash
npm run dev                        # dev server on http://localhost:3000
npm run build                      # production build into dist/
npm run preview                    # serve the built output
npm test                           # Vitest, single run
npm run test:watch                 # Vitest watch mode
npx vitest run src/App.test.jsx    # a single test file
npm run lint                       # ESLint 9 (flat config in eslint.config.js)
npm run resume                     # regenerate the résumé PDF from src/data/
npm run deploy                     # build + publish dist/ to the gh-pages branch
```

## Architecture

`src/index.jsx` mounts `<App/>`, which renders one scrolling page — no router:

```
Nav → Hero → About → Experience → Work → Skills → Contact → Footer
```

Navigation is anchor-based. `src/data/site.js` exports `navLinks`, whose `id`s must match the `id` on each section's root element. Adding a section means: build the component, give its section an `id`, render it in `App.jsx`, and add an entry to `navLinks`.

### Content lives in data, not JSX

This is the load-bearing convention. `src/data/` holds all copy:

- `site.js` — identity, tagline, email, socials, nav
- `experience.js` — jobs, most recent first; `end: null` marks the current role and drives the "Current" badge and the accent timeline dot
- `projects.js` — featured work
- `skills.js` — grouped tech
- `education.js` — résumé only; the site has no education section

Components map over these. **Edit the data, not the markup** — and note the tests import the same modules and assert every entry renders, so adding a job or project extends test coverage automatically.

This data also feeds the **generated résumé** (see below), so a change here can silently push the PDF to two pages. Run `npm run resume` after editing content.

### The résumé is generated

`src/Assets/Justin_Perez_Resume.pdf` is built by `npm run resume` (`scripts/build-resume.mjs` + `resume-template.js`) from the same `src/data/` modules. It is **not hand-edited** — a hand edit gets overwritten on the next run. This exists because the site, the résumé, and LinkedIn had all drifted into three different versions of the same career; one source is the fix.

- **One page is a hard constraint** with ~17px of headroom. The script parses the PDF it just wrote via `pdf-lib` and exits 1 if `pages > 1`. Don't replace that with a `scrollHeight` estimate — an earlier version did exactly that and confidently reported one page while the real PDF was two. Screen layout is not print layout; measure the artifact.
- Space is rationed in `resume-template.js`: `BULLET_LIMIT` (per company; Wavetronix is deliberately `0`) and `CONDENSED_PROJECTS` (Huddle Up gets a title line only). The reasoning is that the oldest entries are now the weakest — full depth lives on the site.
- Projects carry **`resumeBlurb`** (tight, print) next to `summary`/`detail` (discursive, site). Deliberate divergence, co-located so they move together.
- **Margins are owned by `page.pdf()` in build-resume.mjs, not CSS `@page`.** Setting both makes them fight and silently adds a page.
- The CSS lives inside a JS template literal — **a backtick in a CSS comment terminates the string**. Been there.
- Rendering uses `puppeteer-core` + system Chrome (via `CHROME_PATH` or standard install paths) to avoid a ~130MB browser download in a portfolio repo.
- There is deliberately **no "Updated <date>" footer** — it broadcasts staleness as soon as the PDF ages.

Deliberate content decisions worth preserving: no self-assessed skill levels ("Proficient"/"Novice" were removed on purpose), no public phone number, no university email. `App.test.jsx` guards all three against regression.

### Styling

Plain CSS, no framework. One folder per component under `src/components/<name>/` with a co-located `<Name>.css` the component imports.

`src/index.css` is the design system and the only place tokens are defined:

- **Theming**: dark is the `:root` default. A light OS preference flips it via `@media (prefers-color-scheme: light)` scoped to `:root:not([data-theme='dark'])`; an explicit `[data-theme]` (set by `useTheme`, persisted to `localStorage` under `jp:theme`) always wins. Any new color must be a token defined in **all three** blocks or it will break one theme.
- **Type**: fluid scale via `clamp()` (`--text-sm` … `--text-hero`) — headings need no media queries.
- **Spacing/radius/layout**: `--space-*`, `--radius*`, `--content-width`, `--prose-width`.
- Shared classes: `.container`, `.section`, `.section__label|title|intro|header`, `.btn`/`.btn--primary`/`.btn--ghost`, `.tag`, `.link-arrow`, `.visually-hidden`, `.skip-link`, `.reveal`.

Breakpoints in use: 900px (About), 768px (Nav/Work/Skills), 640px (global). Reuse them rather than inventing new ones. `prefers-reduced-motion` is handled globally in `index.css`.

### Hooks

- `useScrollSpy(ids)` — IntersectionObserver-driven active section. Pass a **module-scope** array (see `NAV_IDS` in `Nav.jsx`); an inline `.map()` creates a new identity each render and thrashes the observer.
- `useTheme()` — returns `{ theme, toggleTheme }`. Follows the OS only until the visitor picks a side.

## Deploy

`npm run deploy` runs `vite build` then `gh-pages -d dist`. `public/CNAME` is copied into `dist/` automatically by Vite — if it leaves `public/`, the custom domain resets on the next deploy.

## Gotchas

- **`main` is not the real branch.** `origin/HEAD` points at `main`, which contains only a README (an abandoned "restarting" commit). The site's history lives on `master`. Confirm the base branch before opening a PR.
- **Node 22.11 is below Vite 7's 22.12 floor**, which is why Vite is pinned to 6. Upgrading Vite means upgrading Node first.
- `public/og-image.png` (1200×630) is generated, not hand-drawn — it duplicates the hero copy. If the tagline or employer changes, regenerate it or it silently goes stale in link previews.
- Unused images still sit in `src/Assets/`. Vite only bundles what's imported, so they cost nothing at build time — but don't assume a file there is live.
