import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { ProjectCard as ProjectCardType } from '@/lib/api'

import './UseCaseOptions.css'

type Props = {
  projects: ProjectCardType[]
  defaultActiveIndex?: number
  autoRotate?: boolean
  rotateMs?: number
}

function clampIndex(index: number, length: number): number {
  if (!Number.isFinite(index)) return 0
  if (length <= 0) return 0
  return Math.min(length - 1, Math.max(0, index))
}

function supportsHover(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover:hover)').matches
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()

    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  return reduced
}

export function ExpandableProjectRow({
  projects,
  defaultActiveIndex = 0,
  autoRotate = true,
  rotateMs = 3000,
}: Props) {
  const ordered = useMemo(() => projects.slice(0, 3), [projects])
  const [activeIndex, setActiveIndex] = useState(() => clampIndex(defaultActiveIndex, ordered.length))
  const reducedMotion = usePrefersReducedMotion()
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocusWithin, setHasFocusWithin] = useState(false)
  const wasPausedRef = useRef(false)

  useEffect(() => {
    setActiveIndex((prev) => clampIndex(prev, ordered.length))
  }, [ordered.length])

  const isPaused = isHovered || hasFocusWithin

  useEffect(() => {
    if (!autoRotate) return
    if (reducedMotion) return
    if (ordered.length <= 1) return

    if (isPaused) {
      wasPausedRef.current = true
      return
    }

    const delayMs = wasPausedRef.current ? 1000 : 0
    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setActiveIndex((i) => (i + 1) % ordered.length)
      }, rotateMs)
    }, delayMs)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [autoRotate, isPaused, ordered.length, reducedMotion, rotateMs])

  if (!ordered.length) return null

  return (
    <div
      ref={rowRef}
      className="useCaseSection"
      onMouseEnter={() => {
        if (!supportsHover()) return
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocusWithin(true)}
      onBlurCapture={() => {
        window.requestAnimationFrame(() => {
          const next = rowRef.current?.contains(document.activeElement) ?? false
          setHasFocusWithin(next)
        })
      }}
    >
      <div className="useCaseTrack" role="list">
        <div
          className="useCaseRow"
          role="presentation"
          style={{ ['--closed-count' as string]: Math.max(0, ordered.length - 1) } as CSSProperties}
        >
          {ordered.map((project, index) => {
            const isActive = index === activeIndex
            const goToProject = `/projects/${project.slug}`
            const collapsedLabel = project.shortLabel ? project.shortLabel : project.name

            return (
              <div key={project.slug} className="useCaseCell" role="listitem">
                <Link
                  to={goToProject}
                  className={isActive ? 'useCaseCard isActive' : 'useCaseCard'}
                  aria-label={isActive ? `Open ${project.name}` : `Preview ${project.name}`}
                  onMouseEnter={() => {
                    if (!supportsHover()) return
                    setActiveIndex(index)
                  }}
                  onFocus={() => setActiveIndex(index)}
                  onClick={(e) => {
                    if (isActive) return
                    e.preventDefault()
                    setActiveIndex(index)
                  }}
                >
                  <img className="useCaseBg" src={project.thumbnail} alt="" loading="lazy" aria-hidden="true" />
                  <div className="useCaseOverlay" aria-hidden="true" />

                  <div className="useCaseContent">
                    <img className="useCaseThumb" src={project.thumbnail} alt="" loading="lazy" aria-hidden="true" />

                    <div className="useCaseText">
                      <h3 className="useCaseTitle">{isActive ? project.name : collapsedLabel}</h3>
                      <p className="useCaseDesc">{project.short}</p>
                      <div className="useCaseCta" aria-hidden="true">
                        <span className="useCaseCtaIcon">
                          <ArrowUpRight size={16} />
                        </span>
                        <span>Details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
