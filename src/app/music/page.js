'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function MusicPage()   {
  const projects = [
    {
      title: "Songwriting",
      image: "/images/music/songwriting.jpg",
      href: "/music/songwriting"
    },
    {
      title: "Production",
      image: "/images/music/production.jpg", 
      href: "/music/production"
    },
    {
      title: "Performance",
      image: "/images/music/performance.jpg",
      href: "/music/performance"
    }
  ]

  const collageImages = [
    { src: '/images/cradenza.png', left:-250, top: 452, width: 667, height: 406, mobilePosition: { left: -480, top: 452 } },
    { src: '/images/window-plant.png', left: 1183, top: 183, width: 493, height: 606, mobilePosition: { left: 350 } },
    { src: '/images/speaker-r.png', left: 1488, top: 429, width: 235, height: 342, mobilePosition: { left: 720, top: 429 } },
    { src: '/images/couch.png', left: 90, top: 626, width: 1716, height: 1035, mobilePosition: { left: -500, scale: 1.3 } },
    { src: '/images/zach-music.png', left: 659, top: 627, width: 511.2, height: 380, mobilePosition: { left: 0, scale: 1.2 } },
    { src: '/images/table.png', left: 603, top: 942, width: 482.63, height: 370, mobilePosition: { left: 100, top: 942 } },
    { src: '/images/couch-front.png', left: 988, top: 1058, width: 817, height: 453, mobilePosition: { left: 280, top: 1108 } },
    { src: '/images/poster.png', left: 400, top: 306.81, width: 182.36, height: 224.13, mobilePosition: { left: 70, top: 66.81 } },
    { src: '/images/outside.png', left: 1150, top: 800, width: 150, height: 150, href: '/music/outside', mobilePosition: { left: 450, top: 704, scale: 4, mobileWidth: 250, mobileHeight: 250 } },
    { src: '/images/musicvideos.png', left: -120, top: 160, width: 500, height: 300, href: '/music/musicvideos', mobilePosition: { left: -470, top: 160, scale: 3, mobileWidth: 600, mobileHeight: 360 } },
    { src: '/images/content.png', left: 730, top: 980, width: 100, height: 200, href: '/music/content', mobilePosition: { left: 130, top: 980, scale: 3, mobileWidth: 150, mobileHeight: 300 } },
    { src: '/images/singlecovers.png', left: 600, top: 480, width: 150, height: 150, href: '/music/singlecovers', mobilePosition: { left: 110, top: 290, scale: 4, mobileWidth: 250, mobileHeight: 250 } },
  ]

  function getInitialPosition(left, top) {
    const directions = [
      { x: -300, y: -200 },
      { x: 300, y: -200 },
      { x: -300, y: 200 },
      { x: 300, y: 200 }
    ]
    const direction = directions[Math.floor(Math.random() * directions.length)]
    return { ...direction, opacity: 0 }
  }

  const [scale, setScale] = useState(1)
  const [hasMounted, setHasMounted] = useState(false)
  const [activeOverlay, setActiveOverlay] = useState(null)
  const [windowWidth, setWindowWidth] = useState(0)

  const createAnimationVariant = (index) => ({
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.2, 1, 1.2, 1],
      rotate: [-4, 4, -4, 4, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.3,
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

  useEffect(() => {
    const updateScale = () => {
      const newScale = Math.min(1, window.innerWidth / 1280, window.innerHeight / 1024)
      setScale(newScale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
<main
  className="w-screen h-screen bg-black text-white flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: 'url("/images/music-background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
        <div className="absolute top-12 left-0 w-full z-50 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-[10rem] font-bold font-benton text-white space-x-16 w-[200%] leading-[1.2]">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                music & personal projects
                <Image src="/images/star.svg" alt="star" width={50} height={50} className="inline-block align-middle translate-y-1" />
              </span>
            ))}
          </div>
        </div>
      <div className="flex items-center justify-center w-full h-full relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="relative"
            style={{
              width: 1280,
              height: 1024,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            {hasMounted && (
              <div
                className="absolute inset-0"
                style={{
                  transform: 'scale(0.9)',
                  transformOrigin: 'top left',
                }}
              >
                {collageImages.map((img, index) => (
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
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: windowWidth < 768 && img.mobilePosition && img.mobilePosition.top 
                        ? img.mobilePosition.top 
                        : img.top,
                      left: windowWidth < 768 && img.mobilePosition 
                        ? img.mobilePosition.left 
                        : (img.centerOnMobile && windowWidth < 768 ? '50%' : img.left),
                      width: windowWidth < 768 && img.mobilePosition && img.mobilePosition.mobileWidth
                        ? img.mobilePosition.mobileWidth
                        : img.width,
                      height: windowWidth < 768 && img.mobilePosition && img.mobilePosition.mobileHeight
                        ? img.mobilePosition.mobileHeight
                        : img.height,
                      zIndex: index,
                      transform: `${
                        img.src.includes('wall-r.png') 
                          ? 'scaleX(-1)' 
                          : ''
                      }${
                        img.centerOnMobile && windowWidth < 768 
                          ? 'translateX(-50%)' 
                          : ''
                      }${
                        windowWidth < 768 && img.mobilePosition && img.mobilePosition.scale
                          ? ` scale(${img.mobilePosition.scale})` 
                          : ''
                      }`
                    }}
                  >
                    {img.href ? (
                      <motion.div 
                        onClick={() => img.href === '/music/outside' && setActiveOverlay('outside')}
                        className={`${img.href ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}
                        variants={createAnimationVariant(index % 4)}
                        initial="initial"
                        animate="animate"
                      >
                        <Image
                          src={img.src}
                          alt=""
                          width={windowWidth < 768 && img.mobilePosition && img.mobilePosition.mobileWidth ? img.mobilePosition.mobileWidth : img.width}
                          height={windowWidth < 768 && img.mobilePosition && img.mobilePosition.mobileHeight ? img.mobilePosition.mobileHeight : img.height}
                          className="object-contain cursor-pointer"
                          priority
                        />
                      </motion.div>
                    ) : (
                      <Image
                        src={img.src}
                        alt=""
                        width={img.width}
                        height={img.height}
                        className="object-contain"
                        priority
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        <motion.div className="absolute top-[578px] left-0 z-50">
          <Image 
            src="/images/speaker-l.png" 
            alt="" 
            width={320} 
            height={180} 
            className="w-[150px] md:w-[320px]"
            priority 
          />
        </motion.div>

        {/* Case Study Overlay */}
        <AnimatePresence>
          {activeOverlay === 'outside' && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="fixed top-0 left-0 w-full h-full z-[999] bg-[#FAF8E9] md:flex md:flex-row"
            >
              {/* Back button */}
              <button
                onClick={() => setActiveOverlay(null)}
                className="fixed top-6 left-6 z-[1000] cursor-pointer"
              >
                <Image src="/images/back-arrow.svg" alt="Back" width={40} height={40} />
              </button>

              {/* Mobile view - all content scrolls naturally */}
              <div className="md:hidden w-full h-full overflow-y-auto pt-20 px-6">
                <div className="flex flex-col items-center text-center">
                  {/* Star */}
                  <div className="relative w-[220px] h-[220px] mb-6">
                    {/* Back star (shadow) - rotates in same direction at same speed */}
                    <motion.div
                      className="absolute"
                      style={{ left: '-20px', top: '20px' }}
                      animate={{ 
                        rotate: 360 
                      }}
                      transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Image
                        src="/images/star-background.svg"
                        alt="Star Badge Shadow"
                        width={220}
                        height={220}
                        className="object-contain"
                      />
                    </motion.div>
                    
                    {/* Front star - rotates clockwise */}
                    <motion.div
                      className="absolute"
                      style={{ left: '0', top: '0' }}
                      animate={{ 
                        rotate: 360 
                      }}
                      transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Image
                        src="/images/star-front.svg"
                        alt="Star Badge"
                        width={220}
                        height={220}
                        className="object-contain"
                      />
                    </motion.div>
                    
                    {/* Star text - perfectly centered on the front star */}
                    <div
                      className="absolute font-bold font-benton text-[1.5rem] z-10"
                      style={{
                        left: '110px',
                        top: '110px',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#202020',
                        pointerEvents: 'none'
                      }}
                    >
                      Outside
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="text-[#202020] font-benton text-4xl leading-tight mb-6">
                    pressures, unease, and beauty of navigating your 20s.
                  </div>
                  
                  {/* Description */}
                  <p className="text-base text-[#202020] mb-8 leading-relaxed font-benton">
                    For the EP cover, I embraced my creativity and resourcefulness. Using model train parts,
                    a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that
                    embodied the essence of "Outside." It was a way to bring the physical world into the project
                    and reflect the vibe of the project.
                  </p>
                  
                  {/* Images */}
                  <Image
                    src="/images/outside-cover.jpg"
                    alt="Outside project"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain mb-8"
                    priority
                  />
                  
                  <div className="w-full space-y-8">
                    <Image
                      src="/images/outside/IMG_0799.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Image
                        src="/images/outside/59815894100__84E974C9-8D63-4EA1-B181-950697974B94-1.jpeg"
                        alt="Outside project"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                      
                      <Image
                        src="/images/outside/IMG_2976.jpeg"
                        alt="Outside project"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    
                    <Image
                      src="/images/outside/IMG_0798-1.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <Image
                      src="/images/outside/IMG_1248.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <Image
                      src="/images/outside/IMG_1250.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    {/* Videos */}
                    <video 
                      controls 
                      className="w-full h-auto mb-6"
                      poster="/images/outside/IMG_0799.jpeg"
                    >
                      <source src="/images/outside/815f4145a2d14eaca2f0dd7f2e350ce8.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <video 
                      controls 
                      className="w-full h-auto mb-6"
                    >
                      <source src="/images/outside/IMG_0782.mov" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              {/* Desktop view - remains the same with left and right columns */}
              <div className="hidden md:flex md:flex-row w-full h-full">
                {/* Left Scrollable Column */}
                <div 
                  className="order-1 w-[60%] h-full overflow-y-scroll p-12 flex flex-col items-center" 
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#202020 #FAF8E9',
                  }}
                >
                  <style jsx global>{`
                    /* Webkit browsers (Chrome, Safari) */
                    .order-1::-webkit-scrollbar {
                      width: 8px;
                    }
                    .order-1::-webkit-scrollbar-track {
                      background: #FAF8E9;
                    }
                    .order-1::-webkit-scrollbar-thumb {
                      background-color: #202020;
                      border-radius: 4px;
                      border: 2px solid #FAF8E9;
                    }
                  `}</style>
                  <Image
                    src="/images/outside-cover.jpg"
                    alt="Outside project"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain mb-8"
                    priority
                  />
                  
                  <div className="w-full space-y-8">
                    <Image
                      src="/images/outside/IMG_0799.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Image
                        src="/images/outside/59815894100__84E974C9-8D63-4EA1-B181-950697974B94-1.jpeg"
                        alt="Outside project"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                      
                      <Image
                        src="/images/outside/IMG_2976.jpeg"
                        alt="Outside project"
                        width={400}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    
                    <Image
                      src="/images/outside/IMG_0798-1.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <Image
                      src="/images/outside/IMG_1248.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    <Image
                      src="/images/outside/IMG_1250.jpeg"
                      alt="Outside project"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain mb-6"
                    />
                    
                    {/* Videos */}
                    <video 
                      controls 
                      className="w-full h-auto mb-6"
                      poster="/images/outside/IMG_0799.jpeg"
                    >
                      <source src="/images/outside/815f4145a2d14eaca2f0dd7f2e350ce8.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <video 
                      controls 
                      className="w-full h-auto mb-6"
                    >
                      <source src="/images/outside/IMG_0782.mov" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Right Fixed Column */}
                <div className="order-2 w-[40%] h-full overflow-y-auto p-12 pr-[0px] relative text-left">
                  <div className="static">
                    {/* Star in desktop view */}
                    <div className="absolute" style={{ top: '-30px', right: '-70px', width: '25vw', height: '25vw', maxWidth: '425px', maxHeight: '425px' }}>
                      {/* Back star (shadow) - rotates in same direction at same speed */}
                      <motion.div
                        className="absolute"
                        style={{ left: '-50px', top: '30px', width: '100%', height: '100%' }}
                        animate={{ 
                          rotate: 360 
                        }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Image
                          src="/images/star-background.svg"
                          alt="Star Badge Shadow"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      {/* Front star - rotates clockwise */}
                      <motion.div
                        className="absolute"
                        style={{ left: '0', top: '0', width: '100%', height: '100%' }}
                        animate={{ 
                          rotate: 360 
                        }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Image
                          src="/images/star-front.svg"
                          alt="Star Badge"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      {/* Star text - perfectly centered on the front star */}
                      <div
                        className="absolute font-bold font-benton text-[3.5vw] z-10"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#202020',
                          pointerEvents: 'none'
                        }}
                      >
                        Outside
                      </div>
                    </div>
                    
                    <div className="mt-[400px] w-[80%] text-[#202020] font-benton text-6xl leading-tight">
                      pressures, unease, and beauty of navigating your 20s.
                    </div>
                    
                    <p className="text-lg text-[#202020] mt-8 w-[80%] leading-relaxed font-benton">
                      For the EP cover, I embraced my creativity and resourcefulness. Using model train parts,
                      a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that
                      embodied the essence of "Outside." It was a way to bring the physical world into the project
                      and reflect the vibe of the project.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

