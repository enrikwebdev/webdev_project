import { readFile } from 'node:fs/promises'

const file = process.argv[2] || 'src/App.jsx'
const text = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
const urls = [...new Set(text.match(/https:\/\/[^"'\s)]+/g) || [])]

if (!urls.length) {
  console.log('No external asset URLs found.')
  process.exit(0)
}

let failed = 0
for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    const ok = res.status >= 200 && res.status < 300
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${res.status} ${url}`)
    if (!ok) failed++
  } catch (err) {
    console.log(`FAIL ERR ${url} (${err.message})`)
    failed++
  }
}

if (failed) {
  console.error(`\nAsset check failed: ${failed} URL(s) unreachable.`)
  process.exit(1)
}

console.log('\nAsset check passed.')
