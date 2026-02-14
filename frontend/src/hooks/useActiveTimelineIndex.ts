import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

type Result = {
  activeIndex: number
  reduceMotion: boolean
  setRef: (index: number) => (node: HTMLElement | null) => void
}

export function useActiveTimelineIndex(itemCount: number): Result {
  const elementsRef = useRef<Array<HTMLElement | null>>([])
  const ratiosRef = useRef<Map<number, number>>(new Map())
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion())

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    elementsRef.current = elementsRef.current.slice(0, itemCount)
    ratiosRef.current.clear()
    if (activeIndex > itemCount - 1) setActiveIndex(0)
  }, [activeIndex, itemCount])

  const thresholds = useMemo(() => [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (itemCount <= 0) return

    const elementToIndex = new WeakMap<Element, number>()
    for (let i = 0; i < itemCount; i += 1) {
      const el = elementsRef.current[i]
      if (el) elementToIndex.set(el, i)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false
        for (const entry of entries) {
          const idx = elementToIndex.get(entry.target)
          if (idx === undefined) continue
          const prev = ratiosRef.current.get(idx) ?? 0
          const next = entry.isIntersecting ? entry.intersectionRatio : 0
          if (prev !== next) {
            ratiosRef.current.set(idx, next)
            changed = true
          }
        }

        if (!changed) return

        let bestIndex = activeIndexRef.current
        let bestRatio = ratiosRef.current.get(bestIndex) ?? 0
        for (let i = 0; i < itemCount; i += 1) {
          const r = ratiosRef.current.get(i) ?? 0
          if (r > bestRatio + 0.01) {
            bestRatio = r
            bestIndex = i
          }
        }
        if (bestIndex !== activeIndexRef.current) setActiveIndex(bestIndex)
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: thresholds,
      }
    )

    for (let i = 0; i < itemCount; i += 1) {
      const el = elementsRef.current[i]
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [itemCount, thresholds])

  const setRef = useCallback(
    (index: number) => {
      return (node: HTMLElement | null) => {
        elementsRef.current[index] = node
      }
    },
    []
  )

  return { activeIndex, reduceMotion, setRef }
}
