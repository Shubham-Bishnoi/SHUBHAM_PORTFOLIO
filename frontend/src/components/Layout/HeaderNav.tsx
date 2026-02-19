import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'

import './HeaderNav.css'

const links = [
  { to: '/about', label: 'about' },
  { to: '/experience', label: 'experience' },
  { to: '/projects', label: 'projects' },
  { to: '/blog', label: 'blog' },
  { to: '/contact', label: 'contact' },
]

export function HeaderNav() {
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)
  const location = useLocation()

  const isProjectsPage = location.pathname === '/projects'
  const isBlogIndexPage = location.pathname === '/blog'
  const isDarkRoute =
    location.pathname === '/about' ||
    location.pathname === '/experience' ||
    location.pathname === '/contact' ||
    location.pathname.startsWith('/about/') ||
    location.pathname.startsWith('/experience/') ||
    location.pathname.startsWith('/contact/')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    }

    if (!isProjectsPage) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY, isProjectsPage])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('theme-dark', isDarkRoute)
    return () => {
      document.body.classList.remove('theme-dark')
    }
  }, [isDarkRoute])

  return (
    <header
      ref={containerRef}
      className={
        isProjectsPage
          ? 'headerNav headerNav--projects'
          : isBlogIndexPage
            ? 'headerNav headerNav--blog'
            : isDarkRoute
              ? 'headerNav headerNav--dark'
              : 'headerNav'
      }
      style={
        isProjectsPage
          ? undefined
          : isBlogIndexPage
            ? { borderBottom: 'none', backgroundColor: '#000000', color: '#ffffff' }
            : isDarkRoute
              ? undefined
              : { borderBottom: '1px solid var(--hairline)' }
      }
    >
      {!isProjectsPage && (
        <motion.div
          className="pointer-events-none fixed z-[100] mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isHovering ? 60 : 0,
              height: isHovering ? 60 : 0,
              opacity: isHovering ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </motion.div>
      )}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <NavLink
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
              aria-label="Shubham"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
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
          </div>

          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ul className="headerNavLinks">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `navTile tile button up${isActive ? ' isActive' : ''}`
                    }
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
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
