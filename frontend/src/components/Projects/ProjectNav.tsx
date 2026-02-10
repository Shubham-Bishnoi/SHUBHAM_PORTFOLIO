import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  nextSlug: string | null
}

export function ProjectNav({ nextSlug }: Props) {
  if (!nextSlug) return null

  return (
    <div className="projectNext">
      <Link
        to={`/projects/${nextSlug}`}
        className="projectNextBtn"
        aria-label="Next project"
      >
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  )
}

