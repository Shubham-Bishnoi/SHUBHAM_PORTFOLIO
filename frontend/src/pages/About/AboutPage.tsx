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
            <div className="max-w-[720px]">
              <h1 className="m-0 text-[clamp(38px,6vw,56px)] font-medium leading-[1.02] tracking-[-0.02em]">
                about.
              </h1>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
                <li className="list-none">
                  AI full-stack engineer focused on agentic systems + real-time automation
                </li>
                <li className="list-none">
                  FastAPI, React/Next.js, LangChain/LangGraph, RAG, vector search
                </li>
                <li className="list-none">Built enterprise use cases + stakeholder demos</li>
              </ul>
            </div>
            <div style={{ color: 'var(--muted)', marginTop: 24 }}>Loading…</div>
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
            <div className="max-w-[720px]">
              <h1 className="m-0 text-[clamp(38px,6vw,56px)] font-medium leading-[1.02] tracking-[-0.02em]">
                about.
              </h1>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
                <li className="list-none">
                  AI full-stack engineer focused on agentic systems + real-time automation
                </li>
                <li className="list-none">
                  FastAPI, React/Next.js, LangChain/LangGraph, RAG, vector search
                </li>
                <li className="list-none">Built enterprise use cases + stakeholder demos</li>
              </ul>
            </div>
            <div style={{ color: 'var(--muted)', marginTop: 24 }}>Could not load profile.</div>
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
          <div className="max-w-[720px]">
            <h1 className="m-0 text-[clamp(38px,6vw,56px)] font-medium leading-[1.02] tracking-[-0.02em]">
              about.
            </h1>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
              <li className="list-none">
                AI full-stack engineer focused on agentic systems + real-time automation
              </li>
              <li className="list-none">
                FastAPI, React/Next.js, LangChain/LangGraph, RAG, vector search
              </li>
              <li className="list-none">Built enterprise use cases + stakeholder demos</li>
            </ul>
          </div>

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
