import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { liquidMetalFragmentShader, ShaderMount } from 'https://esm.sh/@paper-design/shaders'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  const isProjectsPage = useMemo(() => location.pathname.startsWith('/projects'), [location.pathname])

  const style = useMemo(
    () =>
      ({
        position: 'fixed' as const,
        right: 18,
        bottom: 18,
        width: 62,
        height: 62,
        borderRadius: 999,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        zIndex: 9999,
      }),
    []
  )

  useEffect(() => {
    if (!isProjectsPage) {
      setShow(false)
      return
    }
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isProjectsPage])

  useEffect(() => {
    if (!show || !isProjectsPage) return
    const el = containerRef.current
    if (!el) return
    const mount = new ShaderMount(
      el,
      liquidMetalFragmentShader,
      {
        u_repetition: 1.5,
        u_softness: 0.5,
        u_shiftRed: 0.3,
        u_shiftBlue: 0.3,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 100,
        u_scale: 1.5,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      },
      undefined,
      0.6
    )
    return () => {
      if (mount && typeof mount.destroy === 'function') {
        mount.destroy()
      }
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
    }
  }, [show, isProjectsPage])

  if (!show || !isProjectsPage) return null

  return (
    <button
      type="button"
      style={style}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <div className="backToTopMetal">
        <div className="backToTopMetalOutline">
          <div ref={containerRef} className="backToTopLiquid" />
        </div>
        <span className="backToTopLabel">Top</span>
      </div>
    </button>
  )
}
