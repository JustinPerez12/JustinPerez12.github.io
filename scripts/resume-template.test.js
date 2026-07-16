import { describe, expect, it } from 'vitest'
import { renderResume } from './resume-template.js'
import { experience } from '../src/data/experience.js'
import { projects } from '../src/data/projects.js'
import { education } from '../src/data/education.js'
import { site } from '../src/data/site.js'

const html = renderResume()

/** Strip tags so assertions read against what a human (or an ATS) sees. */
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')

/**
 * Mirrors the template's escaping. Needed because some copy contains "&"
 * (P&L curves), which is `&amp;` by the time it reaches the document.
 */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

describe('résumé data integrity', () => {
  // A project without a resumeBlurb renders the literal string "undefined"
  // into the PDF. Cheap test, ugly failure.
  it('every project rendered in full has a resumeBlurb', () => {
    projects
      .filter((project) => project.name !== 'Huddle Up')
      .forEach((project) => {
        expect(project.resumeBlurb, `${project.name} is missing resumeBlurb`).toBeTruthy()
      })
  })

  it('every project has a tagline for the heading', () => {
    projects.forEach((project) => {
      expect(project.tagline, `${project.name} is missing tagline`).toBeTruthy()
    })
  })

  it('every job has a location and period', () => {
    experience.forEach((job) => {
      expect(job.location, `${job.company} is missing location`).toBeTruthy()
      expect(job.period, `${job.company} is missing period`).toBeTruthy()
    })
  })

  it('never renders undefined or null into the document', () => {
    expect(html).not.toMatch(/>undefined</)
    expect(html).not.toMatch(/>null</)
    expect(text).not.toMatch(/\bundefined\b/)
  })
})

describe('résumé content', () => {
  it('leads with the name, headline, and positioning summary', () => {
    expect(text).toContain(site.name)
    expect(text).toContain('Full Stack Software Engineer')
    expect(html).toContain(esc(site.resumeSummary))
  })

  it('does not claim a Senior title the actual role contradicts', () => {
    // The real title (Software Engineer 2) sits directly under the headline.
    expect(html).not.toMatch(/Senior Software Engineer/)
  })

  it('includes contact routes but never the private phone number', () => {
    expect(html).toContain(`mailto:${site.email}`)
    expect(html).toContain('linkedin.com/in/justindperez')
    expect(html).toContain('github.com/JustinPerez12')
    expect(text).not.toMatch(/770-778-0722/)
    expect(text).not.toMatch(/umail/)
  })

  it('carries the strongest quantified outcome', () => {
    expect(text).toContain('10% to over 45%')
  })

  it('renders education', () => {
    education.forEach((school) => {
      expect(text).toContain(school.degree)
      expect(text).toContain(school.school)
    })
  })

  it('has no dated footer to go stale', () => {
    expect(text).not.toMatch(/Updated \w+ \d+, \d{4}/)
  })
})

describe('one-page rationing', () => {
  const bulletsIn = (company) => {
    const job = experience.find((entry) => entry.company === company)
    return job.highlights.filter((highlight) => html.includes(esc(highlight).slice(0, 40)))
  }

  it('caps NICE at six bullets while the data holds more', () => {
    const nice = experience.find((job) => job.company === 'NICE')
    expect(nice.highlights.length).toBeGreaterThan(6)
    expect(bulletsIn('NICE')).toHaveLength(6)
  })

  it('takes the top bullets in data order, not an arbitrary subset', () => {
    const nice = experience.find((job) => job.company === 'NICE')
    expect(bulletsIn('NICE')).toEqual(nice.highlights.slice(0, 6))
  })

  it('caps Cox at four bullets', () => {
    expect(bulletsIn('Cox Automotive')).toHaveLength(4)
  })

  it('omits the school-era internship entirely', () => {
    expect(html).not.toContain('Wavetronix')
  })

  it('keeps the internship on the site data even though the résumé drops it', () => {
    // The omission is a résumé-space decision, not a deletion.
    expect(experience.some((job) => job.company === 'Wavetronix')).toBe(true)
  })

  it('condenses the capstone to a heading but keeps the production projects', () => {
    expect(html).toContain('Huddle Up')
    expect(html).not.toContain(esc(projects.find((p) => p.name === 'Huddle Up').resumeBlurb ?? '@@none@@'))
    expect(html).toContain(esc(projects.find((p) => p.name === 'Dynasty Futures').resumeBlurb))
    expect(html).toContain(esc(projects.find((p) => p.name === 'Campus Core').resumeBlurb))
  })
})

describe('markup safety', () => {
  it('escapes HTML-significant characters in data', () => {
    // Cox's bullets contain "&" via ampersands and the P&L string in projects.
    expect(html).not.toMatch(/<li>[^<]*&(?!amp;|lt;|gt;|quot;|#)/)
  })

  it('renders a single self-contained document', () => {
    expect(html.startsWith('<!doctype html>')).toBe(true)
    expect(html.trim().endsWith('</html>')).toBe(true)
  })

  it('lets build-resume.mjs own the page margins', () => {
    // Setting margins in CSS @page as well makes the two fight and silently
    // adds a second page.
    expect(html).toMatch(/@page \{ size: letter; \}/)
    expect(html).not.toMatch(/@page[^}]*margin/)
  })
})
