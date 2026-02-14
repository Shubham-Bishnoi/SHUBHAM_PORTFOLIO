import { useEffect, useMemo, useRef, useState } from 'react'

import './SkillsAvalanche.css'

import { buildSkillItems, CAT_COLOR, normalizeCategory, type SkillsByCategory } from './skillsAvalancheTheme'
import { useSkillsAvalanchePhysics } from './useSkillsAvalanchePhysics'

type Props = {
  skills: SkillsByCategory
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export function SkillsAvalanche({ skills }: Props) {
  const arenaRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const sourceRef = useRef<HTMLUListElement | null>(null)

  const [gravityOn, setGravityOn] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion())

  const api = useSkillsAvalanchePhysics({ enabled: !reduceMotion, arenaRef, sceneRef, sourceRef })

  const skillItems = useMemo(() => buildSkillItems(skills), [skills])

  const grouped = useMemo(() => {
    const m = new Map<string, string[]>()
    for (const { cat, text } of skillItems) {
      const arr = m.get(cat) ?? []
      arr.push(text)
      m.set(cat, arr)
    }
    return Array.from(m.entries())
  }, [skillItems])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    api.setGravity(gravityOn)
  }, [api, gravityOn])

  if (reduceMotion) {
    return (
      <div className="skillsAvalancheStatic" aria-label="Skills">
        <div className="skillsAvalancheStaticNote">Reduced motion enabled — showing a static skills layout.</div>
        <div className="skillsAvalancheStaticGrid">
          {grouped.map(([cat, vals]) => (
            <div key={cat} className="skillsAvalancheStaticBlock">
              <div className="skillsAvalancheStaticTitle">{cat.replace(/_/g, ' ')}</div>
              <div className="skillsAvalancheStaticPills">
                {vals.map((t) => (
                  <span
                    key={t}
                    className="skillsAvalancheStaticPill"
                    style={{ background: (CAT_COLOR[cat] ?? CAT_COLOR.misc).bg, borderColor: (CAT_COLOR[cat] ?? CAT_COLOR.misc).border }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="skillsAvalanche" aria-label="Skills Avalanche">
      <div ref={arenaRef} className="skillsAvalancheArena" onPointerDown={api.unlockAudio}>
        <div className="skillsAvalancheUi" aria-hidden="false">
          <div className="skillsAvalancheTitleRow">
            <div>
              <div className="skillsAvalancheTitle">Skills Avalanche</div>
              <div className="skillsAvalancheSubtitle">Drag and throw pills. Toggle gravity or explode the stack.</div>
            </div>
            <div className="skillsAvalancheControls">
              <button
                type="button"
                className="skillsAvalancheBtn"
                onClick={() => {
                  api.unlockAudio()
                  setGravityOn((g) => !g)
                }}
              >
                {gravityOn ? 'Zero Gravity' : 'Restore Gravity'}
              </button>
              <button
                type="button"
                className="skillsAvalancheBtn"
                onClick={() => {
                  api.unlockAudio()
                  api.explode()
                }}
              >
                Explode
              </button>
              <button
                type="button"
                className="skillsAvalancheBtn"
                onClick={() => {
                  api.unlockAudio()
                  api.reset()
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div ref={sceneRef} className="skillsAvalancheScene" />

        <ul ref={sourceRef} className="skillsAvalancheSource" aria-hidden="true">
          {Object.entries(skills).flatMap(([cat, vals]) =>
            vals.map((t) => (
              <li key={`${cat}:${t}`} data-cat={normalizeCategory(cat)}>
                {t}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}

