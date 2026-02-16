import { useCallback, useEffect, useRef, useState } from 'react'
import { Briefcase } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { TimelineItem } from '@/data/timeTunnel'
import { useActiveTimelineIndex } from '@/hooks/useActiveTimelineIndex'

import { TimelineCard } from './TimelineCard'

type Props = {
  items: TimelineItem[]
}

export function ExperienceTimeTunnel({ items }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rowElsRef = useRef<Array<HTMLElement | null>>([])

  const { activeIndex, reduceMotion, setRef: setActiveRef } = useActiveTimelineIndex(items.length)

  const [inView, setInView] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    setInView(items.map(() => false))
    rowElsRef.current = rowElsRef.current.slice(0, items.length)
  }, [items])

  const setRowRef = useCallback(
    (index: number) => {
      const setActive = setActiveRef(index)
      return (node: HTMLElement | null) => {
        rowElsRef.current[index] = node
        setActive(node)
      }
    },
    [setActiveRef]
  )

  // progress widget removed

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (items.length === 0) return

    const elementToIndex = new WeakMap<Element, number>()
    for (let i = 0; i < items.length; i += 1) {
      const el = rowElsRef.current[i]
      if (el) elementToIndex.set(el, i)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          let changed = false
          const next = prev.slice()
          for (const entry of entries) {
            const idx = elementToIndex.get(entry.target)
            if (idx === undefined) continue
            const v = entry.isIntersecting
            if (next[idx] !== v) {
              next[idx] = v
              changed = true
            }
          }
          return changed ? next : prev
        })
      },
      {
        root: null,
        rootMargin: '-15% 0px -15% 0px',
        threshold: 0.15,
      }
    )

    for (let i = 0; i < items.length; i += 1) {
      const el = rowElsRef.current[i]
      if (el) obs.observe(el)
    }

    return () => obs.disconnect()
  }, [items.length])

  // progress widget removed

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-[#fbfbfc]',
          '[background-image:repeating-linear-gradient(to_right,rgba(0,0,0,0.04)_0,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_64px),repeating-linear-gradient(to_bottom,rgba(0,0,0,0.04)_0,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_64px),radial-gradient(1200px_650px_at_50%_0%,rgba(0,0,0,0.02),transparent_68%),radial-gradient(900px_700px_at_50%_100%,rgba(0,0,0,0.04),transparent_70%)]'
        )}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.28em] text-black/60 backdrop-blur">
          <Briefcase className="size-3.5 text-black/50" aria-hidden="true" />
          <span className="uppercase">Time Tunnel</span>
        </div>

        <h2 className="m-0 mt-6 text-[clamp(38px,6vw,56px)] leading-[1.02] tracking-[-0.02em] font-medium">
          experience.
        </h2>

        <p className="m-0 mt-5 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-base">
          Roles, impact, and outcomes — rendered as a scroll-driven timeline.
        </p>

        <div className="relative mt-14">
          <div>
            {items.map((item, idx) => {
              const isActive = idx === activeIndex
              const isEven = idx % 2 === 0
              const side: 'left' | 'right' | 'single' = isEven ? 'left' : 'right'

              return (
                <div
                  key={item.id}
                  ref={setRowRef(idx)}
                  className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-x-4 py-10 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-8 md:py-14"
                  data-index={idx}
                  data-active={isActive ? 'true' : 'false'}
                  data-inview={inView[idx] ? 'true' : 'false'}
                >
                  <div className={cn('col-start-2 md:col-start-1', isEven && 'md:justify-self-end md:pr-8')}>
                    {isEven ? (
                      <TimelineCard
                        item={item}
                        active={isActive}
                        reduceMotion={reduceMotion}
                        inView={inView[idx]}
                        side={side}
                      />
                    ) : (
                      <div aria-hidden="true" className="hidden md:block" />
                    )}
                  </div>

                  <div className="col-start-1 row-start-1 relative flex self-stretch justify-center md:col-start-2">
                    <div className="relative flex h-full w-full justify-start md:justify-center">
                      <div
                        aria-hidden="true"
                        className="absolute top-0 bottom-0 left-[12px] w-px bg-black/10 md:left-1/2 md:-translate-x-1/2"
                      />
                      <div
                        aria-hidden="true"
                        className={cn(
                          'relative z-10 mt-2 size-3 rounded-full border transition-[transform,box-shadow,background-color,border-color] duration-200',
                          'ml-[12px] -translate-x-1/2 bg-[#d1d5db] border-[#e5e7eb] md:ml-0 md:translate-x-0',
                          isActive &&
                            cn(
                              'bg-[#111827] border-[#111827] shadow-[0_0_0_6px_rgba(17,24,39,0.12)]',
                              !reduceMotion && 'scale-110'
                            )
                        )}
                      />
                    </div>
                  </div>

                  <div className={cn('col-start-2 md:col-start-3', !isEven && 'md:justify-self-start md:pl-8')}>
                    {!isEven ? (
                      <TimelineCard
                        item={item}
                        active={isActive}
                        reduceMotion={reduceMotion}
                        inView={inView[idx]}
                        side={side}
                      />
                    ) : (
                      <div aria-hidden="true" className="hidden md:block" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      
    </section>
  )
}
