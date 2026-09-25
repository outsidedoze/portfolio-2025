import Link from 'next/link'

const MESSAGES = {
  wrong: 'That password didn’t match.',
  unconfigured: 'No DASHBOARD_PASSWORD is set on the server yet.',
}

export default function Login({ error }) {
  return (
    <main className="dash min-h-screen flex items-center justify-center px-4">
      <form method="POST" action="/api/dashboard/login" className="dash-card w-full max-w-sm p-8">
        <h1 className="font-benton text-4xl leading-none mb-1">Site stats</h1>
        <p className="dash-muted text-sm mb-6">Private. Just for Zach.</p>
        <label className="block text-sm mb-1" htmlFor="password">Password</label>
        <input
          id="password" name="password" type="password" autoComplete="current-password" autoFocus required
          className="dash-input w-full mb-3"
        />
        {error && <p className="text-sm mb-3" style={{ color: 'var(--dash-danger)' }}>{MESSAGES[error] || 'Something went wrong.'}</p>}
        <button type="submit" className="dash-button w-full">Log in</button>
        <p className="mt-6 text-xs dash-muted"><Link href="/" className="underline">Back to the site</Link></p>
      </form>
    </main>
  )
}
