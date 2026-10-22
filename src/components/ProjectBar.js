'use client'
import { useEffect, useRef, useState } from 'react'

// Mobile project chrome, iOS large-title style: the whole project is one scroll. At the top the bar
// is just a back button; once the big header ([data-project-header]) scrolls under it, the bar turns
// into translucent material and shows the title. Section chips pin underneath. Hidden on desktop.
export function ProjectBar({ title, backLabel, onBack }) {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    const scroller = ref.current?.closest('[role=dialog]')
    if (!scroller) return
    const onScroll = () => {
      setScrolled(scroller.scrollTop > 4)
      const header = scroller.querySelector('[data-project-header]')
      setShowTitle(header ? header.getBoundingClientRect().bottom < 56 : scroller.scrollTop > 120)
    }
    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className={`md:hidden sticky top-0 z-[1001] flex h-12 shrink-0 items-center px-1 transition-colors duration-200 ${scrolled ? 'bg-[#FAF8E9]/80 backdrop-blur-xl' : ''}`}
    >
      <button
        type="button"
        onClick={onBack}
        className="relative z-10 flex h-11 cursor-pointer items-center gap-1 pl-2 pr-3 font-benton text-[17px] text-[#202020] transition-opacity active:opacity-40"
      >
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9.5 1.5 2 9l7.5 7.5" />
        </svg>
        {backLabel}
      </button>
      <p
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-24 truncate text-center font-benton-compressed text-lg text-[#202020] transition-opacity duration-200 ${showTitle ? 'opacity-100' : 'opacity-0'}`}
      >
        {title}
      </p>
    </div>
  )
}

export function SectionChips({ sections, activeSection }) {
  const rowRef = useRef(null)

  // Keep the active chip in view as the scroll-spy moves through sections
  useEffect(() => {
    const row = rowRef.current
    const chip = row?.querySelector('[aria-current]')
    if (chip) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [activeSection])

  if (!sections.length) return null

  // Land the section just below the pinned bar (h-12 = 48px) + this chip row
  const jump = (id) => {
    const nav = rowRef.current?.parentElement
    const scroller = nav?.closest('[role=dialog]')
    const el = scroller?.querySelector(`#${id}`)
    if (!el) return
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
    scroller.scrollTo({ top: top - 48 - nav.offsetHeight, behavior: 'smooth' })
  }

  return (
    <nav aria-label="Sections" className="md:hidden sticky top-12 z-[1000] order-1 border-b border-[#202020]/10 bg-[#FAF8E9]/80 backdrop-blur-xl">
      <div ref={rowRef} className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => {
          const active = s.id === activeSection
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => jump(s.id)}
              aria-current={active ? 'true' : undefined}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-benton-compressed text-[15px] leading-none transition-colors duration-200 ${active ? 'bg-[#202020] text-[#FAF8E9]' : 'text-[#202020]/70 active:bg-[#202020]/10'}`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// Mobile only: on desktop the side panel swaps its text as you scroll; here each section
// opens with its own tagline + description instead, so none of it scrolls away unseen
export function SectionIntro({ text }) {
  if (!text?.tagline && !text?.description) return null
  return (
    <div className="md:hidden bg-[#FAF8E9] px-6 pt-8 pb-6 text-center">
      {text.tagline && <h3 className="font-benton-compressed text-2xl leading-none text-[#202020]">{text.tagline}</h3>}
      {text.description && <p className="mt-3 font-benton text-sm leading-normal text-[#202020]">{text.description}</p>}
    </div>
  )
}
