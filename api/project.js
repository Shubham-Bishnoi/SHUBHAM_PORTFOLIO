import fs from 'node:fs/promises'
import path from 'node:path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false })
  }

  const slug = typeof req.query?.slug === 'string' ? req.query.slug : ''
  if (!slug) {
    return res.status(400).json({ detail: 'Missing slug' })
  }

  try {
    const profilePath = path.join(process.cwd(), 'backend', 'app', 'data', 'profile.json')
    const raw = await fs.readFile(profilePath, 'utf8')
    const profile = JSON.parse(raw)
    const projects = Array.isArray(profile?.projects) ? profile.projects : []

    const found = projects.find((p) => p?.slug === slug)
    if (!found) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.status(404).send(JSON.stringify({ detail: 'Not found' }))
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.status(200).send(JSON.stringify(found))
  } catch {
    return res.status(500).json({ ok: false })
  }
}

