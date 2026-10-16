// Contact form checks, shared by the API route and its test. No imports so `node --test` can load it directly.
export const HATS = ['Creative work', 'Music', 'Garden', 'Just saying hi']

const MIN_FILL_MS = 3000 // humans can't open, type and send in under 3s; scripts usually do

// Returns { spam: true } for bot-looking submissions (caller should fake success),
// { error } for bad input, or { data } with trimmed fields.
export function checkContact(body, now = Date.now()) {
  if (!body || typeof body !== 'object') return { error: 'Bad request' }
  if (body.website) return { spam: true } // honeypot: hidden from humans, bots fill every field
  if (typeof body.t !== 'number' || now - body.t < MIN_FILL_MS) return { spam: true }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const hat = HATS.includes(body.hat) ? body.hat : 'Just saying hi'

  if (!name || name.length > 100) return { error: 'Add your name (100 characters max).' }
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: 'That email looks off.' }
  if (!message || message.length > 5000) return { error: 'Write a message (5000 characters max).' }
  return { data: { name: name.replace(/[\r\n]+/g, ' '), email, message, hat } }
}
