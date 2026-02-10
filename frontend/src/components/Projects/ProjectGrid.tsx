import type { ProjectCard as ProjectCardType } from '@/lib/api'

import type { PopSettings } from './ProjectCard'
import { ProjectCard } from './ProjectCard'

type Props = {
  projects: ProjectCardType[]
  pop: PopSettings
}

export function ProjectGrid({ projects, pop }: Props) {
  return (
    <div className="projectGrid" role="list">
      {projects.map((p) => (
        <div key={p.slug} role="listitem">
          <ProjectCard project={p} pop={pop} />
        </div>
      ))}
    </div>
  )
}

