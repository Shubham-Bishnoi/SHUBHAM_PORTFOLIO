import fs from 'node:fs/promises'
import path from 'node:path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ ok: false })
    return
  }

  try {
    const slug = req.query?.slug
    if (typeof slug !== 'string' || !slug) {
      res.status(404).json({ detail: 'Not found' })
      return
    }

    const profilePath = path.join(process.cwd(), 'backend', 'app', 'data', 'profile.json')
    const raw = await fs.readFile(profilePath, 'utf8')
    const profile = JSON.parse(raw)
    const projects = Array.isArray(profile?.projects) ? profile.projects : []

    const project = projects.find((p) => p?.slug === slug)
    if (!project) {
      res.status(404).json({ detail: 'Not found' })
      return
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).send(JSON.stringify(project))
  } catch {
    res.status(500).json({ ok: false })
  }
}

