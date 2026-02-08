import './Timeline.css'

export type TimelineItem = {
  heading: string
  meta?: string
  bullets?: string[]
}

type Props = {
  items: TimelineItem[]
}

export function Timeline({ items }: Props) {
  return (
    <ol className="timeline">
      {items.map((it, idx) => (
        <li className="timelineItem" key={`${it.heading}-${idx}`}>
          <div className="timelineRail" aria-hidden="true" />
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{it.heading}</div>
            {it.meta ? <div className="timelineMeta">{it.meta}</div> : null}
            {it.bullets?.length ? (
              <ul className="timelineBullets">
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

