export type SkillsByCategory = Record<string, string[]>

export type SkillItem = {
  text: string
  cat: string
}

const CAT_NORMALIZE: Record<string, string> = {
  ai_llm: 'ai',
  ai: 'ai',
}

export const CAT_COLOR: Record<string, { bg: string; border: string }> = {
  languages: { bg: 'rgba(59,163,255,0.18)', border: 'rgba(59,163,255,0.38)' },
  frontend: { bg: 'rgba(63,208,255,0.16)', border: 'rgba(63,208,255,0.36)' },
  backend: { bg: 'rgba(255,159,28,0.18)', border: 'rgba(255,159,28,0.38)' },
  ai: { bg: 'rgba(176,124,255,0.18)', border: 'rgba(176,124,255,0.38)' },
  data: { bg: 'rgba(0,199,159,0.18)', border: 'rgba(0,199,159,0.38)' },
  databases: { bg: 'rgba(255,80,120,0.18)', border: 'rgba(255,80,120,0.38)' },
  devops: { bg: 'rgba(100,220,120,0.18)', border: 'rgba(100,220,120,0.38)' },
  security: { bg: 'rgba(255,75,75,0.18)', border: 'rgba(255,75,75,0.38)' },
  misc: { bg: 'rgba(0,0,0,0.06)', border: 'rgba(0,0,0,0.16)' },
}

export function normalizeCategory(raw: string): string {
  const k = raw.toLowerCase().trim()
  return CAT_NORMALIZE[k] ?? k
}

export function buildSkillItems(skills: SkillsByCategory): SkillItem[] {
  const out: SkillItem[] = []
  for (const [cat, vals] of Object.entries(skills)) {
    const normalized = normalizeCategory(cat)
    for (const v of vals) out.push({ text: v, cat: normalized })
  }
  return out
}

