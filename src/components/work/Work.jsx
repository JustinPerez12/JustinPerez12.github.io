import { FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../../data/projects'
import './Work.css'

const Work = () => (
  <section id="work" className="section">
    <div className="container">
      <div className="section__header">
        <p className="section__label">Work</p>
        <h2 className="section__title">Selected projects</h2>
        <p className="section__intro">
          Things I&apos;ve built end to end — from the database schema up to the interface.
        </p>
      </div>

      <div className="work">
        {projects.map((project) => (
          <article key={project.name} className="work__item">
            <div className="work__meta">
              <p className="work__year">{project.year}</p>
              <p className="work__role">{project.role}</p>
            </div>

            <div className="work__body">
              <h3 className="work__name">{project.name}</h3>

              <p className="work__summary">{project.summary}</p>
              {project.detail && <p className="work__detail">{project.detail}</p>}

              <ul className="work__tech">
                {project.tech.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>

              {project.links.length > 0 && (
                <div className="work__links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="link-arrow"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.label}
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Work
