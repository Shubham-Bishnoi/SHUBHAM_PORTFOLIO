import { Container } from '@/components/Layout/Container'
import { ExperienceTimeTunnel } from '@/components/experience/ExperienceTimeTunnel'
import { buildTimeTunnelItems } from '@/data/timeTunnel'
import { useProfile } from '@/hooks/useProfile'

import './ExperiencePage.css'

export function ExperiencePage() {
  const state = useProfile()

  if (state.kind === 'loading') {
    return (
      <main className="pageRoot">
        <Container>
          <div className="text-sm text-black/60">Loading…</div>
        </Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className="pageRoot">
        <Container>
          <div className="text-sm text-black/60">Could not load profile.</div>
        </Container>
      </main>
    )
  }

  const items = buildTimeTunnelItems(state.profile)

  return (
    <main>
      <ExperienceTimeTunnel items={items} />
    </main>
  )
}
