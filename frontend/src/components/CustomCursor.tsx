import { ArrowUpRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type CustomCursorProps = {
  cursorSize?: number
  cursorColor?: string
  arrowColor?: string
  hoverScale?: number
}

function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(pointer: coarse)').matches
}

export default function CustomCursor({
  cursorSize = 100,
  cursorColor = 'rgba(255, 255, 255, 0.9)',
  arrowColor = '#000',
  hoverScale = 1.3,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const isHoveringRef = useRef(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const cursorPosition = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  const hoverSelectors = useMemo(
    () =>
      [
        'a',
        'button',
        '[role="button"]',
        '[data-cursor-hover]',
        '.cursor-pointer',
        '.project-card',
        '.projectCard',
      ].join(', '),
    []
  )

  useEffect(() => {
    const enabledNow = !isCoarsePointer()
    setEnabled(enabledNow)
    if (!enabledNow) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const onHoverEnter = () => {
      isHoveringRef.current = true
      setIsHovering(true)
    }
    const onHoverLeave = () => {
      isHoveringRef.current = false
      setIsHovering(false)
    }

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(hoverSelectors)
      elements.forEach((el) => {
        el.addEventListener('mouseenter', onHoverEnter)
        el.addEventListener('mouseleave', onHoverLeave)
      })
      return () => {
        elements.forEach((el) => {
          el.removeEventListener('mouseenter', onHoverEnter)
          el.removeEventListener('mouseleave', onHoverLeave)
        })
      }
    }

    const animate = () => {
      const ease = 0.15

      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * ease
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * ease

      if (cursorRef.current) {
        const scale = isHoveringRef.current ? hoverScale : 1
        const x = cursorPosition.current.x - cursorSize / 2
        const y = cursorPosition.current.y - cursorSize / 2

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    rafId.current = requestAnimationFrame(animate)

    let cleanupHover = attachHoverListeners()
    const observer = new MutationObserver(() => {
      cleanupHover()
      cleanupHover = attachHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)

      if (rafId.current) cancelAnimationFrame(rafId.current)
      observer.disconnect()
      cleanupHover()
    }
  }, [cursorSize, hoverScale, hoverSelectors])

  if (!enabled) return null

  const hoverStroke = '#F2E7D8'
  const hoverStrokeWidth = 4

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed left-0 top-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: cursorSize, height: cursorSize, willChange: 'transform' }}
    >
      {isHovering ? (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          shapeRendering="geometricPrecision"
          style={{ display: 'block' }}
        >
          <circle cx="50" cy="50" r="48" stroke={hoverStroke} strokeWidth={hoverStrokeWidth} />
          <path
            d="M34 66 L66 34 M46 34 H66 V54"
            stroke={hoverStroke}
            strokeWidth={hoverStrokeWidth}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={10}
          />
        </svg>
      ) : (
        <div
          className="h-full w-full rounded-full border-2 flex items-center justify-center transition-colors duration-300"
          style={{ borderColor: cursorColor, backgroundColor: 'transparent' }}
        >
          <ArrowUpRight size={cursorSize * 0.35} strokeWidth={2} style={{ color: cursorColor }} />
        </div>
      )}
    </div>
  )
}
