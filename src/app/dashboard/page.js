import { cookies } from 'next/headers'
import { isAuthed } from '@/lib/dashboard-auth'
import Dashboard from './Dashboard'
import Login from './Login'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({ searchParams }) {
  const authed = isAuthed(await cookies())
  const { error } = await searchParams
  return authed ? <Dashboard /> : <Login error={error} />
}
