import { useId, useMemo } from 'react'

type Props = {
  enabled: boolean
  intensity: number
  onEnabledChange: (next: boolean) => void
  onIntensityChange: (next: number) => void
}

export function MakeItPopPanel({ enabled, intensity, onEnabledChange, onIntensityChange }: Props) {
  const checkboxId = useId()
  const rangeId = useId()
  const strengthLabel = useMemo(() => {
    if (intensity < 34) return 'Low'
    if (intensity < 67) return 'Medium'
    return 'High'
  }, [intensity])

  return (
    <section className="popPanel" aria-label="Decorative controls">
      <div className="popPanelHeader">Make it pop</div>

      <label className="popRow" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
        />
        <span className="popRowLabel">Make it pop</span>
      </label>

      <div className="popRow" style={{ alignItems: 'flex-start' }}>
        <label className="popRowLabel" htmlFor={rangeId}>
          Shadow
        </label>
        <div style={{ flex: 1 }}>
          <input
            id={rangeId}
            type="range"
            min={0}
            max={100}
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
          />
          <div className="popHint">{strengthLabel}</div>
        </div>
      </div>

      <div className="popSamples" aria-hidden="true">
        <div className={enabled ? 'popSampleCard popSampleCardOn' : 'popSampleCard'}>
          <div className="popSampleMedia" />
          <div className="popSampleText">
            <div className="popSampleTitle">Sample</div>
            <div className="popSampleMeta">Card preview</div>
          </div>
        </div>
        <div className={enabled ? 'popSampleCard popSampleCardOn popSampleCardOffset' : 'popSampleCard popSampleCardOffset'}>
          <div className="popSampleMedia" />
          <div className="popSampleText">
            <div className="popSampleTitle">Sample</div>
            <div className="popSampleMeta">Card preview</div>
          </div>
        </div>
      </div>
    </section>
  )
}

