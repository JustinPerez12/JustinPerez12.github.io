import { site } from '../../data/site'
import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <p className="footer__copy">
        © {new Date().getFullYear()} {site.name}
      </p>

      <p className="footer__built">
        Built with React and Vite ·{' '}
        <a
          href="https://github.com/JustinPerez12/JustinPerez12.github.io"
          target="_blank"
          rel="noreferrer noopener"
        >
          Source
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
