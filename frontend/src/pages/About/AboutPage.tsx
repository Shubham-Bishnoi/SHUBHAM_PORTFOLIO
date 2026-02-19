import { AboutHeroDark } from '@/components/About/AboutHeroDark'
import { Container } from '@/components/Layout/Container'
import { Footer } from '@/components/Layout/Footer'
import { Section } from '@/components/UI/Section'
import { SkillsAvalanche } from '@/components/About/SkillsAvalanche'
import { MyStorySection } from '@/components/About/MyStorySection'
import { CodingSection } from '@/components/About/CodingSection'
import { useProfile } from '@/hooks/useProfile'

import './AboutPage.css'

export function AboutPage() {
  const state = useProfile()

  if (state.kind === 'loading') {
    return (
      <>
        <main className="pb-[84px]">
          <AboutHeroDark />
          <Container className="pt-10">
            <div style={{ color: 'var(--muted)' }}>Loading…</div>
          </Container>
        </main>
        <Footer />
      </>
    )
  }

  if (state.kind === 'error') {
    return (
      <>
        <main className="pb-[84px]">
          <AboutHeroDark />
          <Container className="pt-10">
            <div style={{ color: 'var(--muted)' }}>Could not load profile.</div>
          </Container>
        </main>
        <Footer />
      </>
    )
  }

  const p = state.profile

  return (
    <>
      <main className="pb-[84px]">
        <AboutHeroDark />
        <Container className="pt-10">
          <Section title="Skills">
            <SkillsAvalanche skills={p.skills} />
          </Section>

          <Section title="Awards">
            <ul className="bullets">
              {p.awards.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Section>

          <Section title="Leadership">
            <ul className="bullets">
              {p.leadership.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </Section>

          <MyStorySection />
          <CodingSection id="coding" />
        </Container>
      </main>
      <Footer />
    </>
  )
}
