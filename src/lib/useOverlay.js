'use client'
import { useEffect, useRef, useState } from 'react'

// Project overlays live in ?project=<slug>, so Back closes them and links can be shared.
// Escape closes; focus moves into the dialog on open and back to whatever opened it on close.
// slugs: { overlayKey: 'url-slug' }. Returns [active, setActive, dialogRef].
export function useOverlay(slugs) {
  const [active, setActive] = useState(null)
  const [ready, setReady] = useState(false)
  const dialogRef = useRef(null)
  const openerRef = useRef(null)

  const fromUrl = () => {
    const slug = new URLSearchParams(window.location.search).get('project')
    return Object.keys(slugs).find((key) => slugs[key] === slug) || null
  }

  useEffect(() => {
    setActive(fromUrl())
    setReady(true)
    const onPopState = () => setActive(fromUrl())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (!ready || fromUrl() === active) return
    window.history.pushState(null, '', active ? `?project=${slugs[active]}` : window.location.pathname)
  }, [active, ready])

  useEffect(() => {
    if (!active) {
      openerRef.current?.focus?.()
      openerRef.current = null
      return
    }
    openerRef.current ??= document.activeElement
    dialogRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return [active, setActive, dialogRef]
}
