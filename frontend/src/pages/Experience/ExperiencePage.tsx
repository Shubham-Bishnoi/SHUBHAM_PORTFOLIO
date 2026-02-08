import { Container } from '@/components/Layout/Container'
import { PageTitle } from '@/components/UI/PageTitle'
import { Timeline } from '@/components/UI/Timeline'
import { useProfile } from '@/hooks/useProfile'

import './ExperiencePage.css'

export function ExperiencePage() {
  const state = useProfile()

  if (state.kind === 'loading') {
    return (
      <main className="pageRoot">
        <Container>
          <PageTitle title="experience." subtitle="Loading…" />
        </Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className="pageRoot">
        <Container>
          <PageTitle title="experience." subtitle="Could not load profile." />
        </Container>
      </main>
    )
  }

  const items = state.profile.experience.map((e) => ({
    heading: `${e.company} — ${e.title}`,
    meta: `${e.dates} · ${e.location}`,
    bullets: e.highlights,
  }))

  return (
    <main className="pageRoot">
      <Container>
        <PageTitle title="experience." subtitle="Where I've worked and what I shipped." />
        <Timeline items={items} />
      </Container>
    </main>
  )
}

