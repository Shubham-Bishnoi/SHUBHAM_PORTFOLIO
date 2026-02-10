import { useEffect, useMemo, useState } from 'react'

import type { Project } from '@/lib/api'
import { getProject, NotFoundError } from '@/lib/api'

type State =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'not_found' }
  | { kind: 'ready'; project: Project }

const cachedBySlug = new Map<string, Project>()
const inFlightBySlug = new Map<string, Promise<Project>>()

export function useProject(slug: string | undefined) {
  const key = useMemo(() => (slug ? slug.trim() : ''), [slug])

  const [state, setState] = useState<State>(() => {
    if (!key) return { kind: 'not_found' }
    const cached = cachedBySlug.get(key)
    if (cached) return { kind: 'ready', project: cached }
    return { kind: 'loading' }
  })

  useEffect(() => {
    let alive = true
    if (!key) {
      setState({ kind: 'not_found' })
      return
    }

    const cached = cachedBySlug.get(key)
    if (cached) {
      setState({ kind: 'ready', project: cached })
      return
    }

    const p = inFlightBySlug.get(key) ?? getProject(key)
    inFlightBySlug.set(key, p)

    p.then(
      (project) => {
        cachedBySlug.set(key, project)
        inFlightBySlug.delete(key)
        if (alive) setState({ kind: 'ready', project })
      },
      (err: unknown) => {
        inFlightBySlug.delete(key)
        if (!alive) return
        if (err instanceof NotFoundError) {
          setState({ kind: 'not_found' })
        } else {
          setState({ kind: 'error' })
        }
      }
    )

    return () => {
      alive = false
    }
  }, [key])

  return state
}

