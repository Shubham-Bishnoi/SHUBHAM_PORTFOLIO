import { useMemo, useState } from 'react'

import { MakeItPopPanel } from '@/components/Projects/MakeItPopPanel'
import { ProjectGrid } from '@/components/Projects/ProjectGrid'
import type { PopSettings } from '@/components/Projects/ProjectCard'
import { Container } from '@/components/Layout/Container'
import { useProfile } from '@/hooks/useProfile'
import { useProjects } from '@/hooks/useProjects'

import './ProjectsPage.css'

function condensedSummary(lines: string[]): string {
  if (!lines.length) return 'Selected work across products, agentic systems, and enterprise AI.'
  return lines.slice(0, 2).join(' ')
}

export function ProjectsPage() {
  const projectsState = useProjects()
  const profileState = useProfile()

  const [pop, setPop] = useState<PopSettings>({ enabled: false, intensity: 55 })

  const blurb = useMemo(() => {
    if (profileState.kind !== 'ready') return 'Building products across startups and enterprise teams, focused on measurable impact.'
    return condensedSummary(profileState.profile.basics.summary)
  }, [profileState])

  return (
    <main className="projectsRoot">
      <Container>
        <div className="projectsHero">
          <div>
            <h1 className="projectsH1">portfolio.</h1>
            <p className="projectsSubtitle">Check out some of my latest product / AI case studies.</p>
            <p className="projectsBlurb">{blurb}</p>
          </div>

          <MakeItPopPanel
            enabled={pop.enabled}
            intensity={pop.intensity}
            onEnabledChange={(enabled) => setPop((s) => ({ ...s, enabled }))}
            onIntensityChange={(intensity) => setPop((s) => ({ ...s, intensity }))}
          />
        </div>
      </Container>

      <div className="projectsSection">
        <Container>
          {projectsState.kind === 'loading' ? <div>Loading...</div> : null}
          {projectsState.kind === 'error' ? <div>Not found.</div> : null}
          {projectsState.kind === 'ready' ? (
            (() => {
              const featured = projectsState.projects.filter((p) => typeof p.featuredRank === 'number')
              const rest = projectsState.projects.filter((p) => typeof p.featuredRank !== 'number')

              if (!featured.length) {
                return <ProjectGrid projects={projectsState.projects} pop={pop} />
              }

              return (
                <div className="projectsGroups">
                  <section className="projectsGroup">
                    <div className="projectsGroupHeading">Featured</div>
                    <ProjectGrid projects={featured} pop={pop} />
                  </section>

                  <section className="projectsGroup projectsGroupTight">
                    <div className="projectsGroupHeading">All use cases</div>
                    <ProjectGrid projects={rest} pop={pop} />
                  </section>
                </div>
              )
            })()
          ) : null}
        </Container>
      </div>
    </main>
  )
}
