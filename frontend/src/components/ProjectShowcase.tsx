import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function HoverCursorMark() {
  const stroke = '#F2E7D8'
  const strokeWidth = 4

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ display: 'block' }}
    >
      <circle cx="50" cy="50" r="48" stroke={stroke} strokeWidth={strokeWidth} />
      <path
        d="M34 66 L66 34 M46 34 H66 V54"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      />
    </svg>
  )
}

export type ShowcaseProject = {
  id: string
  title: string
  category: string
  year: string
  image: string
  description?: string
  link?: string
}

type ProjectShowcaseProps = {
  projects: ShowcaseProject[]
  title?: string
  subtitle?: string
}

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

function ProjectCard({ project, index }: { project: ShowcaseProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const href = project.link || `/projects/${project.id}`

  return (
    <motion.div
      ref={cardRef}
      className="project-card relative w-full cursor-pointer group"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor-hover
    >
      {isExternalLink(href) ? (
        <a href={href} target="_blank" rel="noreferrer" className="block">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <motion.div
              className="absolute pointer-events-none z-10"
              animate={{
                x: mousePosition.x - 50,
                y: mousePosition.y - 50,
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
            >
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                <HoverCursorMark />
              </div>
            </motion.div>
          </div>

          <div className="py-6 px-2 flex items-start justify-between">
            <div>
              <motion.h3
                className="text-2xl md:text-3xl font-medium text-white mb-2"
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>

              <div className="flex items-center gap-3 text-sm text-neutral-400 uppercase tracking-wider">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-500" />
                <span>{project.year}</span>
              </div>

              {project.description ? (
                <div className="mt-3 text-sm text-neutral-300 max-w-3xl">{project.description}</div>
              ) : null}
            </div>

            <motion.div
              className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center"
              animate={{
                scale: isHovered ? 1.1 : 1,
                borderColor: isHovered ? '#fff' : '#525252',
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={20} className="text-white" strokeWidth={1.5} />
            </motion.div>
          </div>
        </a>
      ) : (
        <Link to={href} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <motion.div
            className="absolute pointer-events-none z-10"
            animate={{
              x: mousePosition.x - 50,
              y: mousePosition.y - 50,
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
          >
            <div className="w-[100px] h-[100px] flex items-center justify-center">
              <HoverCursorMark />
            </div>
          </motion.div>
        </div>

        <div className="py-6 px-2 flex items-start justify-between">
          <div>
            <motion.h3
              className="text-2xl md:text-3xl font-medium text-white mb-2"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <div className="flex items-center gap-3 text-sm text-neutral-400 uppercase tracking-wider">
              <span>{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-500" />
              <span>{project.year}</span>
            </div>

            {project.description ? (
              <div className="mt-3 text-sm text-neutral-300 max-w-3xl">{project.description}</div>
            ) : null}
          </div>

          <motion.div
            className="w-12 h-12 rounded-full border border-neutral-600 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              borderColor: isHovered ? '#fff' : '#525252',
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={20} className="text-white" strokeWidth={1.5} />
          </motion.div>
        </div>
        </Link>
      )}
    </motion.div>
  )
}

export default function ProjectShowcase({
  projects,
  title = "Work we're proud of",
  subtitle =
    'Over the years I completed hundreds of projects with several clients. Here is a selection of the best ones.',
}: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-black py-20 md:py-32">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-neutral-400 text-sm md:text-base uppercase tracking-wider max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
