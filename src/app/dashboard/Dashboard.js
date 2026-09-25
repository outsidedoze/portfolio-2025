'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

const RANGES = [7, 30, 90]
const REFRESH_MS = 30_000

const compact = (n) => new Intl.NumberFormat('en-US', { notation: n >= 10_000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(n || 0)
const mmss = (s) => `${Math.floor((s || 0) / 60)}:${String((s || 0) % 60).padStart(2, '0')}`
const niceDate = (yyyymmdd) => {
  const d = new Date(`${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Dashboard() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await fetch(`/api/dashboard/stats?days=${days}`, { cache: 'no-store' })
        if (res.status === 401) { window.location.reload(); return }
        const json = await res.json()
        if (!alive) return
        if (json.error) setError(json.error); else { setError(null); setData(json) }
        setUpdatedAt(new Date())
      } catch (e) {
        if (alive) setError(e.message)
      } finally {
        if (alive) setLoading(false)
      }
    }
    setLoading(true)
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => { alive = false; clearInterval(id) }
  }, [days])

  return (
    <main className="dash min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <h1 className="font-benton text-5xl leading-none">Site stats</h1>
            <p className="dash-muted text-sm mt-1">
              zachardente.com{updatedAt ? ` · updated ${updatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : ''}
              {data?.mock ? ' · sample data' : ''}
            </p>
          </div>
          <form method="POST" action="/api/dashboard/logout">
            <button type="submit" className="dash-chip">Log out</button>
          </form>
        </header>

        {data && data.configured === false && <SetupCard missing={data.missing} />}
        {error && <p className="dash-card p-4 mb-4 text-sm" style={{ color: 'var(--dash-danger)' }}>Couldn&apos;t load stats: {error}</p>}

        {data?.configured && (
          <div className={loading ? 'dash-fade' : ''}>
            <div className="flex items-center gap-2 mb-4" role="group" aria-label="Date range">
              {RANGES.map((r) => (
                <button key={r} type="button" className="dash-chip" aria-pressed={days === r} onClick={() => setDays(r)}>Last {r} days</button>
              ))}
            </div>

            <section className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] mb-4">
              <RealtimeCard realtime={data.realtime} />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Stat label={`Visitors`} value={compact(data.report.totals.users)} />
                <Stat label="Sessions" value={compact(data.report.totals.sessions)} />
                <Stat label="Page views" value={compact(data.report.totals.pageViews)} />
                <Stat label="Avg. time on site" value={mmss(data.report.totals.avgSessionSeconds)} />
                <Stat label="Project links opened" value={compact(data.report.projects.reduce((s, p) => s + p.value, 0))} />
                <Stat label="Mobile share" value={`${Math.round(100 * (data.report.devices.find((d) => d.label === 'mobile')?.value || 0) / Math.max(1, data.report.devices.reduce((s, d) => s + d.value, 0)))}%`} />
              </div>
            </section>

            <section className="dash-card p-5 mb-4">
              <h2 className="text-sm font-semibold mb-1">Daily visitors</h2>
              <p className="dash-muted text-xs mb-3">Last {days} days</p>
              <LineChart points={data.report.daily} />
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <Bars title="Most viewed pages" unit="views" rows={data.report.pages} />
              <Bars title="Where visitors came from" unit="visitors" rows={data.report.sources} />
              <Bars title="Project links opened" unit="opens" rows={data.report.projects} empty="No ?project= links opened yet" />
              <Bars title="Countries" unit="visitors" rows={data.report.countries} />
              <Bars title="Cities" unit="visitors" rows={data.report.cities} />
              <Bars title="Devices" unit="visitors" rows={data.report.devices} />
            </section>
          </div>
        )}
      </div>
    </main>
  )
}

function SetupCard({ missing = [] }) {
  return (
    <section className="dash-card p-6 mb-4">
      <h2 className="text-lg font-semibold mb-2">One-time setup needed</h2>
      <p className="dash-ink-2 text-sm mb-3">The password works, but the dashboard can&apos;t read Google Analytics yet. Missing on the server: <code>{missing.join(', ')}</code>.</p>
      <ol className="list-decimal pl-5 text-sm space-y-1 dash-ink-2">
        <li>Google Cloud console &rarr; create a project &rarr; enable the <strong>Google Analytics Data API</strong>.</li>
        <li>IAM &rarr; Service accounts &rarr; create one &rarr; Keys &rarr; add a JSON key.</li>
        <li>Google Analytics &rarr; Admin &rarr; Property access management &rarr; add the service account email as <strong>Viewer</strong>.</li>
        <li>Vercel &rarr; project settings &rarr; Environment variables: <code>GA_PROPERTY_ID</code> (the numeric property ID), <code>GA_CLIENT_EMAIL</code>, <code>GA_PRIVATE_KEY</code> (from the JSON key). Redeploy.</li>
      </ol>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="dash-card p-4">
      <p className="dash-muted text-xs mb-1">{label}</p>
      <p className="dash-stat">{value}</p>
    </div>
  )
}

function RealtimeCard({ realtime }) {
  return (
    <div className="dash-card p-5">
      <p className="dash-muted text-xs mb-1">Active right now</p>
      <p className="dash-hero">{realtime?.activeUsers ?? 0}</p>
      <p className="dash-muted text-xs mt-1 mb-3">in the last 30 minutes &middot; refreshes every 30s</p>
      {realtime?.places?.length ? (
        <ul className="text-sm space-y-1">
          {realtime.places.slice(0, 5).map((p) => (
            <li key={p.label} className="flex justify-between gap-3"><span className="truncate">{p.label || 'Unknown'}</span><span className="dash-num dash-ink-2">{p.value}</span></li>
          ))}
        </ul>
      ) : <p className="dash-muted text-sm">Nobody on the site right now.</p>}
    </div>
  )
}

function Bars({ title, unit, rows = [], empty = 'Nothing yet' }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <div className="dash-card p-5">
      <h2 className="text-sm font-semibold mb-3">{title}</h2>
      {rows.length === 0 && <p className="dash-muted text-sm">{empty}</p>}
      {rows.map((r) => (
        <div key={r.label} className="dash-bar-row" title={`${r.label}: ${r.value} ${unit}`}>
          <span className="text-sm truncate" title={r.label}>{r.label || '(unknown)'}</span>
          <div className="dash-bar-track"><div className="dash-bar-fill" style={{ width: `${(100 * r.value) / max}%` }} /></div>
          <span className="text-sm dash-num dash-ink-2">{compact(r.value)}</span>
        </div>
      ))}
    </div>
  )
}

const H = 180, PAD = { l: 34, r: 16, t: 14, b: 26 }

function LineChart({ points = [] }) {
  const [hover, setHover] = useState(null)
  const wrapRef = useRef(null)
  // Size the SVG to its container so text stays 11px on every screen instead of scaling with the viewBox
  const [W, setW] = useState(640)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const geom = useMemo(() => {
    if (!points.length) return null
    const max = Math.max(1, ...points.map((p) => p.users))
    const step = max <= 5 ? 1 : max <= 20 ? 5 : max <= 50 ? 10 : max <= 200 ? 50 : 100
    const top = Math.ceil(max / step) * step
    const x = (i) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(1, points.length - 1)
    const y = (v) => PAD.t + (H - PAD.t - PAD.b) * (1 - v / top)
    const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.users).toFixed(1)}`).join(' ')
    const area = `${path} L${x(points.length - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`
    const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step).filter((v, i, a) => a.length <= 5 || i % Math.ceil(a.length / 5) === 0)
    return { x, y, path, area, ticks, top }
  }, [points, W])
  if (!geom) return <p className="dash-muted text-sm">No data yet.</p>
  const { x, y, path, area, ticks } = geom
  const last = points.length - 1

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * last)
    setHover(Math.min(last, Math.max(0, i)))
  }

  return (
    <div ref={wrapRef} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block max-w-full" role="img" aria-label="Daily visitors line chart"
        onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--dash-line)" strokeWidth="1" />
            <text x={PAD.l - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--dash-muted)">{t}</text>
          </g>
        ))}
        <path d={area} fill="var(--dash-accent)" opacity="0.1" />
        <path d={path} fill="none" stroke="var(--dash-accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {[0, Math.floor(last / 2), last].map((i) => (
          <text key={i} x={x(i)} y={H - 8} fontSize="11" fill="var(--dash-muted)" textAnchor={i === 0 ? 'start' : i === last ? 'end' : 'middle'}>{niceDate(points[i].date)}</text>
        ))}
        <circle cx={x(last)} cy={y(points[last].users)} r="4" fill="var(--dash-accent)" stroke="var(--dash-surface)" strokeWidth="2" />
        <text x={x(last) - 8} y={y(points[last].users) - 8} fontSize="11" fontWeight="600" textAnchor="end" fill="var(--dash-ink)">{points[last].users}</text>
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b} stroke="var(--dash-ink-2)" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(points[hover].users)} r="4" fill="var(--dash-accent)" stroke="var(--dash-surface)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="dash-tip" style={{ left: `${(100 * x(hover)) / W}%`, top: `${(100 * y(points[hover].users)) / H}%` }}>
          <strong>{points[hover].users}</strong> visitors &middot; {points[hover].pageViews} views &middot; {niceDate(points[hover].date)}
        </div>
      )}
    </div>
  )
}
