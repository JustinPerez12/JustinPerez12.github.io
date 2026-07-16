# justindavidperez.com

My personal site — a single-page portfolio built with React and Vite, deployed to GitHub Pages.

It also generates my résumé. Both read from the same data, so they can't disagree with each other.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Port 5173, not 3000 — 3000 is taken by another project on my machine, and `strictPort` is on so a
collision fails loudly instead of silently serving something else.

## Scripts

| Command              | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                         |
| `npm run build`      | Production build into `dist/`                      |
| `npm run preview`    | Serve the built output locally                     |
| `npm test`           | Run the test suite once (Vitest)                   |
| `npm run test:watch` | Tests in watch mode                                |
| `npm run lint`       | ESLint                                             |
| `npm run resume`     | Regenerate the résumé PDF from `src/data/`         |
| `npm run deploy`     | Build and publish `dist/` to the `gh-pages` branch |

## Updating content

Content lives in `src/data/`, not in the components:

- `site.js` — name, tagline, intro, email, social links, nav, résumé summary
- `experience.js` — jobs, most recent first (`end: null` means current)
- `projects.js` — featured work
- `skills.js` — grouped tech
- `education.js` — résumé only

The components map over these, so adding a job or project is a data edit, not a markup edit. The
tests import the same modules and assert every entry renders, so new content extends coverage
automatically.

Two rules worth keeping:

- **Employment goes in `experience.js`; side projects go in `projects.js`.** Listing a side project
  as a job reads as employment that didn't happen.
- **`highlights` are ordered strongest-first.** The résumé takes from the top (see below), so
  reordering the array reorders the résumé.

## The résumé

`src/Assets/Justin_Perez_Resume.pdf` is **generated, not hand-edited** — `npm run resume` renders it
from the same `src/data/` files the site uses. A hand edit is lost on the next run. Edit the data,
run the script, commit the PDF.

It targets senior roles, so it's worded for ownership and scope rather than tasks, and it opens with
the positioning line in `site.resumeSummary`.

**It has to stay one page.** The script parses the PDF it just wrote and **exits 1** if it spilled,
so a too-long bullet fails loudly instead of quietly becoming a two-pager. There's only a few pixels
of headroom. If it spills, ration space in `scripts/resume-template.js`:

- `BULLET_LIMIT` — bullets per company (NICE 6, Cox 4). The site still renders all of them.
- `OMIT_ROLES` — roles left off entirely (the 2022 internship). Still on the site.
- `CONDENSED_PROJECTS` — projects reduced to a heading (the capstone).

Site prose and résumé prose differ where they must: projects carry a `resumeBlurb` (tight, for
print) next to `summary`/`detail` (discursive, for the site). They sit next to each other in
`projects.js` so they move together.

Rendering uses `puppeteer-core` against the installed Chrome rather than `puppeteer`, which would
drag a ~130MB browser into the repo. Set `CHROME_PATH` if Chrome isn't at a standard location.

## Deploying

```bash
npm run deploy
```

Builds and force-pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves at
justindavidperez.com. The custom domain comes from `public/CNAME`, which Vite copies into `dist/` on
every build — don't move it out of `public/` or the domain resets on the next deploy.

`main` is the working branch. `gh-pages` is generated output — never edit it by hand.

## Notes

- `public/og-image.png` is the link-preview card (1200×630). It's a static image that duplicates the
  hero copy, so if the tagline or employer changes it needs regenerating to match.
- Unused images still sit in `src/Assets/`. Vite only bundles what's imported, so they cost nothing
  at build time — but don't assume a file there is live.
