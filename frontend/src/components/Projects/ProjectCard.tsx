import type { CSSProperties } from 'react'

import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { ProjectCard as ProjectCardType } from '@/lib/api'

export type PopSettings = {
  enabled: boolean
  intensity: number
}

type Props = {
  project: ProjectCardType
  pop: PopSettings
}

function shadowFor(intensity: number): string {
  const t = Math.min(100, Math.max(0, intensity)) / 100
  const y = Math.round(8 + 10 * t)
  const blur = Math.round(18 + 18 * t)
  const alpha = 0.08 + 0.1 * t
  return `0 ${y}px ${blur}px rgba(0,0,0,${alpha.toFixed(3)})`
}

export function ProjectCard({ project, pop }: Props) {
  const t = pop.enabled ? pop.intensity : 18
  const base = shadowFor(Math.round(t * 0.72))
  const hover = shadowFor(t)

  const style: CSSProperties = {
    ['--card-shadow' as string]: base,
    ['--card-shadow-hover' as string]: hover,
  }

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={pop.enabled ? 'projectCard projectCardPop' : 'projectCard'}
      style={style}
      aria-label={`Open ${project.name}`}
    >
      <div className="projectCardMedia" aria-hidden="true">
        <img src={project.thumbnail} alt="" loading="lazy" />
      </div>

      <div className="projectCardBody">
        <div className="projectCardTop">
          <div>
            <div className="projectCardTitle">{project.name}</div>
            <div className="projectCardMeta">
              <span>{project.category}</span>
              <span className="projectCardDot" aria-hidden="true">
                ·
              </span>
              <span>{project.dateLabel}</span>
            </div>
          </div>

          <ChevronRight className="projectCardChevron" size={18} aria-hidden="true" />
        </div>

        <div className="projectCardShort">{project.short}</div>
      </div>
    </Link>
  )
}
