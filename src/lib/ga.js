import { createSign } from 'crypto'

// Google Analytics 4 Data API client using a service account, no SDK needed.
// Env: GA_PROPERTY_ID, GA_CLIENT_EMAIL, GA_PRIVATE_KEY (set DASHBOARD_MOCK=1 for sample data).

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
const REPORT_TTL_MS = 5 * 60 * 1000
const REALTIME_TTL_MS = 20 * 1000

let tokenCache = { value: null, expiresAt: 0 }
const reportCache = new Map()

export function gaConfig() {
  const missing = ['GA_PROPERTY_ID', 'GA_CLIENT_EMAIL', 'GA_PRIVATE_KEY'].filter((k) => !process.env[k])
  return { configured: missing.length === 0, missing, mock: process.env.DASHBOARD_MOCK === '1' }
}

// Env values pasted or piped in often carry stray whitespace/newlines; Google rejects those outright.
const env = (key) => (process.env[key] || '').trim()

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function accessToken() {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt - 60_000) return tokenCache.value
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(JSON.stringify({
    iss: env('GA_CLIENT_EMAIL'),
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }))
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${claims}`)
  const signature = signer.sign(env('GA_PRIVATE_KEY').replace(/\\n/g, '\n'))
  const jwt = `${header}.${claims}.${base64url(signature)}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  if (!res.ok) throw new Error(`Google token error ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  tokenCache = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return tokenCache.value
}

async function run(method, body) {
  const token = await accessToken()
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${env('GA_PROPERTY_ID')}:${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`GA ${method} error ${res.status}: ${(await res.text()).slice(0, 300)}`)
  return res.json()
}

// Reports with no dimensions (totals, realtime count) omit dimensionValues entirely
const rows = (report) => (report.rows || []).map((r) => ({
  dims: (r.dimensionValues || []).map((d) => d.value),
  vals: (r.metricValues || []).map((m) => Number(m.value)),
}))

const topList = (report, limit = 10) =>
  rows(report).slice(0, limit).map((r) => ({ label: r.dims[0], value: r.vals[0] }))

const dateRange = (days) => [{ startDate: `${days}daysAgo`, endDate: 'today' }]
const byUsers = { orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }] }

export async function fetchReport(days) {
  const key = `report:${days}`
  const cached = reportCache.get(key)
  if (cached && Date.now() < cached.expiresAt) return cached.data

  const [totals, daily, pages, sources, countries, cities, devices, projects] = await Promise.all([
    run('runReport', { dateRanges: dateRange(days), metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'averageSessionDuration' }] }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 10 }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'sessionSource' }], metrics: [{ name: 'activeUsers' }], ...byUsers, limit: 10 }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'country' }], metrics: [{ name: 'activeUsers' }], ...byUsers, limit: 10 }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'city' }], metrics: [{ name: 'activeUsers' }], ...byUsers, limit: 10 }),
    run('runReport', { dateRanges: dateRange(days), dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'activeUsers' }], ...byUsers }),
    run('runReport', {
      dateRanges: dateRange(days),
      dimensions: [{ name: 'pageLocation' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: { filter: { fieldName: 'pageLocation', stringFilter: { matchType: 'CONTAINS', value: 'project=' } } },
      limit: 50,
    }),
  ])

  const t = rows(totals)[0]?.vals || [0, 0, 0, 0]
  // Collapse project links (?project=slug) into per-project counts
  const projectCounts = {}
  for (const r of rows(projects)) {
    const slug = (r.dims[0].match(/[?&]project=([^&#]+)/) || [])[1]
    if (slug) projectCounts[slug] = (projectCounts[slug] || 0) + r.vals[0]
  }

  const data = {
    days,
    totals: { users: t[0], sessions: t[1], pageViews: t[2], avgSessionSeconds: Math.round(t[3]) },
    daily: rows(daily).map((r) => ({ date: r.dims[0], users: r.vals[0], pageViews: r.vals[1] })),
    pages: topList(pages),
    sources: topList(sources),
    countries: topList(countries),
    cities: topList(cities).filter((c) => c.label !== '(not set)'),
    devices: topList(devices),
    projects: Object.entries(projectCounts).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    fetchedAt: new Date().toISOString(),
  }
  reportCache.set(key, { data, expiresAt: Date.now() + REPORT_TTL_MS })
  return data
}

export async function fetchRealtime() {
  const cached = reportCache.get('realtime')
  if (cached && Date.now() < cached.expiresAt) return cached.data

  const [total, places, pages] = await Promise.all([
    run('runRealtimeReport', { metrics: [{ name: 'activeUsers' }] }),
    run('runRealtimeReport', { dimensions: [{ name: 'country' }, { name: 'city' }], metrics: [{ name: 'activeUsers' }], limit: 10 }),
    run('runRealtimeReport', { dimensions: [{ name: 'unifiedScreenName' }], metrics: [{ name: 'activeUsers' }], limit: 10 }),
  ])
  const data = {
    activeUsers: rows(total)[0]?.vals[0] || 0,
    places: rows(places).map((r) => ({ label: [r.dims[1], r.dims[0]].filter((v) => v && v !== '(not set)').join(', '), value: r.vals[0] })),
    pages: rows(pages).map((r) => ({ label: r.dims[0], value: r.vals[0] })),
    fetchedAt: new Date().toISOString(),
  }
  reportCache.set('realtime', { data, expiresAt: Date.now() + REALTIME_TTL_MS })
  return data
}

// Sample data so the dashboard can be developed without Google credentials.
export function mockStats(days) {
  const today = new Date()
  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() - (days - 1 - i))
    const users = 6 + Math.round(8 * Math.abs(Math.sin(i / 3))) + (i % 7 === 5 ? 9 : 0)
    return { date: d.toISOString().slice(0, 10).replace(/-/g, ''), users, pageViews: users * 3 }
  })
  const users = daily.reduce((s, d) => s + d.users, 0)
  return {
    report: {
      days,
      totals: { users, sessions: Math.round(users * 1.2), pageViews: users * 3, avgSessionSeconds: 94 },
      daily,
      pages: [['/', 210], ['/creative-director', 168], ['/garden', 61], ['/music', 44], ['/creative-director/them', 12]].map(([label, value]) => ({ label, value })),
      sources: [['(direct)', 120], ['linkedin.com', 64], ['google', 38], ['instagram.com', 21], ['t.co', 6]].map(([label, value]) => ({ label, value })),
      countries: [['United States', 201], ['Canada', 14], ['United Kingdom', 9], ['Germany', 4]].map(([label, value]) => ({ label, value })),
      cities: [['Providence', 58], ['Boston', 41], ['New York', 37], ['Los Angeles', 12], ['Montreal', 8]].map(([label, value]) => ({ label, value })),
      devices: [['desktop', 142], ['mobile', 79], ['tablet', 7]].map(([label, value]) => ({ label, value })),
      projects: [['nitro-bar', 31], ['thriftcon', 19], ['sorette', 12], ['omi', 7], ['landmade', 4]].map(([label, value]) => ({ label, value })),
      fetchedAt: new Date().toISOString(),
    },
    realtime: {
      activeUsers: 3,
      places: [{ label: 'Providence, United States', value: 2 }, { label: 'Toronto, Canada', value: 1 }],
      pages: [{ label: 'Zach Ardente | One Man. Many Hats', value: 3 }],
      fetchedAt: new Date().toISOString(),
    },
  }
}
