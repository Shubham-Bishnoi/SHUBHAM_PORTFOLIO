import type { Project } from '@/lib/api'

type Props = {
  project: Project
}

function BadgeIcon({ name }: { name: Project['hero']['badgeIcon'] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  } as const

  if (name === 'shield') {
    return (
      <svg {...common}>
        <path
          d="M12 2l7 4v6c0 5-3 9-7 10C8 21 5 17 5 12V6l7-4z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'bots') {
    return (
      <svg {...common}>
        <path d="M9 4V2h6v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M7 8h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6a3 3 0 013-3z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 13h0" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M15 13h0" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M8 20v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 20v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'figma') {
    return (
      <svg {...common}>
        <path
          d="M12 2a3 3 0 013 3v2a3 3 0 01-3 3h-1a3 3 0 01-3-3V5a3 3 0 013-3h1z"
          stroke="white"
          strokeWidth="1.8"
        />
        <path
          d="M11 10h1a3 3 0 013 3v1a3 3 0 01-3 3h-1a3 3 0 01-3-3v-1a3 3 0 013-3z"
          stroke="white"
          strokeWidth="1.8"
        />
        <path d="M11 17h1a3 3 0 013 3 3 3 0 01-6 0 3 3 0 013-3z" stroke="white" strokeWidth="1.8" />
      </svg>
    )
  }

  if (name === 'finance') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.8" />
        <path d="M12 7v10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 9.5h5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 14.5h5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'leaf') {
    return (
      <svg {...common}>
        <path
          d="M19 5c-6 0-11 4-13 10 4-2 8-2 12 0 1-3 1-7 1-10z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M6 16c2-4 6-7 12-10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'brain' || name === 'model') {
    return (
      <svg {...common}>
        <path
          d="M9 6c-2 0-3 1.5-3 3.5S7 13 9 13h.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M15 6c2 0 3 1.5 3 3.5S17 13 15 13h-.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M10 13v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 13v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 18h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'gpu') {
    return (
      <svg {...common}>
        <rect x="5" y="7" width="14" height="10" rx="2" stroke="white" strokeWidth="1.8" />
        <circle cx="10" cy="12" r="1.6" fill="white" />
        <circle cx="14" cy="12" r="1.6" fill="white" />
        <path d="M7 6v2M10 6v2M13 6v2M16 6v2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'mic') {
    return (
      <svg {...common}>
        <rect x="10" y="5" width="4" height="9" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M8 12a4 4 0 008 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16v3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 19h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'switch') {
    return (
      <svg {...common}>
        <path d="M7 8h10l-2-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 16H7l2 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'crowd' || name === 'users') {
    return (
      <svg {...common}>
        <circle cx="9" cy="10" r="2" fill="white" />
        <circle cx="15" cy="10" r="2" fill="white" />
        <circle cx="12" cy="8" r="2.3" fill="white" />
        <path d="M6 19c.5-3 3-4 6-4s5.5 1 6 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'chart') {
    return (
      <svg {...common}>
        <path d="M6 18V6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 18h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 16v-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 16v-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M15 16v-3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="6 3h12v18H6z" stroke="white" strokeWidth="1.8" />
      <path d="M9 7h6M9 11h6M9 15h6" stroke="white" strokeWidth="1.8" />
    </svg>
  )
}

export function ProjectCollage({ project }: Props) {
  const images = project.hero.collage
  const main = images[0]
  const second = images[1]
  const third = images[2]

  return (
    <div className="pd-collage">
      <img className="pd-collage-main" src={main} alt="" />
      {second ? <img className="pd-collage-a" src={second} alt="" /> : null}
      {third ? <img className="pd-collage-b" src={third} alt="" /> : null}

      <div className="pd-collage-badge" aria-hidden="true">
        <BadgeIcon name={project.hero.badgeIcon} />
      </div>
    </div>
  )
}
