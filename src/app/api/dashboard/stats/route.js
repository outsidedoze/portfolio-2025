import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/dashboard-auth'
import { gaConfig, fetchReport, fetchRealtime, mockStats } from '@/lib/ga'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  if (!isAuthed(await cookies())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const days = [7, 30, 90].includes(Number(new URL(request.url).searchParams.get('days')))
    ? Number(new URL(request.url).searchParams.get('days')) : 30
  const config = gaConfig()

  if (config.mock) return NextResponse.json({ configured: true, mock: true, ...mockStats(days) })
  if (!config.configured) return NextResponse.json({ configured: false, missing: config.missing })

  try {
    const [report, realtime] = await Promise.all([fetchReport(days), fetchRealtime()])
    return NextResponse.json({ configured: true, report, realtime })
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message }, { status: 502 })
  }
}
