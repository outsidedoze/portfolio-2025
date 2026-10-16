'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HATS } from '@/lib/contact'

// Floating "say hi" button, styled like the site's cream home icon. Posts to /api/contact;
// Zach's address is only on the server, never in this file.
export default function ContactButton() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hat, setHat] = useState(HATS[0])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const openedAt = useRef(0)
  const buttonRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!open) return
    openedAt.current = Date.now()
    firstFieldRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (pathname?.startsWith('/dashboard')) return null

  function close() {
    setOpen(false)
    buttonRef.current?.focus()
  }

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(form), hat, t: openedAt.current }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || "Couldn't send right now. Try again in a bit?")
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const field = 'w-full font-benton rounded-xl border border-[#202020]/15 bg-white/70 px-3 py-2 text-[15px] text-[#202020] placeholder:text-[#202020]/40 focus:border-[#202020] focus:outline-none'

  return (
    // Home page pins the "Built from scratch" badge bottom-right, so sit above it there
    <div className={`fixed ${pathname === '/' ? 'bottom-20' : 'bottom-6'} right-6 z-[1500] flex flex-col items-end gap-3`}>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Contact Zach"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-[min(340px,calc(100vw-48px))] origin-bottom-right rounded-3xl bg-[#FFFDE6] p-5 text-[#202020] shadow-[0_0_14px_rgba(0,0,0,0.15)]"
          >
            {status === 'sent' ? (
              <div className="py-6 text-center">
                <p className="font-benton-compressed text-5xl leading-none">Got it.</p>
                <p className="mt-3 font-benton text-base">I&apos;ll hit you back soon.</p>
                <button onClick={close} className="mt-5 text-sm underline">Close</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <p className="font-benton-compressed text-5xl leading-none">Say hi.</p>
                <fieldset>
                  <legend className="mb-2 font-benton text-sm">Which hat are you after?</legend>
                  <div className="flex flex-wrap gap-2">
                    {HATS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        aria-pressed={hat === h}
                        onClick={() => setHat(h)}
                        className={`rounded-full border px-3 py-1 font-benton text-sm transition-colors ${hat === h ? 'border-[#202020] bg-[#202020] text-[#FFFDE6]' : 'border-[#202020]/25 hover:border-[#202020]'}`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="sr-only" htmlFor="contact-name">Name</label>
                <input ref={firstFieldRef} id="contact-name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                <label className="sr-only" htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Your email" className={field} />
                <label className="sr-only" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" required maxLength={5000} rows={4} placeholder="What's up?" className={`${field} resize-none`} />
                {/* Honeypot: hidden from people and screen readers; bots that fill it get silently dropped */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 rounded-full bg-[#202020] px-4 py-2 font-benton text-[#FFFDE6] transition-opacity disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send it'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        onClick={() => (open ? close() : (setOpen(true), setStatus('idle')))}
        aria-label={open ? 'Close contact form' : 'Contact Zach'}
        aria-expanded={open}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFFDE6] shadow-[0_0_14px_rgba(0,0,0,0.15)]"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M5 5L17 17M17 5L5 17" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="1" stroke="black" strokeWidth="2" strokeLinejoin="round" />
            <path d="M2.5 6L12 13L21.5 6" stroke="black" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
