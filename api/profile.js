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
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).send(raw)
  } catch {
    res.status(500).json({ ok: false })
  }
}

