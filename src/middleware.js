import { NextResponse } from 'next/server'

// Visitors whose IP is listed in NO_TRACK_IPS (comma-separated) get the same
// analytics opt-out cookie that logging into /dashboard sets, on every device.
const NO_TRACK_COOKIE = 'no_track'

export function middleware(request) {
  if (request.cookies.get(NO_TRACK_COOKIE)?.value === '1') return NextResponse.next()

  const allowed = (process.env.NO_TRACK_IPS || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (allowed.length === 0) return NextResponse.next()

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
  if (!ip || !allowed.includes(ip)) return NextResponse.next()

  const res = NextResponse.next()
  res.cookies.set(NO_TRACK_COOKIE, '1', { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = {
  matcher: ['/((?!_next/|api/|images/|favicon.ico).*)'],
}
