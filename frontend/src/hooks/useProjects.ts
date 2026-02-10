import { useEffect, useState } from 'react'

import type { ProjectCard } from '@/lib/api'
import { getProjects } from '@/lib/api'

type State =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ready'; projects: ProjectCard[] }

let cachedProjects: ProjectCard[] | null = null
let inFlight: Promise<ProjectCard[]> | null = null

export function useProjects() {
  const [state, setState] = useState<State>(() => {
    if (cachedProjects) return { kind: 'ready', projects: cachedProjects }
    return { kind: 'loading' }
  })

  useEffect(() => {
    let alive = true
    if (cachedProjects) return

    const p = inFlight ?? getProjects()
    inFlight = p

    p.then(
      (projects) => {
        cachedProjects = projects
        inFlight = null
        if (alive) setState({ kind: 'ready', projects })
      },
      () => {
        inFlight = null
        if (alive) setState({ kind: 'error' })
      }
    )

    return () => {
      alive = false
    }
  }, [])

  return state
}

