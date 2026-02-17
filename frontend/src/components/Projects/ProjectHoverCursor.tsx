import { cn } from '@/lib/utils'
import { useSmoothCursor } from '@/hooks/useSmoothCursor'

type Props = {
  active: boolean
  scale?: number
  size?: number
}

export function ProjectHoverCursor({ active, scale = 1, size = 60 }: Props) {
  const { enabled, visible, hasMoved, x, y } = useSmoothCursor(active, { lerp: 0.14 })

  if (!enabled) return null

  const tx = x - size / 2
  const ty = y - size / 2

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference transition-opacity duration-200',
        visible && hasMoved ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        width: size,
        height: size,
        transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
        willChange: 'transform',
      }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-white" />
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </div>
  )
}

