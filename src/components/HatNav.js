'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLACES = [
  { href: '/', label: 'Home' },
  { href: '/creative-director', label: 'Creative', image: '/images/creative-hat.png' },
  { href: '/music', label: 'Music', image: '/images/music-hat.png' },
  { href: '/garden', label: 'Garden', image: '/images/garden-hat.png' },
]

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

// Two lines that fold into an X, like apple.com's nav
function MenuGlyph({ open }) {
  const bar = 'transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none'
  const box = { transformBox: 'fill-box', transformOrigin: 'center' }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" {...line}>
      <path d="M2.5 7h15" className={bar} style={{ ...box, transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }} />
      <path d="M2.5 13h15" className={bar} style={{ ...box, transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }} />
    </svg>
  )
}

function HouseGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" {...line}>
      <path d="M4.5 10.5 12 4l7.5 6.5V19a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  )
}

// The menu opens a tray of hats, so any section is one click from any other.
export default function HatNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <nav ref={ref} aria-label="Sections" className="fixed top-6 left-6 z-[1001] flex flex-col items-start gap-2 sm:flex-row" style={{ cursor: 'auto' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="hat-tray"
        aria-label={open ? 'Close menu' : 'Menu'}
        className="ink-control flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform duration-150 active:scale-95"
      >
        <MenuGlyph open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="hat-tray"
            initial={{ opacity: 0, scale: 0.85, x: -16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -16 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            style={{ transformOrigin: 'top left' }}
            className="ink-control flex rounded-[28px] px-1.5 py-1.5"
          >
            {PLACES.map((p) => {
              const current = pathname === p.href
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? 'page' : undefined}
                    className={`flex w-[68px] flex-col items-center gap-1 rounded-[22px] py-1.5 font-benton text-[13px] italic transition-colors duration-150 hover:bg-white/10 ${current ? 'bg-white/10' : ''}`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center">
                      {p.image ? <Image src={p.image} alt="" width={40} height={40} className="h-10 w-10 object-contain" /> : <HouseGlyph />}
                    </span>
                    <span className={current ? 'underline decoration-1 underline-offset-[3px]' : 'opacity-80'}>{p.label}</span>
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}
