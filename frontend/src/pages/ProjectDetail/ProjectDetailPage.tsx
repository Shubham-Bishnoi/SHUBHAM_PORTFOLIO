import { Link, useParams } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'
import { ProjectCollage } from '@/components/Projects/ProjectCollage'
import { ProjectHero } from '@/components/Projects/ProjectHero'
import { ProjectNav } from '@/components/Projects/ProjectNav'
import { useProject } from '@/hooks/useProject'
import { useProjects } from '@/hooks/useProjects'

import './ProjectDetailPage.css'

function previewFromSections(sections: Array<{ body: string[] }>, maxParas: number): string[] {
  const out: string[] = []
  for (const s of sections) {
    for (const p of s.body) {
      out.push(p)
      if (out.length >= maxParas) return out
    }
  }
  return out
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const state = useProject(slug)
  const listState = useProjects()

  if (state.kind === 'loading') {
    return (
      <main className="projectDetailRoot">
        <Container>Loading...</Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className="projectNotFound">
        <Container>
          <div>Not found.</div>
          <div style={{ marginTop: 10 }}>
            <Link to="/projects">Back to portfolio</Link>
          </div>
        </Container>
      </main>
    )
  }

  if (state.kind === 'not_found') {
    return (
      <main className="projectNotFound">
        <Container>
          <div>Not found.</div>
          <div style={{ marginTop: 10 }}>
            <Link to="/projects">Back to portfolio</Link>
          </div>
        </Container>
      </main>
    )
  }

  const project = state.project
  const previewParagraphs = previewFromSections(project.caseStudy.sections, 3)

  const nextSlug = (() => {
    if (listState.kind !== 'ready') return null
    const idx = listState.projects.findIndex((p) => p.slug === project.slug)
    if (idx === -1) return null
    const next = listState.projects[(idx + 1) % listState.projects.length]
    if (!next || next.slug === project.slug) return null
    return next.slug
  })()

  return (
    <main className="projectDetailRoot">
      <Container>
        <div className="projectHero">
          <ProjectHero project={project} previewParagraphs={previewParagraphs} />
          <div>
            <ProjectCollage project={project} />
          </div>
          <ProjectNav nextSlug={nextSlug} />
        </div>

        <div className="projectContent">
          {project.caseStudy.sections.map((s, i) => (
            <section key={i} className="projectSection">
              <h2 className="projectSectionHeading">{s.heading}</h2>
              <div className="projectSectionBody">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {project.caseStudy.highlights && project.caseStudy.highlights.length ? (
            <section className="projectHighlights">
              <div className="projectHighlightsTitle">Highlights</div>
              <ul>
                {project.caseStudy.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </main>
  )
}

