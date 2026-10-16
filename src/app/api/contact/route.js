import { NextResponse } from 'next/server'
import { checkContact } from '@/lib/contact'

// The destination address lives only in the CONTACT_TO env var (never in this public repo or the page),
// so there is nothing for scrapers to find. Mail goes out through Resend's HTTP API.
export async function POST(request) {
  // Same-origin only: blocks scripts posting from other sites (URL.parse returns null on garbage)
  const origin = URL.parse(request.headers.get('origin') ?? '')
  if (!origin || origin.host !== request.headers.get('host')) {
    return NextResponse.json({ error: 'Bad request' }, { status: 403 })
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO) {
    return NextResponse.json({ error: 'The contact form is not set up yet.' }, { status: 503 })
  }

  const result = checkContact(await request.json().catch(() => null))
  if (result.spam) return NextResponse.json({ ok: true }) // look successful so bots don't adapt
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 })

  const { name, email, message, hat } = result.data
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM || 'zachardente.com <onboarding@resend.dev>',
      to: CONTACT_TO,
      reply_to: email,
      subject: `[zachardente.com] ${hat}: ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nHat: ${hat}`,
    }),
  })
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return NextResponse.json({ error: "Couldn't send right now. Try again in a bit?" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
