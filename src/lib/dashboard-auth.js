import { createHmac, createHash, timingSafeEqual } from 'crypto'

export const SESSION_COOKIE = 'dash_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

// The session token is derived from the password, so changing the password logs everyone out.
export function sessionToken() {
  const secret = process.env.DASHBOARD_PASSWORD
  if (!secret) return null
  return createHmac('sha256', secret).update('zach-dashboard-session-v1').digest('hex')
}

export function passwordMatches(candidate) {
  const expected = process.env.DASHBOARD_PASSWORD
  if (!expected || typeof candidate !== 'string') return false
  const a = createHash('sha256').update(candidate).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export function isAuthed(cookieStore) {
  const token = sessionToken()
  const value = cookieStore.get(SESSION_COOKIE)?.value
  if (!token || !value || value.length !== token.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(token))
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}
