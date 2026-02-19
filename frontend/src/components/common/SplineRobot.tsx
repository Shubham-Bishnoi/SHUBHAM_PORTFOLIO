import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const SPLINE_VIEWER_SCRIPT_URL =
  'https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js'

const SPLINE_VIEWER_SCRIPT_ID = 'spline-viewer-script'

let splineScriptPromise: Promise<void> | null = null

function ensureSplineViewerScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (customElements.get('spline-viewer')) return Promise.resolve()

  if (splineScriptPromise) return splineScriptPromise

  const ensureCustomElement = async () => {
    if (customElements.get('spline-viewer')) return
    await import('@splinetool/viewer')
    if (!customElements.get('spline-viewer')) {
      throw new Error('Spline viewer did not register')
    }
  }

  splineScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SPLINE_VIEWER_SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      if (customElements.get('spline-viewer')) {
        resolve()
        return
      }

      const handleLoad = async () => {
        try {
          if (!customElements.get('spline-viewer')) await ensureCustomElement()
          resolve()
        } catch (err) {
          reject(err)
        }
      }
      const handleError = async () => {
        try {
          await ensureCustomElement()
          resolve()
        } catch (err) {
          reject(err)
        }
      }

      existing.addEventListener('load', handleLoad, { once: true })
      existing.addEventListener('error', handleError, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = SPLINE_VIEWER_SCRIPT_ID
    script.src = SPLINE_VIEWER_SCRIPT_URL
    script.type = 'module'
    script.defer = true
    script.crossOrigin = 'anonymous'

    script.addEventListener(
      'load',
      async () => {
        try {
          if (!customElements.get('spline-viewer')) await ensureCustomElement()
          resolve()
        } catch (err) {
          reject(err)
        }
      },
      { once: true }
    )
    script.addEventListener(
      'error',
      async () => {
        try {
          await ensureCustomElement()
          resolve()
        } catch (err) {
          reject(err)
        }
      },
      { once: true }
    )

    document.head.appendChild(script)
  }).catch((err) => {
    splineScriptPromise = null
    throw err
  })

  return splineScriptPromise
}

function stripSplineBranding(maxMs: number) {
  const startedAt = Date.now()
  const interval = window.setInterval(() => {
    if (Date.now() - startedAt > maxMs) {
      window.clearInterval(interval)
      return
    }

    const viewer = document.querySelector('spline-viewer') as (HTMLElement & {
      shadowRoot?: ShadowRoot
    }) | null

    const root = viewer?.shadowRoot
    if (!root) return

    viewer.style.background = 'transparent'

    const canvas = root.querySelector('canvas') as HTMLCanvasElement | null
    if (canvas) canvas.style.background = 'transparent'

    const logo = root.querySelector('#logo')
    if (logo) logo.remove()

    const builtWith = Array.from(root.querySelectorAll('a, div, span')).find((el) => {
      const text = (el.textContent ?? '').trim().toLowerCase()
      return text.includes('built with spline') || text === 'spline'
    })
    if (builtWith) builtWith.remove()

    if (logo || builtWith) window.clearInterval(interval)
  }, 250)

  return () => window.clearInterval(interval)
}

type Props = {
  sceneUrl: string
  className?: string
  'aria-label'?: string
}

export function SplineRobot({ sceneUrl, className, 'aria-label': ariaLabel }: Props) {
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  const shouldRender = typeof window !== 'undefined'

  useEffect(() => {
    if (!shouldRender) return

    let cancelled = false

    ensureSplineViewerScript()
      .then(() => {
        if (!cancelled) setIsReady(true)
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })

    return () => {
      cancelled = true
    }
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender || !isReady) return
    return stripSplineBranding(15000)
  }, [shouldRender, isReady, sceneUrl])

  if (!shouldRender) return null

  if (hasError) {
    return <div className={cn('h-full w-full rounded-2xl bg-white/5', className)} aria-hidden="true" />
  }

  if (!isReady) {
    return (
      <div
        className={cn(
          'h-full w-full animate-pulse rounded-2xl bg-white/5 [animation-duration:1.6s]',
          className
        )}
        aria-hidden="true"
      />
    )
  }

  return (
    <spline-viewer
      url={sceneUrl}
      aria-label={ariaLabel}
      className={cn('h-full w-full bg-transparent', className)}
    />
  )
}
