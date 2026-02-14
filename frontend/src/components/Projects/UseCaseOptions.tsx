import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { ProjectCard as ProjectCardType } from '@/lib/api'

import './UseCaseOptions.css'

type Props = {
  projects: ProjectCardType[]
}

const ROW_SIZE = 4

function supportsHover(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover:hover)').matches
}

export function UseCaseOptions({ projects }: Props) {
  const ordered = useMemo(() => projects.slice(), [projects])
  const rows = useMemo(() => {
    const out: ProjectCardType[][] = []
    for (let i = 0; i < ordered.length; i += ROW_SIZE) {
      out.push(ordered.slice(i, i + ROW_SIZE))
    }
    return out
  }, [ordered])
  const [activeByRow, setActiveByRow] = useState<Record<number, string>>(() => {
    const map: Record<number, string> = {}
    for (let i = 0; i < ordered.length; i += ROW_SIZE) {
      const slug = ordered[i]?.slug
      if (slug) map[Math.floor(i / ROW_SIZE)] = slug
    }
    return map
  })

  useEffect(() => {
    if (!ordered.length) return
    setActiveByRow((prev) => {
      const next: Record<number, string> = { ...prev }
      const maxRow = Math.ceil(ordered.length / ROW_SIZE)

      for (let row = 0; row < maxRow; row += 1) {
        const startIndex = row * ROW_SIZE
        const fallback = ordered[startIndex]?.slug ?? ''
        const current = next[row]

        if (!current) {
          if (fallback) next[row] = fallback
          continue
        }

        if (!ordered.some((p) => p.slug === current)) {
          if (fallback) next[row] = fallback
        }
      }

      for (const key of Object.keys(next)) {
        const row = Number(key)
        if (!Number.isFinite(row) || row < 0 || row >= maxRow) delete next[row]
      }

      return next
    })
  }, [ordered])

  if (!ordered.length) return null

  return (
    <div className="useCaseSection" aria-label="All use cases">
      <div className="useCaseTrack" role="list">
        {rows.map((rowProjects, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="useCaseRow"
            role="presentation"
            style={{ ['--closed-count' as string]: Math.max(0, rowProjects.length - 1) } as CSSProperties}
          >
            {rowProjects.map((project) => {
              const isActive = project.slug === activeByRow[rowIndex]
              const goToProject = `/projects/${project.slug}`

              return (
                <div key={project.slug} className="useCaseCell" role="listitem">
                  <Link
                    to={goToProject}
                    className={isActive ? 'useCaseCard isActive' : 'useCaseCard'}
                    aria-label={isActive ? `Open ${project.name}` : `Preview ${project.name}`}
                    onMouseEnter={() => {
                      if (!supportsHover()) return
                      setActiveByRow((prev) => ({ ...prev, [rowIndex]: project.slug }))
                    }}
                    onFocus={() => setActiveByRow((prev) => ({ ...prev, [rowIndex]: project.slug }))}
                    onClick={(e) => {
                      if (isActive) return
                      e.preventDefault()
                      setActiveByRow((prev) => ({ ...prev, [rowIndex]: project.slug }))
                    }}
                  >
                    <img className="useCaseBg" src={project.thumbnail} alt="" loading="lazy" aria-hidden="true" />
                    <div className="useCaseOverlay" aria-hidden="true" />

                    <div className="useCaseContent">
                      <img className="useCaseThumb" src={project.thumbnail} alt="" loading="lazy" aria-hidden="true" />

                      <div className="useCaseText">
                        <h3 className="useCaseTitle">{project.name}</h3>
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
        ))}
      </div>
    </div>
  )
}
