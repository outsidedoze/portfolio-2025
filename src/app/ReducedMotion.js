'use client'
import { MotionConfig } from 'framer-motion'

// Honors the OS "reduce motion" setting for every framer-motion animation on the site
export default function ReducedMotion({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
