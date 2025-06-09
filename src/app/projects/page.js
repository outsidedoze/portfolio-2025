'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const hats = [
  { label: 'Creative Director', image: '/images/creative-hat.png', href: '/creative-director' },
  { label: 'Musician', image: '/images/music-hat.png', href: '/music' },
  { label: 'Designer', image: '/images/designer-hat.png', href: '/designer' },
]

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <Image
        src="/images/homepage-bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Zach */}
      <motion.div
        initial={{ y: 40, rotate: -2, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[180px] h-[300px] z-10"
      >
        <Image
          src="/images/zach.png"
          alt="Zach"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Hats */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-20">
        {hats.map((hat) => (
          <Link key={hat.label} href={hat.href}>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 relative group-hover:scale-110 transition-transform">
                <Image
                  src={hat.image}
                  alt={hat.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-xs">{hat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}