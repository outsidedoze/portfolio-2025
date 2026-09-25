import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/dashboard-auth'

export async function POST(request) {
  const res = NextResponse.redirect(new URL('/dashboard', request.url), 303)
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
