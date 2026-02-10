import { Link } from 'react-router-dom'

import type { Project } from '@/lib/api'

type Props = {
  project: Project
  previewParagraphs: string[]
}

export function ProjectHero({ project, previewParagraphs }: Props) {
  return (
    <div className="projectHeroLeft">
      <Link to="/projects" className="projectBack">
        Back to portfolio
      </Link>

      <h1 className="projectTitle">{project.name}</h1>
      <div className="projectDivider" aria-hidden="true" />

      <div className="projectMetaRow">
        <div className="projectMeta">{project.category}</div>
        <div className="projectMeta">{project.dateLabel}</div>
      </div>

      <p className="projectIntro">{project.caseStudy.intro}</p>

      {previewParagraphs.map((p, i) => (
        <p key={i} className="projectPreview">
          {p}
        </p>
      ))}
    </div>
  )
}

