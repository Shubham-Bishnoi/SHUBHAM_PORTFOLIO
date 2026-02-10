import { useEffect, useState } from 'react'

import type { ProjectCard } from '@/lib/api'
import { getProjects } from '@/lib/api'

type State =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ready'; projects: ProjectCard[] }

export function useProjects() {
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    let alive = true

    getProjects().then(
      (projects) => {
        if (alive) setState({ kind: 'ready', projects })
      },
      () => {
        if (alive) setState({ kind: 'error' })
      }
    )

    return () => {
      alive = false
    }
  }, [])

  return state
}
