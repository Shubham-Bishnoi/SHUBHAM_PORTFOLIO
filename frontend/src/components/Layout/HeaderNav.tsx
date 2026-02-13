import { NavLink } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'

import './HeaderNav.css'

const links = [
  { to: '/about', label: 'about' },
  { to: '/experience', label: 'experience' },
  { to: '/projects', label: 'projects' },
  { to: '/contact', label: 'contact' },
]

export function HeaderNav() {
  return (
    <header className="headerNav" style={{ borderBottom: '1px solid var(--hairline)' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 0',
            gap: 20,
          }}
        >
          <NavLink
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
            aria-label="Shubham"
          >
            <img
              src="/images/shubham.jpeg"
              alt="Shubham"
              width={34}
              height={34}
              style={{
                borderRadius: 999,
                objectFit: 'cover',
                border: '1px solid var(--hairline)',
              }}
            />
            <span
              style={{
                fontSize: 14,
                letterSpacing: '0.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              SHUBHAM
            </span>
          </NavLink>

          <nav aria-label="Primary">
            <ul className="headerNavLinks">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `navTile tile button up${isActive ? ' isActive' : ''}`
                    }
                  >
                    <div className="navTileInner tile">
                      <span className="navTileLabel">{l.label}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
