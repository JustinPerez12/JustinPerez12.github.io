import { skills } from '../../data/skills'
import './Skills.css'

const Skills = () => (
  <section id="skills" className="section">
    <div className="container">
      <div className="section__header">
        <p className="section__label">Skills</p>
        <h2 className="section__title">What I work with</h2>
        <p className="section__intro">
          Tools I&apos;ve shipped production code with. Depth varies — the projects above are the
          honest measure.
        </p>
      </div>

      <dl className="skills">
        {skills.map(({ group, items }) => (
          <div key={group} className="skills__group">
            <dt className="skills__label">{group}</dt>
            <dd className="skills__items">
              {items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

export default Skills
