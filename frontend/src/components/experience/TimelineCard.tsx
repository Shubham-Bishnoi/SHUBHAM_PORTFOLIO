import { Briefcase, Calendar, ExternalLink, GraduationCap, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { TimelineItem } from '@/data/timeTunnel'

type Props = {
  item: TimelineItem
  active: boolean
  reduceMotion: boolean
  inView: boolean
  side: 'left' | 'right' | 'single'
}

export function TimelineCard({ item, active, reduceMotion, inView, side }: Props) {
  const Icon = item.icon === 'graduation' ? GraduationCap : Briefcase
  const directionClass =
    side === 'left'
      ? 'md:-translate-x-2'
      : side === 'right'
        ? 'md:translate-x-2'
        : ''

  return (
    <article
      className={cn(
        'relative w-full rounded-3xl border bg-white/5 p-6 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.32)] transition-[transform,opacity,box-shadow,border-color] duration-300',
        'border-white/10',
        !reduceMotion && 'will-change-transform',
        inView
          ? 'opacity-100 translate-y-0'
          : cn('opacity-0 translate-y-3', !reduceMotion && directionClass),
        reduceMotion && 'transform-none transition-none',
        active &&
          cn(
            'border-white/15 shadow-[0_18px_55px_rgba(0,0,0,0.45)]',
            !reduceMotion && 'scale-[1.01]'
          )
      )}
      data-active={active ? 'true' : 'false'}
    >
      <div className="flex gap-4">
        <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/70">
          <Icon className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-tight tracking-tight text-white sm:text-lg">
            {item.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
            {item.orgUrl ? (
              <a
                href={item.orgUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-1 py-0.5 transition hover:bg-white/10"
              >
                <span className="font-medium text-white/85">{item.org}</span>
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span className="font-medium text-white/85">{item.org}</span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span className="tabular-nums">{item.dateLabel}</span>
            </span>
            {item.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden="true" />
                <span>{item.location}</span>
              </span>
            ) : null}
          </div>

          {item.bullets.length > 0 ? (
            <ul className="m-0 mt-4 list-none space-y-2 p-0 text-sm leading-relaxed text-white/70">
              {item.bullets.map((b, idx) => (
                <li key={`${item.id}-b-${idx}`} className="flex gap-2">
                  <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {item.tags && item.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={`${item.id}-t-${t}`}
                  className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
