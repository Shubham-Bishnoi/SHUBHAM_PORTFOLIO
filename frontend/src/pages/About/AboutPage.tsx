import { Container } from '@/components/Layout/Container'
import { PageTitle } from '@/components/UI/PageTitle'
import { Section } from '@/components/UI/Section'
import { TwoCol } from '@/components/UI/TwoCol'
import { useProfile } from '@/hooks/useProfile'

import './AboutPage.css'

function normalizeUrl(raw: string): string {
  return raw.replaceAll('`', '').trim()
}

function subtitleFromSummary(summary: string[]): string {
  return summary.slice(0, 2).join(' ')
}

export function AboutPage() {
  const state = useProfile()

  if (state.kind === 'loading') {
    return (
      <main className="pageRoot">
        <Container>
          <PageTitle title="about." subtitle="Loading…" />
        </Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className="pageRoot">
        <Container>
          <PageTitle title="about." subtitle="Could not load profile." />
        </Container>
      </main>
    )
  }

  const p = state.profile
  const linkedin = normalizeUrl(p.basics.links.linkedin)
  const github = normalizeUrl(p.basics.links.github)

  return (
    <main className="pageRoot">
      <Container>
        <PageTitle title="about." subtitle={subtitleFromSummary(p.basics.summary)} />

        <TwoCol
          left={
            <>
              <ul className="bullets">
                {p.basics.summary.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <div className="inlineLinks" aria-label="Contact links">
                <a href={`mailto:${p.basics.email}`}>{p.basics.email}</a>
                <span className="dot" aria-hidden="true">
                  ·
                </span>
                <a href={`tel:${p.basics.phone}`}>{p.basics.phone}</a>
                <span className="dot" aria-hidden="true">
                  ·
                </span>
                <a href={linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <span className="dot" aria-hidden="true">
                  ·
                </span>
                <a href={github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </>
          }
          right={
            <div className="edu">
              {p.education.map((e, i) => (
                <div key={i} className="eduItem">
                  <div className="eduProgram">{e.program}</div>
                  <div className="eduMeta">
                    {e.institution} · {e.location}
                  </div>
                  <div className="eduMeta">
                    {'years' in e && e.years ? e.years : e.year} · {e.score}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <Section title="Skills">
          <div className="skillsGrid">
            {Object.entries(p.skills).map(([k, vals]) => (
              <div key={k} className="skillBlock">
                <div className="skillTitle">{k.replaceAll('_', ' ')}</div>
                <div className="skillList">{vals.join(', ')}</div>
              </div>
            ))}
          </div>
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

        <Section title="Coding">
          <div className="codingRow">
            <div>
              <div className="codingLabel">LeetCode</div>
              <div className="codingValue">
                {p.coding.leetcode.handle} · {p.coding.leetcode.solved}
              </div>
            </div>
            <div>
              <div className="codingLabel">GeeksforGeeks</div>
              <div className="codingValue">
                {p.coding.geeksforgeeks.handle} · {p.coding.geeksforgeeks.solved}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  )
}

