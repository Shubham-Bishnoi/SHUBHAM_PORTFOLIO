import { useEffect, useMemo, useRef, useState } from 'react'

type Options = {
  lerp?: number
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [query])

  return matches
}

export function useSmoothCursor(active: boolean, options: Options = {}) {
  const lerp = useMemo(() => {
    const value = options.lerp ?? 0.14
    return Math.min(0.22, Math.max(0.08, value))
  }, [options.lerp])

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const canHoverFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const enabled = canHoverFinePointer
  const visible = active && enabled

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)

  useEffect(() => {
    if (!visible) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!hasMoved) {
        current.current.x = e.clientX
        current.current.y = e.clientY
        setPos({ x: e.clientX, y: e.clientY })
        setHasMoved(true)
        return
      }

      if (prefersReducedMotion) {
        current.current.x = e.clientX
        current.current.y = e.clientY
        setPos({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [hasMoved, prefersReducedMotion, visible])

  useEffect(() => {
    if (!visible) return
    if (prefersReducedMotion) return

    if (!hasMoved) return
    if (rafId.current != null) return

    const tick = () => {
      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y
      current.current.x += dx * lerp
      current.current.y += dy * lerp
      setPos({ x: current.current.x, y: current.current.y })
      rafId.current = window.requestAnimationFrame(tick)
    }

    rafId.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [hasMoved, lerp, prefersReducedMotion, visible])

  useEffect(() => {
    if (!visible) {
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [visible])

  return {
    enabled,
    visible,
    hasMoved,
    prefersReducedMotion,
    x: pos.x,
    y: pos.y,
  }
}
