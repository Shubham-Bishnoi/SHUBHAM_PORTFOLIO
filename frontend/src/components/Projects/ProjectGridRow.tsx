import type { CSSProperties } from 'react'

import type { ProjectCard as ProjectCardType } from '@/lib/api'

import type { PopSettings } from './ProjectCard'
import { ProjectCard } from './ProjectCard'

type Columns = { base: number; md: number; lg: number }

type Props = {
  projects: ProjectCardType[]
  pop: PopSettings
  columns?: Columns
}

export function ProjectGridRow({ projects, pop, columns }: Props) {
  const cols: Columns = columns ?? { base: 1, md: 2, lg: 4 }

  const style: CSSProperties = {
    ['--cols-base' as string]: cols.base,
    ['--cols-md' as string]: cols.md,
    ['--cols-lg' as string]: cols.lg,
  }

  return (
    <div className="projectGridRow" role="list" style={style}>
      {projects.map((p) => (
        <div key={p.slug} role="listitem">
          <ProjectCard project={p} pop={pop} />
        </div>
      ))}
    </div>
  )
}

