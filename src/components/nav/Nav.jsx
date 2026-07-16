import { useEffect, useState } from 'react'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { navLinks, site } from '../../data/site'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useTheme } from '../../hooks/useTheme'
import './Nav.css'

// Module scope keeps the identity stable across renders, so the scroll-spy
// observer isn't torn down and rebuilt on every paint.
const NAV_IDS = navLinks.map((link) => link.id)

const Nav = () => {
  const activeId = useScrollSpy(NAV_IDS)
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // A menu that survives an Escape press or a resize into desktop is a bug.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setMenuOpen(false)}>
          {site.name}
        </a>

        <nav aria-label="Primary">
          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${activeId === link.id ? 'nav__link--active' : ''}`}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button
            type="button"
            className="nav__icon-btn nav__icon-btn--menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Nav
