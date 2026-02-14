import { readdir, readFile, rename, mkdir } from 'node:fs/promises'
import path from 'node:path'

const root = '/home/ubuntu/.openclaw/workspace/projects/sites'
const activeDir = path.join(root, 'active')
const expiredDir = path.join(root, 'expired')

await mkdir(activeDir, { recursive: true })
await mkdir(expiredDir, { recursive: true })

const now = Date.now()
const entries = await readdir(activeDir, { withFileTypes: true })

for (const e of entries) {
  if (!e.isDirectory()) continue
  const sitePath = path.join(activeDir, e.name)
  const metaPath = path.join(sitePath, 'site-meta.json')
  try {
    const meta = JSON.parse(await readFile(metaPath, 'utf8'))
    const expiresAt = new Date(meta.expiresAt).getTime()
    if (!Number.isFinite(expiresAt)) continue
    if (expiresAt <= now) {
      const target = path.join(expiredDir, e.name)
      await rename(sitePath, target)
      console.log(`EXPIRED -> moved: ${e.name}`)
    }
  } catch {
    // Skip folders without valid metadata
  }
}
