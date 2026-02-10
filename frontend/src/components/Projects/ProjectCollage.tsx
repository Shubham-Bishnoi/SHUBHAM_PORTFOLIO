import { Bot, FileText, Figma, Shield } from 'lucide-react'

import type { Project } from '@/lib/api'

type Props = {
  project: Project
}

function BadgeIcon({ name }: { name: Project['hero']['badgeIcon'] }) {
  const common = { size: 18, 'aria-hidden': true } as const
  if (name === 'figma') return <Figma {...common} />
  if (name === 'shield') return <Shield {...common} />
  if (name === 'bots') return <Bot {...common} />
  return <FileText {...common} />
}

export function ProjectCollage({ project }: Props) {
  const images = project.hero.collage
  const main = images[0]
  const second = images[1]
  const third = images[2]

  return (
    <div className="projectCollage">
      <div className="projectCollageBadge" aria-label={project.hero.badgeIcon}>
        <BadgeIcon name={project.hero.badgeIcon} />
      </div>

      <div className="projectCollageMain">
        <img src={main} alt="" />
      </div>

      {second ? (
        <div className="projectCollageSecond">
          <img src={second} alt="" />
        </div>
      ) : null}

      {third ? (
        <div className="projectCollageThird">
          <img src={third} alt="" />
        </div>
      ) : null}
    </div>
  )
}

