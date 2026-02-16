import { useMemo, useState } from 'react'

import { MakeItPopPanel } from '@/components/Projects/MakeItPopPanel'
import { ProjectGrid } from '@/components/Projects/ProjectGrid'
import { ExpandableProjectRow } from '@/components/Projects/ExpandableProjectRow'
import { ProjectGridRow } from '@/components/Projects/ProjectGridRow'
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
              const featuredSorted = projectsState.projects
                .filter((p) => typeof p.featuredRank === 'number')
                .slice()
                .sort((a, b) => {
                  const ar = typeof a.featuredRank === 'number' ? a.featuredRank : 999
                  const br = typeof b.featuredRank === 'number' ? b.featuredRank : 999
                  return ar - br
                })
              const featuredProjects = featuredSorted.slice(0, 6)
              const shortLabelsByName: Record<string, string> = {
                'Adaptive Deception Mesh': 'Deception Mesh',
                'Agentic AI Secretary (Secbot AI)': 'Secbot AI',
                'Multi-Agent Meeting Summarisation & Action Tracking': 'Meeting Intel',
                'Recruitment Orchestrator & Workflow': 'Hiring Ops',
                'Target: AI-Agent Document Processing System': 'Doc Agent',
                'Supplier–Treasury Digital Twin': 'Treasury Twin',
              }

              for (const p of featuredProjects) {
                const shortLabel = shortLabelsByName[p.name]
                if (shortLabel) p.shortLabel = shortLabel
              }

              const featuredSlugs = new Set(featuredProjects.map((p) => p.slug))
              const allUseCaseProjects = projectsState.projects.filter((p) => !featuredSlugs.has(p.slug)).slice(0, 11)

              if (!featuredProjects.length) {
                return <ProjectGrid projects={projectsState.projects} pop={pop} />
              }

              const featuredRow1 = featuredProjects.slice(0, 3)
              const featuredRow2 = featuredProjects.slice(3, 6)

              const useCaseRow1 = allUseCaseProjects.slice(0, 4)
              const useCaseRow2 = allUseCaseProjects.slice(4, 8)
              const useCaseRow3 = allUseCaseProjects.slice(8, 11)

              return (
                <div className="projectsGroups">
                  <section className="projectsGroup">
                    <div className="projectsGroupHeading">Featured</div>
                    <ExpandableProjectRow projects={featuredRow1} defaultActiveIndex={0} autoRotate rotateMs={3000} />
                    <ExpandableProjectRow projects={featuredRow2} defaultActiveIndex={0} autoRotate rotateMs={3000} />
                  </section>

                  <section className="projectsGroup projectsGroupTight">
                    <div className="projectsGroupHeading">All use cases</div>
                    <ProjectGridRow projects={useCaseRow1} pop={pop} columns={{ base: 1, md: 2, lg: 4 }} />
                    <ProjectGridRow projects={useCaseRow2} pop={pop} columns={{ base: 1, md: 2, lg: 4 }} />
                    <ProjectGridRow projects={useCaseRow3} pop={pop} columns={{ base: 1, md: 2, lg: 3 }} />
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
