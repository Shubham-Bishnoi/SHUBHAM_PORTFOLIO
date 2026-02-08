import { useEffect, useState } from 'react'

import type { Profile } from '@/lib/api'
import { getProfile } from '@/lib/api'

type State =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ready'; profile: Profile }

let cachedProfile: Profile | null = null
let inFlight: Promise<Profile> | null = null

export function useProfile() {
  const [state, setState] = useState<State>(() => {
    if (cachedProfile) return { kind: 'ready', profile: cachedProfile }
    return { kind: 'loading' }
  })

  useEffect(() => {
    let alive = true
    if (cachedProfile) return

    const p = inFlight ?? getProfile()
    inFlight = p

    p.then(
      (profile) => {
        cachedProfile = profile
        inFlight = null
        if (alive) setState({ kind: 'ready', profile })
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

