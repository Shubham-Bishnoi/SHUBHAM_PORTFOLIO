import fs from 'node:fs/promises'
import path from 'node:path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ ok: false })
    return
  }

  try {
    const profilePath = path.join(process.cwd(), 'backend', 'app', 'data', 'profile.json')
    const raw = await fs.readFile(profilePath, 'utf8')
    const profile = JSON.parse(raw)

    const projects = Array.isArray(profile?.projects) ? profile.projects : []
    const featured = projects
      .filter((p) => Number.isInteger(p?.featuredRank))
      .sort((a, b) => (a.featuredRank ?? 1e9) - (b.featuredRank ?? 1e9))

    const rest = projects
      .filter((p) => !Number.isInteger(p?.featuredRank))
      .sort((a, b) => (a.useCaseId ?? 1e9) - (b.useCaseId ?? 1e9))

    const ordered = [...featured, ...rest]

    const cards = ordered.map((p) => ({
      useCaseId: p.useCaseId ?? null,
      featuredRank: p.featuredRank ?? null,
      slug: p.slug,
      name: p.name,
      category: p.category,
      dateLabel: p.dateLabel,
      short: p.short,
      thumbnail: p.thumbnail,
    }))

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).send(JSON.stringify(cards))
  } catch {
    res.status(500).json({ ok: false })
  }
}
