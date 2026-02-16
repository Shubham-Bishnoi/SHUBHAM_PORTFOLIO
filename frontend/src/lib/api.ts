export type Profile = {
  basics: {
    name: string
    fullName: string
    title: string
    location: string
    email: string
    phone: string
    links: {
      linkedin: string
      github: string
    }
    summary: string[]
  }
  education: Array<{
    program: string
    institution: string
    location: string
    score: string
    years?: string
    year?: string
  }>
  experience: Array<{
    company: string
    location: string
    title: string
    dates: string
    highlights: string[]
  }>
  projects: Array<{
    slug: string
    name: string
    category: string
    dateLabel: string
    short: string
    thumbnail: string
    hero: {
      collage: string[]
      badgeIcon: BadgeIcon
    }
    caseStudy: {
      intro: string
      sections: Array<{ heading: string; body: string[] }>
      highlights?: string[]
    }
  }>
  skills: Record<string, string[]>
  awards: string[]
  leadership: string[]
  coding: {
    leetcode: { handle: string; solved: string }
    geeksforgeeks: { handle: string; solved: string }
  }
}

export type BadgeIcon =
  | 'figma'
  | 'shield'
  | 'bots'
  | 'doc'
  | 'finance'
  | 'leaf'
  | 'brain'
  | 'gpu'
  | 'mic'
  | 'switch'
  | 'crowd'
  | 'chart'
  | 'users'
  | 'model'

export type ProjectCard = {
  useCaseId?: number
  featuredRank?: number | null
  slug: string
  name: string
  shortLabel?: string
  category: string
  dateLabel: string
  short: string
  thumbnail: string
}

export type Project = ProjectCard & {
  hero: {
    collage: string[]
    badgeIcon: BadgeIcon
  }
  caseStudy: {
    intro: string
    sections: Array<{ heading: string; body: string[] }>
    highlights?: string[]
  }
}

export class NotFoundError extends Error {
  name = 'NotFoundError'
}

function apiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (import.meta.env.DEV) return 'http://localhost:8000'
  return ''
}

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${apiBaseUrl()}/api/profile`)
  if (!res.ok) throw new Error('Failed to load profile')
  return (await res.json()) as Profile
}

export async function getProjects(): Promise<ProjectCard[]> {
  const res = await fetch(`${apiBaseUrl()}/api/projects`)
  if (!res.ok) throw new Error('Failed to load projects')
  return (await res.json()) as ProjectCard[]
}

export async function getProject(slug: string): Promise<Project> {
  const res = await fetch(`${apiBaseUrl()}/api/projects/${encodeURIComponent(slug)}`)
  if (res.status === 404) throw new NotFoundError('Not found')
  if (!res.ok) throw new Error('Failed to load project')
  return (await res.json()) as Project
}
