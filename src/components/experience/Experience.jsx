import { FiArrowUpRight } from 'react-icons/fi'
import { experience } from '../../data/experience'
import './Experience.css'

const Experience = () => (
  <section id="experience" className="section">
    <div className="container">
      <div className="section__header">
        <p className="section__label">Experience</p>
        <h2 className="section__title">Where I&apos;ve worked</h2>
        <p className="section__intro">
          Three years building software that other engineers depend on — mostly in security,
          infrastructure, and the data layers underneath.
        </p>
      </div>

      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true">
              <span className={`timeline__dot ${job.end === null ? 'timeline__dot--current' : ''}`} />
            </div>

            <div className="timeline__body">
              <p className="timeline__period">
                {job.period}
                {job.end === null && <span className="timeline__badge">Current</span>}
              </p>

              <h3 className="timeline__title">
                {job.title}
                <span className="timeline__at"> at </span>
                <a
                  href={job.href}
                  className="timeline__company"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {job.company}
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              </h3>

              {job.highlights.length > 0 && (
                <ul className="timeline__highlights">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default Experience
