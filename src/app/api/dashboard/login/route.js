import { NextResponse } from 'next/server'
import { passwordMatches, sessionToken, SESSION_COOKIE, NO_TRACK_COOKIE, sessionCookieOptions } from '@/lib/dashboard-auth'

export async function POST(request) {
  const form = await request.formData()
  const password = form.get('password')
  const base = new URL('/dashboard', request.url)

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.redirect(new URL('/dashboard?error=unconfigured', request.url), 303)
  }
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800)) // slow down guessing
    return NextResponse.redirect(new URL('/dashboard?error=wrong', request.url), 303)
  }
  const res = NextResponse.redirect(base, 303)
  res.cookies.set(SESSION_COOKIE, sessionToken(), sessionCookieOptions())
  // Any browser that logs into the dashboard stops counting toward the site's analytics
  res.cookies.set(NO_TRACK_COOKIE, '1', { path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
  return res
}
