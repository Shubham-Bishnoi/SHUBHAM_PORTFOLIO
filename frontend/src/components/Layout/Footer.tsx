import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const containerRef = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'PROJECTS', to: '/projects' },
    { label: 'EXPERIENCE', to: '/experience' },
    { label: 'CONTACT', to: '/contact' },
  ]

  const socialLinks = [
    { label: 'LINKEDIN', href: 'https://linkedin.com/in/shubham' },
    { label: 'GITHUB', href: 'https://github.com/shubham' },
    { label: 'TWITTER', href: 'https://twitter.com/shubham' },
  ]

  return (
    <footer
      ref={containerRef}
      className="relative min-h-[80vh] w-full overflow-hidden bg-[#05060A] text-white"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 h-[120%] w-full">
          <img
            src="/images/IMG_8388.jpg"
            alt=""
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/80 to-transparent" />
        </div>
      </motion.div>

      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-[12vw] font-light leading-none tracking-tighter text-white/10">
            Shubham
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-[8vw] font-light text-white/10">©2026</span>
            <span className="text-[12vw] font-light leading-none tracking-tighter text-white/10">
              BISHNOI
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 flex min-h-[80vh] flex-col justify-between px-6 py-12 lg:px-16">
        <div className="flex flex-col justify-between gap-8 pt-20 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-6"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                type="button"
                onClick={() => navigate(link.to)}
                className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                style={{
                  fontFamily: '"Figtree", "Figtree Placeholder", sans-serif',
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-start gap-2 lg:mt-4 lg:items-end"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                style={{
                  fontFamily: '"Figtree", "Figtree Placeholder", sans-serif',
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
            <p className="mt-4 text-sm text-white/50">Designed with passion</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row"
        >
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-8">
            <span className="text-sm text-white/60">Bangalore, India</span>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/0 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
