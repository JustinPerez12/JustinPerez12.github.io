import { FiArrowUpRight } from 'react-icons/fi'
import { site } from '../../data/site'
import Socials from '../socials/Socials'
import './Contact.css'

const Contact = () => (
  <section id="contact" className="section contact">
    <div className="container contact__inner">
      <p className="section__label">Contact</p>
      <h2 className="contact__title">Let&apos;s build something.</h2>
      <p className="contact__intro">
        I&apos;m always up for talking shop — new roles, interesting problems, or just comparing
        notes on infrastructure. The fastest way to reach me is email.
      </p>

      <a href={`mailto:${site.email}`} className="contact__email">
        {site.email}
        <FiArrowUpRight aria-hidden="true" />
      </a>

      <Socials className="contact__socials" />
    </div>
  </section>
)

export default Contact
