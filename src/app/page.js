'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const hats = [
  { label: 'Creative Director', image: '/images/creative-hat.png', href: '/creative-director' },
  { label: 'Musician', image: '/images/music-hat.png', href: '/music' },
  { label: 'Designer', image: '/images/garden-hat.png', href: '/designer' },
]

// Background elements with precise coordinates from Figma
const backgroundElements = [
  { src: '/images/home/montreal.jpg', left: -220, top:0, width: 1484, height: 822, mobilePosition: { left: -250, scale: 0.8, top: 843 } },
  { src: '/images/home/backyardtrees.jpg', left: 999, top: -46, width: 787, height: 775, mobilePosition: { left: 300, top: -46 } },
  { src: '/images/home/rocks.png', left: -234, top: 330, width: 2292, height: 950, mobilePosition: { left: -300, top: 330 } },
  { src: '/images/home/flowers.png', left: -198, top: 662, width: 2206, height: 618, mobilePosition: { left: -350, top: 662 } },
  { src: '/images/home/tree.png', left: -200, top: -21, width: 695.28, height: 1179, mobilePosition: { left: -150, top: -21 } },
]

// ZachPuppet component
function ZachPuppet({ zachRef }) {
  // Example shoulder positions (tweak for your images)
  const leftShoulder = { x: 120, y: 180 }
  const rightShoulder = { x: 260, y: 180 }

  return (
    <div
      ref={zachRef}
      style={{
        position: 'relative',
        width: 400,
        height: 650,
        transform: 'scale(0.7)',
        transformOrigin: 'top center',
      }}
    >
      {/* Legs */}
      <motion.img
        src="/images/zach-legs-2.png"
        style={{
          position: 'absolute',
          left: 50, top: 370, zIndex: 1,
        }}
        draggable={false}
      />
      {/* Torso */}
      <motion.img
        src="/images/zach-torso.png"
        style={{
          position: 'absolute',
          left: 40, top: 150, zIndex: 2,
        }}
        draggable={false}
      />
      {/* Left Arm */}
      <motion.img
        src="/images/zach-arm-left.png"
        style={{
          position: 'absolute',
          left:20, top:270, zIndex: 3,
          transformOrigin: 'top center',
        }}
        animate={{ rotate: [0, 8, 0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        draggable={false}
      />
      {/* Right Arm */}
      <motion.img
        src="/images/zach-arm-right.png"
        style={{
          position: 'absolute',
          left:250, top:300, zIndex: 3,
          transformOrigin: 'top center',
        }}
        animate={{ rotate: [0, 8, 0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        draggable={false}
      />
      {/* Head */}
      <motion.img
        src="/images/zach-main-head.png"
        style={{
          position: 'absolute',
          left: 90, top: 0, zIndex: 10,
          transformOrigin: 'bottom center',
        }}
        draggable={false}
      />
    </div>
  )
}

export default function Home() {
  const zachRef = useRef(null)
  const router = useRouter()
  const hatRefs = useRef([])
  const [hasMounted, setHasMounted] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [scale, setScale] = useState(1)

  // Helper to check overlap between two DOMRects
  function isOverlapping(rect1, rect2) {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    )
  }

  // Create animation variants for wiggling/pulsing hats
  const createAnimationVariant = (index) => ({
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.1, 1, 1.1, 1],
      rotate: [-2, 2, -2, 2, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.6,
        duration: 0.8,
        delay: index * 0.25,
      }
    }
  });
  
  useEffect(() => {
    setHasMounted(true)
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Update scale based on window dimensions
  useEffect(() => {
    const updateScale = () => {
      const newScale = Math.min(1, window.innerWidth / 1600, window.innerHeight / 1200)
      setScale(newScale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          className="relative"
          style={{
            width: 1600,
            height: 1200,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
        >
          {hasMounted && (
            <div
              className="absolute inset-0"
              style={{
                transformOrigin: 'top left',
              }}
            >
              {backgroundElements.map((img, index) => (
                <motion.div
                  key={img.src}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [
                      Math.random() > 0.5 ? -80 : 80,
                      Math.random() > 0.5 ? -40 : 40,
                      0
                    ],
                    y: [
                      Math.random() > 0.5 ? -80 : 80, 
                      Math.random() > 0.5 ? -40 : 40,
                      0
                    ],
                    opacity: [0, 1, 1]
                  }}
                  transition={{
                    duration: 0.5,
                    times: [0, 0.5, 1],
                    ease: 'easeInOut',
                    delay: index * 0.15
                  }}
                  style={{
                    position: 'absolute',
                    top: windowWidth < 768 && img.mobilePosition && img.mobilePosition.top 
                      ? img.mobilePosition.top 
                      : img.top,
                    left: windowWidth < 768 && img.mobilePosition 
                      ? img.mobilePosition.left 
                      : img.left,
                    width: img.width,
                    height: img.height,
                    zIndex: index,
                    transform: windowWidth < 768 && img.mobilePosition && img.mobilePosition.scale
                      ? `scale(${img.mobilePosition.scale})` 
                      : ''
                  }}
                >
                  <Image
                    src={img.src}
                    alt=""
                    width={img.width}
                    height={img.height}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hats */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-16 z-50 pointer-events-none">
        {hats.map((hat, index) => (
          <motion.div
            key={hat.label}
            ref={el => hatRefs.current[index] = el}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: [
                -50, 
                0
              ],
              opacity: [0, 1]
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: "easeOut"
            }}
            drag
            dragConstraints={{ left: -600, right: 600, top: -200, bottom: 600 }}
            dragElastic={0.5}
            className="pointer-events-auto cursor-grab"
            style={{ zIndex: 100 }}
            whileDrag={{ scale: 1.15 }}
            onDragEnd={() => {
              const hatElem = hatRefs.current[index];
              const hatRect = hatElem ? hatElem.getBoundingClientRect() : null;
              const zachRect = zachRef.current ? zachRef.current.getBoundingClientRect() : null;
              if (hatRect && zachRect && isOverlapping(hatRect, zachRect)) {
                router.push(hat.href);
              }
            }}
          >
            <motion.div 
              className="w-28 h-28 relative group-hover:scale-110 transition-transform pointer-events-auto"
              variants={createAnimationVariant(index % 3)}
              initial="initial"
              animate="animate"
            >
              <Image
                src={hat.image}
                alt={hat.label}
                fill
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Many Hats Title + Zach (Stacked) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[120px] flex flex-col items-center z-30 space-y-8">
        <motion.h1 
          className="text-white text-[7rem] font-semibold italic tracking-tight leading-none tk-benton-modern-display"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Many Hats
        </motion.h1>
        {/* New Zach Puppet */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <ZachPuppet zachRef={zachRef} />
        </motion.div>
      </div>
    </main>
  )
}
