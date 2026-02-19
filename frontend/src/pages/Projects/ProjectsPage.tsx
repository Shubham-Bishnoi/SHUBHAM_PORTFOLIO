import { useEffect, useMemo } from 'react'

import CustomCursor from '@/components/CustomCursor'
import ProjectShowcase, { type ShowcaseProject } from '@/components/ProjectShowcase'
import { useProfile } from '@/hooks/useProfile'
import { useProjects } from '@/hooks/useProjects'

function condensedSummary(lines: string[]): string {
  if (!lines.length) return 'Selected work across products, agentic systems, and enterprise AI.'
  return lines.slice(0, 2).join(' ')
}

function extractYear(label: string): string {
  const match = label.match(/\b(19|20)\d{2}\b/)
  if (match) return match[0]
  return label
}

export function ProjectsPage() {
  const projectsState = useProjects()
  const profileState = useProfile()

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')
    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  const blurb = useMemo(() => {
    if (profileState.kind !== 'ready') return 'Building products across startups and enterprise teams, focused on measurable impact.'
    return condensedSummary(profileState.profile.basics.summary)
  }, [profileState])

  const projects = useMemo<ShowcaseProject[]>(() => {
    if (projectsState.kind !== 'ready') return []

    const sorted = projectsState.projects
      .slice()
      .sort((a, b) => {
        const ar = typeof a.featuredRank === 'number' ? a.featuredRank : 999
        const br = typeof b.featuredRank === 'number' ? b.featuredRank : 999
        return ar - br
      })

    return sorted.map((p) => ({
      id: p.slug,
      title: p.name,
      category: p.category,
      year: extractYear(p.dateLabel),
      image: p.thumbnail,
      link: `/projects/${p.slug}`,
      description: p.short,
    }))
  }, [projectsState])

  return (
    <main className="bg-black min-h-screen">
      <CustomCursor cursorSize={100} cursorColor="#F2E7D8" hoverScale={1.3} />

      {projectsState.kind === 'loading' ? <div className="text-white px-6 py-10">Loading...</div> : null}
      {projectsState.kind === 'error' ? <div className="text-white px-6 py-10">Not found.</div> : null}
      {projectsState.kind === 'ready' ? <ProjectShowcase projects={projects} title="portfolio." subtitle={blurb} /> : null}
    </main>
  )
}
