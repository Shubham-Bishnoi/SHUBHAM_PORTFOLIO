import { useEffect, useMemo, useState } from 'react'

export function BackToTop() {
  const [show, setShow] = useState(false)

  const style = useMemo(
    () =>
      ({
        position: 'fixed' as const,
        right: 18,
        bottom: 18,
        border: '1px solid var(--hairline)',
        background: 'rgba(255,255,255,0.92)',
        padding: '10px 12px',
        fontSize: 12,
        color: 'var(--text)',
        cursor: 'pointer',
      }),
    []
  )

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      style={style}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      Top
    </button>
  )
}

