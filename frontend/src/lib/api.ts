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
    name: string
    year: string
    tags: string[]
    impact: string[]
    links: { demo: string; github: string }
  }>
  skills: Record<string, string[]>
  awards: string[]
  leadership: string[]
  coding: {
    leetcode: { handle: string; solved: string }
    geeksforgeeks: { handle: string; solved: string }
  }
}

function apiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined
  return (fromEnv ?? 'http://localhost:8000').replace(/\/$/, '')
}

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${apiBaseUrl()}/api/profile`)
  if (!res.ok) throw new Error('Failed to load profile')
  return (await res.json()) as Profile
}

