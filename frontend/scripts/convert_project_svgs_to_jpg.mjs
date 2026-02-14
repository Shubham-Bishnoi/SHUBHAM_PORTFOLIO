import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

import { Resvg } from '@resvg/resvg-js'

const execFileAsync = promisify(execFile)

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const out = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await walk(fullPath)))
      continue
    }
    out.push(fullPath)
  }
  return out
}

async function convertOne(svgPath) {
  const svg = await fs.readFile(svgPath, 'utf8')
  const resvg = new Resvg(svg, {
    background: 'white',
    fitTo: { mode: 'width', value: 1600 },
  })

  const pngData = resvg.render().asPng()
  const dir = path.dirname(svgPath)
  const base = path.basename(svgPath, '.svg')
  const tmpPngPath = path.join(dir, `${base}.__tmp__.png`)
  const jpgPath = path.join(dir, `${base}.jpg`)

  await fs.writeFile(tmpPngPath, pngData)
  await execFileAsync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', tmpPngPath, '--out', jpgPath])
  await fs.unlink(tmpPngPath)

  const jpgStat = await fs.stat(jpgPath)
  if (!jpgStat.isFile() || jpgStat.size === 0) {
    throw new Error(`Failed to create JPG: ${jpgPath}`)
  }

  await fs.unlink(svgPath)
}

async function main() {
  const frontendRoot = process.cwd()
  const projectsRoot = path.join(frontendRoot, 'public', 'projects')

  const allFiles = await walk(projectsRoot)
  const svgFiles = allFiles.filter((p) => p.toLowerCase().endsWith('.svg'))
  svgFiles.sort((a, b) => a.localeCompare(b))

  let ok = 0
  const failed = []
  for (const svgPath of svgFiles) {
    try {
      await convertOne(svgPath)
      ok += 1
    } catch (err) {
      failed.push({ svgPath, err: err instanceof Error ? err.message : String(err) })
    }
  }

  process.stdout.write(`Converted ${ok}/${svgFiles.length} SVGs to JPG in ${projectsRoot}\n`)
  if (failed.length) {
    process.stderr.write(`Failed conversions (${failed.length}):\n`)
    for (const f of failed) process.stderr.write(`- ${f.svgPath}: ${f.err}\n`)
    process.exitCode = 1
  }
}

main().catch((err) => {
  process.stderr.write(String(err) + '\n')
  process.exit(1)
})
