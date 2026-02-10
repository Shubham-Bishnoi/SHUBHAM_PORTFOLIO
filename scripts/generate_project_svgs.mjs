import fs from 'node:fs/promises'
import path from 'node:path'

function svgText(label, { width, height, fontSize }) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n  <rect width="${width}" height="${height}" fill="#E5E7EB"/>\n  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="#F3F4F6" stroke="#111111" stroke-opacity="0.14"/>\n  <text x="${Math.round(width / 2)}" y="${Math.round(height / 2)}" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" font-size="${fontSize}" fill="#111111" fill-opacity="0.55">${label}</text>\n</svg>\n`
}

async function main() {
  const repoRoot = process.cwd()
  const profilePath = path.join(repoRoot, 'backend', 'app', 'data', 'profile.json')
  const outRoot = path.join(repoRoot, 'frontend', 'public', 'projects')

  const raw = await fs.readFile(profilePath, 'utf8')
  const profile = JSON.parse(raw)
  const projects = Array.isArray(profile?.projects) ? profile.projects : []

  if (!projects.length) {
    throw new Error('No projects found in profile.json')
  }

  await fs.mkdir(outRoot, { recursive: true })

  const sizes = {
    thumb: { width: 960, height: 540, fontSize: 26 },
    '01': { width: 760, height: 1040, fontSize: 24 },
    '02': { width: 960, height: 640, fontSize: 26 },
    '03': { width: 960, height: 560, fontSize: 26 },
  }

  for (const p of projects) {
    const slug = typeof p?.slug === 'string' ? p.slug : ''
    if (!slug) continue

    const dir = path.join(outRoot, slug)
    await fs.mkdir(dir, { recursive: true })

    await fs.writeFile(path.join(dir, 'thumb.svg'), svgText(`${slug} • thumb`, sizes.thumb), 'utf8')
    await fs.writeFile(path.join(dir, '01.svg'), svgText(`${slug} • 01`, sizes['01']), 'utf8')
    await fs.writeFile(path.join(dir, '02.svg'), svgText(`${slug} • 02`, sizes['02']), 'utf8')
    await fs.writeFile(path.join(dir, '03.svg'), svgText(`${slug} • 03`, sizes['03']), 'utf8')
  }

  process.stdout.write(`Generated placeholder SVGs for ${projects.length} projects in ${outRoot}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

