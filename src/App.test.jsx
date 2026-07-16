import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { experience } from './data/experience'
import { projects } from './data/projects'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('leads with the name as the only h1', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Justin Perez')
  })

  it('renders every role from the experience data', () => {
    render(<App />)

    // Several roles share the title "Software Engineer", so match on the
    // title-and-company pair rather than the title alone.
    const roleHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)

    experience.forEach((job) => {
      expect(roleHeadings).toContainEqual(expect.stringContaining(job.title))
      expect(roleHeadings.some((text) => text.includes(job.title) && text.includes(job.company))).toBe(
        true,
      )
    })
  })

  it('marks only the current role as current', () => {
    render(<App />)

    const badges = screen.getAllByText('Current')
    expect(badges).toHaveLength(experience.filter((job) => job.end === null).length)
  })

  it('renders every project with a working outbound link', () => {
    render(<App />)

    projects.forEach((project) => {
      const heading = screen.getByRole('heading', { name: project.name, level: 3 })
      expect(heading).toBeInTheDocument()
    })

    // Every external link must be safe against reverse tabnabbing.
    const externalLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank')

    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toMatch(/noreferrer/)
    })
  })

  it('exposes contact email and hides the old phone number', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /justinprz12@gmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:justinprz12@gmail.com',
    )

    // Regressions here would put a personal number back on a public page.
    expect(document.body.textContent).not.toMatch(/770-778-0722/)
    expect(document.body.textContent).not.toMatch(/umail\.edu/)
  })

  it('does not advertise self-assessed skill levels', () => {
    render(<App />)
    expect(document.body.textContent).not.toMatch(/\b(Novice|Proficient)\b/)
  })

  it('toggles the theme and remembers the choice', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Defaults to dark, so the control offers light.
    const toggle = screen.getByRole('button', { name: /switch to light theme/i })
    await user.click(toggle)

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(window.localStorage.getItem('jp:theme')).toBe('light')
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument()
  })

  it('links every nav item to a section that exists', () => {
    const { container } = render(<App />)

    const nav = screen.getByRole('navigation', { name: /primary/i })
    const links = within(nav).getAllByRole('link')

    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => {
      const id = link.getAttribute('href').replace('#', '')
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    })
  })
})
