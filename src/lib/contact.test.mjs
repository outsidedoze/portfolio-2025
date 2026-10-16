// Run: node --test src/lib/contact.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkContact } from './contact.js'

const now = 1_000_000
const ok = { name: 'Ada', email: 'ada@example.com', message: 'Hi!', hat: 'Music', t: now - 10_000 }

test('accepts a normal message', () => {
  assert.deepEqual(checkContact(ok, now), { data: { name: 'Ada', email: 'ada@example.com', message: 'Hi!', hat: 'Music' } })
})

test('flags honeypot and too-fast submissions as spam', () => {
  assert.deepEqual(checkContact({ ...ok, website: 'http://spam' }, now), { spam: true })
  assert.deepEqual(checkContact({ ...ok, t: now - 500 }, now), { spam: true })
  assert.deepEqual(checkContact({ ...ok, t: undefined }, now), { spam: true })
})

test('rejects bad input', () => {
  assert.ok(checkContact({ ...ok, email: 'nope' }, now).error)
  assert.ok(checkContact({ ...ok, name: '' }, now).error)
  assert.ok(checkContact({ ...ok, message: 'x'.repeat(5001) }, now).error)
  assert.ok(checkContact(null, now).error)
})

test('defaults unknown hats and strips newlines from the name (it goes in the subject)', () => {
  const { data } = checkContact({ ...ok, hat: 'Hacker', name: 'A\r\nBcc: x' }, now)
  assert.equal(data.hat, 'Just saying hi')
  assert.equal(data.name, 'A Bcc: x')
})
