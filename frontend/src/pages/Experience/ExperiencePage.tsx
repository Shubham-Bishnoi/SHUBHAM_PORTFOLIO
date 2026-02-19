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
          <div className="text-sm" style={{ color: 'var(--muted)' }}>
            Loading…
          </div>
        </Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className="pageRoot">
        <Container>
          <div className="text-sm" style={{ color: 'var(--muted)' }}>
            Could not load profile.
          </div>
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
