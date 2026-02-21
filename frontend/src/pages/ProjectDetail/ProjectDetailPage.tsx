import { Link, useParams } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'
import { useProject } from '@/hooks/useProject'
import { useProjects } from '@/hooks/useProjects'

import { ProjectArticlePage } from './ProjectArticlePage'

import styles from './ProjectDetailPage.module.css'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const state = useProject(slug)
  const listState = useProjects()

  if (state.kind === 'loading') {
    return (
      <main className={styles.stateRoot}>
        <Container>Loading...</Container>
      </main>
    )
  }

  if (state.kind === 'error') {
    return (
      <main className={styles.stateRoot}>
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
      <main className={styles.stateRoot}>
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

  const nextSlug = (() => {
    if (listState.kind !== 'ready') return null
    const idx = listState.projects.findIndex((p) => p.slug === project.slug)
    if (idx === -1) return null
    const next = listState.projects[(idx + 1) % listState.projects.length]
    if (!next || next.slug === project.slug) return null
    return next.slug
  })()

  return <ProjectArticlePage project={project} nextSlug={nextSlug} />
}
