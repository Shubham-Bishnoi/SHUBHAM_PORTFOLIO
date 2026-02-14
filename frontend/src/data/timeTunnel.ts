import type { Profile } from '@/lib/api'

export type TimelineItem = {
  id: string
  type: 'experience' | 'education'
  title: string
  org: string
  orgUrl?: string
  location?: string
  dateLabel: string
  bullets: string[]
  tags?: string[]
  icon?: 'briefcase' | 'graduation'
}

type BuildOptions = {
  includeEducation?: boolean
  includeEducationIfExperienceLessThan?: number
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function sortKeyFromDateLabel(label: string): number {
  if (/present/i.test(label)) return 9999
  const years = Array.from(label.matchAll(/(19|20)\d{2}/g)).map((m) => Number(m[0]))
  if (years.length === 0) return 0
  return Math.max(...years)
}

export function buildTimeTunnelItems(profile: Profile, options?: BuildOptions): TimelineItem[] {
  const includeEducationIfExperienceLessThan = options?.includeEducationIfExperienceLessThan ?? 10
  const includeEducation = options?.includeEducation ?? profile.experience.length < includeEducationIfExperienceLessThan

  const experienceItems: TimelineItem[] = profile.experience.map((e) => ({
    id: `exp-${slugify(`${e.company}-${e.title}-${e.dates}`)}`,
    type: 'experience',
    title: e.title,
    org: e.company,
    location: e.location,
    dateLabel: e.dates,
    bullets: e.highlights,
    icon: 'briefcase',
  }))

  const educationItems: TimelineItem[] = includeEducation
    ? profile.education.map((ed) => {
        const years = ed.years ?? ed.year ?? ''
        const bullets: string[] = []
        if (ed.score) bullets.push(`Score: ${ed.score}`)
        if (years) bullets.push(`Years: ${years}`)
        return {
          id: `edu-${slugify(`${ed.institution}-${ed.program}-${years}`)}`,
          type: 'education',
          title: ed.program,
          org: ed.institution,
          location: ed.location,
          dateLabel: years || '—',
          bullets,
          icon: 'graduation',
        }
      })
    : []

  const merged = [...experienceItems, ...educationItems]
    .map((item, idx) => ({ item, idx, key: sortKeyFromDateLabel(item.dateLabel) }))
    .sort((a, b) => {
      if (a.key !== b.key) return b.key - a.key
      return a.idx - b.idx
    })
    .map((x) => x.item)

  return merged
}

