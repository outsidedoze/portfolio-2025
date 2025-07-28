"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GardenPage() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const collageImages = [
    {
      src: '/images/garden/2022.png',
      desktop: { bottom: 0, left: 0, width: 600, zIndex: 10 },
      mobile: { bottom: 50, left: -140, width: 380, zIndex: 40 },
    },
    {
      src: '/images/garden/garden-zach.png',
      hideOnMobile: true,
      desktop: { bottom: 620, left: 350, width: 200, zIndex: 20 },
      mobile: { bottom: 0, left: 30, width: 160, zIndex: 0 },
    },
    {
      src: '/images/garden/2023.png',
      desktop: { bottom: 0, right: 0, width: 600, zIndex: 50 },
      mobile: { bottom: 0, right: 0, width: 350, zIndex: 40 },
    },
    {
      src: '/images/garden/2024.png',
      desktop: { bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 900, zIndex: 40 },
      mobile: { bottom: 380, left: 280, transform: 'translateX(-50%)', width: 450, zIndex: 40 },
    },
    {
      src: '/images/garden/2025.png',
      desktop: { top: 0, right: 0, width: 700, zIndex: 50 },
      mobile: { top: 0, right: 0, width: 380, zIndex: 50 },
    }
  ]

  return (
    <>
      {/* Scrolling marquee text */}
      <div className="absolute top-0 left-0 w-full z-[999] overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[10rem] font-bold font-benton space-x-16 w-[200%] leading-[1.2]" style={{ color: '#FFFDE6' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              Gardening
              <Image src="/images/star.svg" alt="star" width={50} height={50} className="inline-block align-middle translate-y-1" />
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/garden/garden-background.jpg"
          alt="Garden Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Home icon in top left corner */}
      <div className="fixed top-4 left-4 z-[9999]">
        <Link href="/" passHref>
          <Image
            src="/images/home-icon.svg"
            alt="Home"
            width={70}
            height={70}
            className="cursor-pointer transition-transform duration-300 hover:rotate-12"
            priority
          />
        </Link>
      </div>
      {collageImages.map((img) => {
        const isMobile = windowWidth < 768
        const style = isMobile ? img.mobile : img.desktop
        if (img.hideOnMobile && isMobile) return null
        return (
          <div
            key={img.src}
            className="absolute"
            style={{ ...style, position: 'absolute', zIndex: style.zIndex }}
          >
            <Image
              src={img.src}
              alt=""
              width={typeof style.width === 'number' ? style.width : 100}
              height={typeof style.width === 'number' ? style.width : 100}
              className="object-contain"
              priority
            />
            {/* Spinning star badge, except for garden-zach.png */}
            {!img.src.includes('garden-zach') && (
              <div
                className="absolute z-50"
                style={{
                  width: '120px',
                  height: '120px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
              >
                {/* Star shadow */}
                <motion.div
                  className="absolute"
                  style={{ left: '-8px', top: '8px', width: '100%', height: '100%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/images/star-background.svg"
                    alt="Star Badge Shadow"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Star front */}
                <motion.div
                  className="absolute"
                  style={{ left: '0', top: '0', width: '100%', height: '100%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/images/star-front.svg"
                    alt="Star Badge"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Year text */}
                <div
                  className="absolute font-benton-compressed text-[1.2rem] z-10 text-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#202020',
                    pointerEvents: 'none',
                    lineHeight: '1.1',
                    width: '80%'
                  }}
                >
                  {img.src.match(/(\d{4})/)?.[0]}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
