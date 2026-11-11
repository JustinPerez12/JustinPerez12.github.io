import { experience } from '../src/data/experience.js'
import { projects } from '../src/data/projects.js'
import { skills } from '../src/data/skills.js'
import { education } from '../src/data/education.js'
import { site } from '../src/data/site.js'

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const RESUME_TITLE = 'Full Stack Software Engineer'

/**
 * The résumé is a one-pager targeting senior roles, so space goes to scope and
 * ownership. `highlights` are ordered strongest-first in the data; the résumé
 * takes from the top while the site renders all of them.
 */
const BULLET_LIMIT = { NICE: 5, 'Cox Automotive': 3, Wavetronix: 2 }

/**
 * Roles omitted from the résumé entirely (they still appear on the site). Empty
 * by default — every role earns its place on the one-pager right now.
 */
const OMIT_ROLES = []

/**
 * Shown as a title line only on the résumé (full blurb still renders on the
 * site). The capstone and the side project yield their résumé blurbs so the
 * three paid roles keep their bullets on the one-pager.
 */
const CONDENSED_PROJECTS = ['Huddle Up', 'Campus Core']

/**
 * Optional per-job-application tailoring, applied ON TOP of the base data
 * without ever mutating src/data/ (so the site is never affected). The
 * canonical `npm run resume` passes nothing and renders the untouched default;
 * the tailoring skill passes an overlay to foreground what a given posting
 * cares about. Every field is optional.
 *
 *   {
 *     title,                                  // override the title line
 *     summary,                                // override the résumé summary (résumé-only anyway)
 *     omitRoles:  ['Company'],                // replaces the default omit set
 *     condensedProjects: ['Project'],         // replaces the default condensed set
 *     bulletLimit: { Company: n },            // merged over the defaults
 *     bullets:    { Company: ['...','...'] }, // REPLACES that company's bullets verbatim, in order
 *     projectOrder: ['Name', ...],            // reorder projects by name
 *     projectBlurbs: { Name: '...' },         // override a project's résumé blurb
 *     skills:     [{ group, items }, ...],    // replaces the skills section entirely
 *   }
 *
 * Reorder and select freely; when you rewrite a bullet keep it TRUE — tailoring
 * reweights real work, it never invents it.
 */
export function renderResume(overlay = {}) {
  const resumeTitle = overlay.title ?? RESUME_TITLE
  const resumeSummary = overlay.summary ?? site.resumeSummary
  const omitRoles = new Set(overlay.omitRoles ?? OMIT_ROLES)
  const condensedProjects = new Set(overlay.condensedProjects ?? CONDENSED_PROJECTS)
  const bulletLimit = { ...BULLET_LIMIT, ...(overlay.bulletLimit ?? {}) }

  const bulletsFor = (job) =>
    overlay.bullets?.[job.company] ??
    job.highlights.slice(0, bulletLimit[job.company] ?? job.highlights.length)

  const resumeProjects = (() => {
    const base = overlay.projectOrder
      ? overlay.projectOrder
          .map((name) => projects.find((p) => p.name === name))
          .filter(Boolean)
      : projects
    return overlay.projectBlurbs
      ? base.map((p) => ({ ...p, resumeBlurb: overlay.projectBlurbs[p.name] ?? p.resumeBlurb }))
      : base
  })()

  const resumeSkills = overlay.skills ?? skills

  return renderHtml({ resumeTitle, resumeSummary, omitRoles, condensedProjects, bulletsFor, resumeProjects, resumeSkills })
}

function renderHtml({ resumeTitle, resumeSummary, omitRoles, condensedProjects, bulletsFor, resumeProjects, resumeSkills }) {
  const contacts = [
    { text: site.email, href: `mailto:${site.email}` },
    { text: 'justindavidperez.com', href: 'https://justindavidperez.com' },
    { text: 'github.com/JustinPerez12', href: 'https://github.com/JustinPerez12' },
    { text: 'linkedin.com/in/justindperez', href: 'https://www.linkedin.com/in/justindperez/' },
  ]

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escape(site.name)} — Résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #16161a;
    --muted: #4a4a55;
    --subtle: #7a7a86;
    --rule: #d8d8e0;
    --accent: #3730a3;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  /* Margins are owned by build-resume.mjs (puppeteer's margin option).
     Setting them here too makes the two fight and silently adds a page. */
  @page { size: letter; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 8.7pt;
    line-height: 1.25;
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  /* ---------- header ---------- */
  header { margin-bottom: 9pt; }

  .name {
    font-size: 21pt;
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1;
  }

  .title {
    font-size: 10pt;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 0.01em;
    margin-top: 3pt;
  }

  .contacts {
    margin-top: 6pt;
    font-size: 8.4pt;
    color: var(--muted);
    display: flex;
    flex-wrap: wrap;
    gap: 0 7pt;
  }

  .contacts span:not(:last-child)::after {
    content: '·';
    margin-left: 7pt;
    color: var(--rule);
  }

  .summary {
    color: var(--muted);
    margin-bottom: 2pt;
    max-width: 100%;
  }

  .entry__note { color: var(--subtle); text-align: right; }

  /* ---------- sections ---------- */
  section { margin-top: 6pt; break-inside: avoid; }

  h2 {
    font-size: 8.2pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.11em;
    color: var(--accent);
    padding-bottom: 2pt;
    border-bottom: 0.75pt solid var(--rule);
    margin-bottom: 5pt;
  }

  .entry { margin-bottom: 4pt; break-inside: avoid; }
  .entry:last-child { margin-bottom: 0; }

  .entry__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10pt;
  }

  .entry__role { font-size: 9.9pt; font-weight: 600; letter-spacing: -0.01em; }
  .entry__org { font-weight: 500; color: var(--accent); }
  .entry__when { font-size: 8.3pt; color: var(--subtle); white-space: nowrap; }

  .entry__sub {
    display: flex;
    justify-content: space-between;
    gap: 10pt;
    font-size: 8.4pt;
    color: var(--subtle);
    margin-bottom: 2.5pt;
  }

  ul { list-style: none; margin-top: 1.5pt; }

  li {
    position: relative;
    padding-left: 8.5pt;
    margin-bottom: 1.2pt;
    color: var(--muted);
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4.3pt;
    width: 3pt;
    height: 0.75pt;
    background: var(--subtle);
  }

  /* ---------- skills ---------- */
  .skills { display: grid; grid-template-columns: 80pt 1fr; gap: 1.5pt 8pt; }
  .skills dt { font-weight: 600; font-size: 8.2pt; }
  .skills dd { color: var(--muted); font-size: 8.1pt; }

  /* ---------- education ---------- */
  .edu {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10pt;
  }
  .edu__what { font-size: 9.3pt; font-weight: 600; letter-spacing: -0.01em; }
  .edu__where { font-weight: 500; color: var(--accent); }
  .edu__when { font-size: 8.3pt; color: var(--subtle); white-space: nowrap; }

</style>
</head>
<body>
  <header>
    <div class="name">${escape(site.name)}</div>
    <div class="title">${escape(resumeTitle)}</div>
    <div class="contacts">
      ${contacts.map((c) => `<span><a href="${escape(c.href)}">${escape(c.text)}</a></span>`).join('\n      ')}
    </div>
  </header>

  <p class="summary">${escape(resumeSummary)}</p>

  <section>
    <h2>Experience</h2>
    ${experience
      .filter((job) => !omitRoles.has(job.company))
      .map(
        (job) => `<div class="entry">
      <div class="entry__head">
        <div class="entry__role">${escape(job.title)} <span class="entry__org">· ${escape(job.company)}</span></div>
        <div class="entry__when">${escape(job.period)}</div>
      </div>
      <div class="entry__sub"><span>${escape(job.location)}</span>${job.note ? `<span class="entry__note">${escape(job.note)}</span>` : ''}</div>
      ${
        bulletsFor(job).length > 0
          ? `<ul>
        ${bulletsFor(job).map((h) => `<li>${escape(h)}</li>`).join('\n        ')}
      </ul>`
          : ''
      }
    </div>`,
      )
      .join('\n    ')}
  </section>

  <section>
    <h2>Projects</h2>
    ${resumeProjects
      .map(
        (project) => `<div class="entry">
      <div class="entry__head">
        <div class="entry__role">${escape(project.name)} <span class="entry__org">· ${escape(project.tagline)}</span></div>
        <div class="entry__when">${escape(project.year)}</div>
      </div>
      <div class="entry__sub"><span>${escape(project.href)}</span></div>
      ${
        condensedProjects.has(project.name)
          ? ''
          : `<ul><li>${escape(project.resumeBlurb)}</li></ul>`
      }
    </div>`,
      )
      .join('\n    ')}
  </section>

  <section>
    <h2>Skills</h2>
    <dl class="skills">
      ${resumeSkills
        .map(
          (group) =>
            `<dt>${escape(group.group)}</dt><dd>${escape(group.items.join(', '))}</dd>`,
        )
        .join('\n      ')}
    </dl>
  </section>

  <section>
    <h2>Education</h2>
    ${education
      .map(
        (school) => `<div class="edu">
      <div class="edu__what">${escape(school.degree)} <span class="edu__where">· ${escape(school.school)}</span></div>
      <div class="edu__when">${escape(school.location)} · ${escape(school.period)}</div>
    </div>`,
      )
      .join('\n    ')}
  </section>

</body>
</html>`
}
