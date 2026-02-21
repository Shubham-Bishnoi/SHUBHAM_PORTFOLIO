import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'
import { ProjectNav } from '@/components/Projects/ProjectNav'
import type { Project } from '@/lib/api'

import styles from './ProjectArticlePage.module.css'

type Props = {
  project: Project
  nextSlug: string | null
}

function sectionByHeading(project: Project, heading: string) {
  return project.caseStudy.sections.find((s) => s.heading.trim().toLowerCase() === heading.trim().toLowerCase()) ?? null
}

function clampLines(lines: string[], max: number) {
  if (lines.length <= max) return { lines, clamped: false }
  return { lines: lines.slice(0, max), clamped: true }
}

function extractTechChips(project: Project): string[] {
  if (project.tags && project.tags.length) return project.tags

  const src = sectionByHeading(project, 'Tech Stack (AI-Focused Breakdown)')?.body ?? []
  const picked = new Set<string>()
  for (const line of src) {
    const rest = line.includes(':') ? line.split(':').slice(1).join(':') : line
    const parts = rest
      .replace(/\(/g, ' ')
      .replace(/\)/g, ' ')
      .split(/[,/;+]| via | with | for | \+ /gi)
      .map((p) => p.trim())
      .filter(Boolean)

    for (const p of parts) {
      const clean = p.replace(/\s+/g, ' ').trim()
      if (!clean) continue
      if (clean.length > 28) continue
      if (/^\d+$/.test(clean)) continue
      picked.add(clean)
      if (picked.size >= 12) return Array.from(picked)
    }
  }
  return Array.from(picked)
}

function heroImage(project: Project): string | null {
  const fromHero = project.hero.collage?.[0]
  if (fromHero) return fromHero
  const fromThumb = project.thumbnail
  if (fromThumb) return fromThumb
  return null
}

function resourceLinks(project: Project) {
  const links = project.links ?? {}
  const github = links.github
  const demo = links.demo
  const docs = links.docs
  return { github, demo, docs }
}

export function ProjectArticlePage({ project, nextSlug }: Props) {
  const [overviewExpanded, setOverviewExpanded] = useState(false)
  const [techExpanded, setTechExpanded] = useState(false)
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(false)

  const overview = project.caseStudy.intro || project.short
  const showOverviewToggle = overview.trim().length > 200

  const techChips = useMemo(() => extractTechChips(project), [project])

  const business = sectionByHeading(project, 'Business-Focused Description')
  const tech = sectionByHeading(project, 'Tech Stack (AI-Focused Breakdown)')
  const capabilities = sectionByHeading(project, 'Unique Capabilities Demonstrated')
  const highlights = project.caseStudy.highlights?.slice(0, 3) ?? []

  const { github, demo, docs } = resourceLinks(project)
  const hasResources = Boolean(github || demo || docs)

  const heroSrc = heroImage(project)

  const techList = clampLines(tech?.body ?? [], 6)
  const capabilitiesList = clampLines(capabilities?.body ?? [], 6)

  return (
    <main className={styles.page}>
      <header className={styles.hero} style={heroSrc ? ({ ['--hero-image' as never]: `url(${heroSrc})` } as never) : undefined}>
        <div className={styles.heroInner}>
          <Container>
            <div className={styles.topRow}>
              <Link to="/projects" className={styles.backLink}>
                Back to portfolio
              </Link>
              <ProjectNav nextSlug={nextSlug} />
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroTextCol}>
                <div className={styles.kicker}>
                  <span>{project.category}</span>
                  <span aria-hidden="true" className={styles.kickerDot} />
                  <span>{project.dateLabel}</span>
                </div>

                <h1 className={styles.h1}>{project.name}</h1>

                <p className={overviewExpanded ? styles.overviewExpanded : styles.overview} data-expanded={overviewExpanded ? '1' : '0'}>
                  {overview}
                </p>

                {showOverviewToggle ? (
                  <button
                    type="button"
                    className={styles.inlineBtn}
                    onClick={() => setOverviewExpanded((v) => !v)}
                    aria-expanded={overviewExpanded}
                  >
                    {overviewExpanded ? 'Show less' : 'Read more'}
                  </button>
                ) : null}

                {techChips.length ? (
                  <div className={styles.chipsRow} aria-label="Tech stack">
                    {techChips.slice(0, 12).map((t) => (
                      <span key={t} className={styles.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      </header>

      <Container className={styles.articleContainer}>
        <article className={styles.article}>
          {business ? (
            <section className={styles.section}>
              <h2 className={styles.h2}>Business-Focused Description</h2>
              <ul className={styles.list}>
                {business.body.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {tech ? (
            <section className={styles.section}>
              <div className={styles.sectionTopRow}>
                <h2 className={styles.h2}>Tech Stack (AI-Focused Breakdown)</h2>
                {techList.clamped ? (
                  <button
                    type="button"
                    className={styles.inlineBtn}
                    onClick={() => setTechExpanded((v) => !v)}
                    aria-expanded={techExpanded}
                  >
                    {techExpanded ? 'Show less' : 'Show all'}
                  </button>
                ) : null}
              </div>
              <ul className={styles.list}>
                {(techExpanded ? tech.body : techList.lines).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {capabilities ? (
            <section className={styles.section}>
              <div className={styles.sectionTopRow}>
                <h2 className={styles.h2}>Unique Capabilities Demonstrated</h2>
                {capabilitiesList.clamped ? (
                  <button
                    type="button"
                    className={styles.inlineBtn}
                    onClick={() => setCapabilitiesExpanded((v) => !v)}
                    aria-expanded={capabilitiesExpanded}
                  >
                    {capabilitiesExpanded ? 'Show less' : 'Show all'}
                  </button>
                ) : null}
              </div>
              <ul className={styles.list}>
                {(capabilitiesExpanded ? capabilities.body : capabilitiesList.lines).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {highlights.length ? (
            <section className={styles.section}>
              <h2 className={styles.h2}>Highlights</h2>
              <div className={styles.highlightsBox} role="list">
                {highlights.map((h) => (
                  <div key={h} className={styles.highlightCard} role="listitem">
                    {h}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {hasResources ? (
            <section className={styles.section}>
              <h2 className={styles.h2}>Resources</h2>
              <div className={styles.resources}>
                {github ? (
                  <a className={styles.resourceLink} href={github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
                {demo ? (
                  <a className={styles.resourceLink} href={demo} target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                ) : null}
                {docs ? (
                  <a className={styles.resourceLink} href={docs} target="_blank" rel="noreferrer">
                    Docs
                  </a>
                ) : null}
              </div>
            </section>
          ) : null}
        </article>
      </Container>
    </main>
  )
}
