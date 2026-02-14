#!/usr/bin/env node
/**
 * Check 0 (pre-gate) — fail-fast domain plausibility check.
 *
 * Goal: block the pipeline before build if the business likely already has a website.
 *
 * Usage:
 *   node scripts/check0-pre-gate.mjs --name "Donna Hair" --city "Bergamo" --phone "+39 02 123456" --piva "..."
 *
 * Output:
 *   - JSON summary to stdout
 * Exit codes:
 *   0 = no plausible domain detected
 *   2 = plausible domain detected (STOP + manual browser verification required)
 */

import process from 'node:process';

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    out[key] = val;
  }
  return out;
}

function stripAccents(s) {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function slugify(s) {
  return stripAccents(String(s || ''))
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function normalizePhone(s) {
  if (!s) return null;
  const digits = String(s).replace(/[^0-9+]/g, '');
  // keep + if present; also keep digits-only version
  const plain = digits.replace(/^\+/, '');
  return { raw: s, digits, plain };
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function buildCandidates(name, city) {
  const base = slugify(name);
  const citySlug = slugify(city);

  // Try removing generic words that often make domains shorter.
  const generic = ['parrucchiere', 'parrucchieri', 'salone', 'hair', 'beauty', 'barber', 'barbershop', 'estetica', 'centro', 'studio'];
  const tokens = base.split('-').filter(Boolean);
  const compact = tokens.filter(t => !generic.includes(t)).join('');
  const compact2 = tokens.filter(t => !generic.includes(t)).join('-');

  const variants = uniq([
    base,
    base.replace(/-/g, ''),
    compact,
    compact2,
    citySlug ? `${base}-${citySlug}` : null,
    citySlug ? `${compact2}-${citySlug}` : null,
    citySlug ? `${compact}-${citySlug}` : null,
  ]);

  // produce domain list
  const tlds = ['.it', '.com'];
  const domains = [];
  for (const v of variants) {
    if (!v || v.length < 4) continue;
    for (const tld of tlds) {
      domains.push(`${v}${tld}`);
      domains.push(`www.${v}${tld}`);
    }
  }
  return uniq(domains);
}

async function fetchWithTimeout(url, ms = 7000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; OpenClawCheck0/1.0; +https://docs.openclaw.ai)',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    const ct = res.headers.get('content-type') || '';
    let text = '';
    if (ct.includes('text/html')) {
      // read limited content to keep it fast
      const buf = await res.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const max = Math.min(bytes.length, 200_000);
      text = new TextDecoder('utf-8', { fatal: false }).decode(bytes.slice(0, max));
    }
    return { ok: true, status: res.status, finalUrl: res.url, contentType: ct, htmlSample: text };
  } catch (e) {
    return { ok: false, error: String(e?.name || 'Error') + ': ' + String(e?.message || e) };
  } finally {
    clearTimeout(t);
  }
}

function scoreHtml(html, { name, city, phone }) {
  if (!html) return { score: 0, hits: [] };
  const h = html.toLowerCase();
  const hits = [];
  let score = 0;

  const nameSlug = slugify(name).replace(/-/g, ' ');
  if (nameSlug && h.includes(nameSlug.split(' ')[0])) {
    // weak heuristic: first token present
    score += 1;
    hits.push('name_token');
  }
  const citySlug = slugify(city).replace(/-/g, ' ');
  if (citySlug && h.includes(citySlug)) {
    score += 1;
    hits.push('city');
  }
  if (phone?.plain && phone.plain.length >= 8 && h.replace(/\D/g, '').includes(phone.plain)) {
    score += 2;
    hits.push('phone');
  }
  return { score, hits };
}

async function main() {
  const args = parseArgs(process.argv);
  const name = args.name || args.n;
  const city = args.city || args.c;
  const phone = normalizePhone(args.phone || args.tel);
  const piva = args.piva || args.vat;

  if (!name || !city) {
    console.error('ERROR: missing --name and/or --city');
    process.exit(1);
  }

  const domains = buildCandidates(name, city);

  const checks = [];
  for (const domain of domains.slice(0, 30)) {
    // limit to 30 to avoid hammering; we want fail-fast
    for (const proto of ['https://', 'http://']) {
      const url = proto + domain;
      const r = await fetchWithTimeout(url);
      const htmlScore = r.ok ? scoreHtml(r.htmlSample, { name, city, phone }) : { score: 0, hits: [] };
      checks.push({
        candidate: domain,
        url,
        ok: r.ok,
        status: r.status || null,
        finalUrl: r.finalUrl || null,
        contentType: r.contentType || null,
        error: r.error || null,
        htmlScore,
      });

      // Fast exit if we got a live page (2xx/3xx) with any relevance signal
      if (r.ok && r.status && r.status >= 200 && r.status < 400 && htmlScore.score >= 1) {
        const summary = {
          input: { name, city, phone: phone?.digits || null, piva: piva || null },
          decision: 'STOP_MANUAL_VERIFY',
          reason: 'Plausible domain responded with relevance signals',
          topHit: { domain, url, finalUrl: r.finalUrl, status: r.status, hits: htmlScore.hits },
          checks,
        };
        console.log(JSON.stringify(summary, null, 2));
        process.exit(2);
      }
    }
  }

  const anyLive = checks.find(c => c.ok && c.status && c.status >= 200 && c.status < 400);

  const summary = {
    input: { name, city, phone: phone?.digits || null, piva: piva || null },
    decision: anyLive ? 'REVIEW_RECOMMENDED' : 'PASS',
    reason: anyLive ? 'Some domains responded but without clear relevance signals. Consider manual check if suspicious.' : 'No plausible domain responded',
    checks,
  };

  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

main();
