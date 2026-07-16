import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { site } from '../../data/site'
import './Socials.css'

const ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
}

const Socials = ({ className = '' }) => (
  <ul className={`socials ${className}`}>
    {site.socials.map(({ label, href, icon }) => {
      const Icon = ICONS[icon]
      const isExternal = href.startsWith('http')

      return (
        <li key={label}>
          <a
            href={href}
            className="socials__link"
            aria-label={label}
            {...(isExternal && { target: '_blank', rel: 'noreferrer noopener' })}
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      )
    })}
  </ul>
)

export default Socials
