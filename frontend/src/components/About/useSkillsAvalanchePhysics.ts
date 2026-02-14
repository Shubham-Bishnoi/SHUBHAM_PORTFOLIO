import { useCallback, useEffect, useRef, type RefObject } from 'react'
import * as Matter from 'matter-js'
import type { SkillItem } from './skillsAvalancheTheme'
import { CAT_COLOR, normalizeCategory } from './skillsAvalancheTheme'
type Refs = { arenaRef: RefObject<HTMLDivElement | null>; sceneRef: RefObject<HTMLDivElement | null>; sourceRef: RefObject<HTMLUListElement | null> }
type Api = { unlockAudio: () => void; setGravity: (on: boolean) => void; explode: () => void; reset: () => void }
function readSkillsFromSource(sourceRef: RefObject<HTMLUListElement | null>): SkillItem[] {
  const ul = sourceRef.current
  if (!ul) return []
  return Array.from(ul.querySelectorAll('li'))
    .map((li) => ({ text: (li.textContent ?? '').trim(), cat: normalizeCategory(li.dataset.cat ?? 'misc') }))
    .filter((x) => x.text.length > 0)
}
function createWalls(engine: Matter.Engine, w: number, h: number) {
  const t = 120
  const spawnH = 2600
  for (const b of Matter.Composite.allBodies(engine.world)) {
    if (b.label === 'wall' || b.label === 'floor') Matter.Composite.remove(engine.world, b)
  }
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(w / 2, h + t / 2, w, t, { isStatic: true, label: 'floor', friction: 0.5 }),
    Matter.Bodies.rectangle(-t / 2, h - (h + spawnH) / 2, t, h + spawnH, { isStatic: true, label: 'wall', friction: 0 }),
    Matter.Bodies.rectangle(w + t / 2, h - (h + spawnH) / 2, t, h + spawnH, { isStatic: true, label: 'wall', friction: 0 }),
  ])
}
function applyTextContrast(el: HTMLDivElement) {
  const rgb = window.getComputedStyle(el).backgroundColor.match(/\d+/g)
  if (!rgb) return
  const [r, g, b] = rgb.map(Number)
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000)
  el.style.color = brightness < 120 ? '#ffffff' : 'var(--text)'
}
export function useSkillsAvalanchePhysics({ enabled, arenaRef, sceneRef, sourceRef }: { enabled: boolean } & Refs): Api {
  const engineRef = useRef<Matter.Engine | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const domPairsRef = useRef<Array<{ body: Matter.Body; elem: HTMLDivElement }>>([])
  const rafRef = useRef<number | null>(null)
  const initializedRef = useRef(false)
  const pausedRef = useRef(false)
  const gravityOnRef = useRef(true)
  const cleanupRef = useRef<null | (() => void)>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const audioUnlockedRef = useRef(false)
  function ensureAudio() {
    if (audioRef.current) return
    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (Ctx) audioRef.current = new Ctx()
  }
  function unlockAudio() {
    if (audioUnlockedRef.current) return
    ensureAudio()
    const ctx = audioRef.current
    if (!ctx) return
    audioUnlockedRef.current = true
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  }
  function playCollision(velocity: number) {
    const ctx = audioRef.current
    if (!ctx || !audioUnlockedRef.current) return
    const intensity = Math.max(0, Math.min(velocity / 16, 1))
    if (intensity < 0.12) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.type = 'sine'
    osc.frequency.setValueAtTime(240 + Math.random() * 220, now)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(intensity * 0.22, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11)
    osc.start(now)
    osc.stop(now + 0.13)
  }

  const startSyncLoop = useCallback(() => {
    if (rafRef.current) return
    const tick = () => {
      rafRef.current = window.requestAnimationFrame(tick)
      for (const { body, elem } of domPairsRef.current) {
        const { x, y } = body.position
        elem.style.transform = `translate(${x - elem.offsetWidth / 2}px, ${y - elem.offsetHeight / 2}px) rotate(${body.angle}rad)`
      }
    }
    rafRef.current = window.requestAnimationFrame(tick)
  }, [])

  const stopSyncLoop = useCallback(() => {
    if (!rafRef.current) return
    window.cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const pause = useCallback(() => {
    if (pausedRef.current) return
    pausedRef.current = true
    stopSyncLoop()
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current)
    if (renderRef.current) Matter.Render.stop(renderRef.current)
  }, [stopSyncLoop])

  const resume = useCallback(() => {
    if (!pausedRef.current) return
    pausedRef.current = false
    if (renderRef.current && engineRef.current) Matter.Render.run(renderRef.current)
    if (runnerRef.current && engineRef.current) Matter.Runner.run(runnerRef.current, engineRef.current)
    startSyncLoop()
  }, [startSyncLoop])

  const resize = useCallback(() => {
    const arenaEl = arenaRef.current
    const engine = engineRef.current
    const render = renderRef.current
    if (!arenaEl || !engine || !render) return
    const w = arenaEl.clientWidth
    const h = arenaEl.clientHeight
    render.canvas.width = w
    render.canvas.height = h
    render.options.width = w
    render.options.height = h
    createWalls(engine, w, h)
  }, [arenaRef])

  const spawnSkills = useCallback((items: SkillItem[]) => {
    const arenaEl = arenaRef.current
    const sceneEl = sceneRef.current
    const engine = engineRef.current
    if (!arenaEl || !sceneEl || !engine) return
    const w = arenaEl.clientWidth
    const pad = 34
    for (const { body, elem } of domPairsRef.current) {
      elem.remove()
      Matter.Composite.remove(engine.world, body)
    }
    domPairsRef.current = []

    for (const { text, cat } of items) {
      const x = Math.random() * (w - pad * 2) + pad
      const y = -Math.random() * 1400 - 220
      const boxWidth = Math.max(96, Math.round(text.length * 8.9 + 38))
      const boxHeight = 40
      const body = Matter.Bodies.rectangle(x, y, boxWidth, boxHeight, {
        angle: Math.random() * 0.5 - 0.25,
        restitution: 0.55,
        friction: 0.06,
        label: text,
      })
      const elem = document.createElement('div')
      elem.className = 'skillsAvalanchePill'
      elem.dataset.cat = cat
      elem.textContent = text
      elem.style.width = `${boxWidth}px`
      elem.style.height = `${boxHeight}px`
      const colors = CAT_COLOR[cat] ?? CAT_COLOR.misc
      elem.style.background = colors.bg
      elem.style.borderColor = colors.border
      sceneEl.appendChild(elem)
      domPairsRef.current.push({ body, elem })
      Matter.Composite.add(engine.world, body)
      requestAnimationFrame(() => applyTextContrast(elem))
    }
  }, [arenaRef, sceneRef])

  const initOnce = useCallback(() => {
    const arenaEl = arenaRef.current
    if (!arenaEl || initializedRef.current) return
    initializedRef.current = true

    const engine = Matter.Engine.create()
    engine.gravity.y = 1
    engineRef.current = engine

    const render = Matter.Render.create({
      element: arenaEl,
      engine,
      options: { width: arenaEl.clientWidth, height: arenaEl.clientHeight, wireframes: false, background: 'transparent' },
    })
    render.canvas.className = 'skillsAvalancheCanvas'
    renderRef.current = render
    Matter.Render.run(render)

    const runner = Matter.Runner.create()
    runnerRef.current = runner
    Matter.Runner.run(runner, engine)

    const mouse = Matter.Mouse.create(arenaEl)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Matter.Composite.add(engine.world, mouseConstraint)

    Matter.Events.on(engine, 'collisionStart', (event) => {
      if (!audioUnlockedRef.current) return
      for (const p of event.pairs.slice(0, 8)) {
        const a = p.bodyA.velocity ? Math.hypot(p.bodyA.velocity.x, p.bodyA.velocity.y) : 0
        const b = p.bodyB.velocity ? Math.hypot(p.bodyB.velocity.x, p.bodyB.velocity.y) : 0
        playCollision(a + b)
      }
    })

    resize()
    spawnSkills(readSkillsFromSource(sourceRef))
    startSyncLoop()

    const onResize = () => resize()
    const onVis = () => (document.hidden ? pause() : resume())
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    cleanupRef.current = () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [arenaRef, pause, resize, resume, sourceRef, spawnSkills, startSyncLoop])

  const destroy = useCallback(() => {
    stopSyncLoop()
    const engine = engineRef.current
    const render = renderRef.current
    const runner = runnerRef.current
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    if (runner) Matter.Runner.stop(runner)
    if (render) {
      Matter.Render.stop(render)
      render.canvas.remove()
    }
    if (engine) {
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
    for (const { elem } of domPairsRef.current) elem.remove()
    domPairsRef.current = []

    engineRef.current = null
    renderRef.current = null
    runnerRef.current = null
    initializedRef.current = false
    pausedRef.current = false

    if (audioRef.current) {
      audioRef.current.close().catch(() => {})
      audioRef.current = null
    }
    audioUnlockedRef.current = false
    gravityOnRef.current = true
  }, [stopSyncLoop])

  useEffect(() => {
    if (!enabled) return
    const arenaEl = arenaRef.current
    if (!arenaEl) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            initOnce()
            resume()
          } else {
            pause()
          }
        }
      },
      { threshold: 0.35, rootMargin: '120px 0px 120px 0px' }
    )
    io.observe(arenaEl)
    return () => {
      io.disconnect()
      destroy()
    }
  }, [arenaRef, destroy, enabled, initOnce, pause, resume])

  return {
    unlockAudio,
    setGravity: (on) => {
      gravityOnRef.current = on
      if (engineRef.current) engineRef.current.gravity.y = on ? 1 : 0
    },
    explode: () => {
      if (!engineRef.current) return
      for (const { body } of domPairsRef.current) {
        const f = 0.045 * body.mass
        const ang = Math.random() * Math.PI * 2
        Matter.Body.applyForce(body, body.position, { x: Math.cos(ang) * f, y: Math.sin(ang) * f })
      }
    },
    reset: () => {
      const engine = engineRef.current
      if (!engine) return
      engine.gravity.y = gravityOnRef.current ? 1 : 0
      resize()
      spawnSkills(readSkillsFromSource(sourceRef))
    },
  }
}
