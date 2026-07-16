import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { site } from '../../data/site'
import Socials from '../socials/Socials'
import Resume from '../../Assets/Justin_Perez_Resume.pdf'
import './Hero.css'

const Hero = () => (
  <section id="top" className="hero">
    <div className="container hero__inner">
      <p className="hero__eyebrow">
        <span className="hero__status" aria-hidden="true" />
        {site.role} · {site.location}
      </p>

      <h1 className="hero__title">{site.name}</h1>

      <p className="hero__tagline">{site.tagline}</p>

      <p className="hero__intro">{site.intro}</p>

      <div className="hero__actions">
        <a href="#work" className="btn btn--primary">
          View my work
        </a>
        <a href={Resume} download className="btn">
          Résumé
          <FiArrowUpRight aria-hidden="true" />
        </a>
        <Socials className="hero__socials" />
      </div>
    </div>

    <a href="#about" className="hero__scroll" aria-label="Scroll to about">
      <FiArrowDown aria-hidden="true" />
    </a>
  </section>
)

export default Hero
