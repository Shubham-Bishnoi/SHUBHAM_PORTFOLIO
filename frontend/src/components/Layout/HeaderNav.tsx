import { NavLink } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'

const links = [
  { to: '/about', label: 'about' },
  { to: '/experience', label: 'experience' },
  { to: '/projects', label: 'projects' },
  { to: '/contact', label: 'contact' },
]

export function HeaderNav() {
  return (
    <header style={{ borderBottom: '1px solid var(--hairline)' }}>
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
              fontSize: 14,
              letterSpacing: '0.28em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            SHUBHAM
          </NavLink>

          <nav aria-label="Primary">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                margin: 0,
                padding: 0,
                listStyle: 'none',
                fontSize: 13,
              }}
            >
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--text)' : 'var(--muted)',
                      textDecoration: isActive ? 'underline' : 'none',
                      textUnderlineOffset: 6,
                    })}
                  >
                    {l.label}
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
