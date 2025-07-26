'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function MusicPage()   {
  const router = useRouter()
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
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)
  const [activeSection, setActiveSection] = useState('albumcover')

  // Dynamic sections based on active overlay
  const getSections = (overlay) => {
    if (overlay === 'outside') {
      return [
        { id: 'albumcover', label: 'Album Cover' },
        { id: 'music', label: 'Music' },
        { id: 'merch', label: 'Merch' },
        { id: 'content', label: 'Content' },
      ];
    }
    return [];
  };
  
  const sections = getSections(activeOverlay);

  // Project descriptions
  const projectDescriptions = {
    outside: {
      title: "Outside",
      tagline: "pressures, unease, and beauty of navigating your 20s.",
      description: "For the EP cover, I embraced my creativity and resourcefulness. Using model train parts, a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that embodied the essence of Outside. It was a way to bring the physical world into the project and reflect the vibe of the project.",
      sections: {
        albumcover: {
          title: "Album Cover",
          tagline: "Creative process behind the cover.",
          description: "For the EP cover, I embraced my creativity and resourcefulness. Using model train parts, a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that embodied the essence of Outside."
        },
        music: {
          title: "Music",
          tagline: "The sounds of Outside.",
          description: "Visual documentation of the recording process and creative sessions that brought the Outside EP to life."
        },
        merch: {
          title: "Merch",
          tagline: "Physical manifestations of the project.",
          description: "Merchandise and physical items created to extend the Outside experience beyond just the music."
        },
        content: {
          title: "Content",
          tagline: "Behind the scenes content.",
          description: "Additional content and behind-the-scenes materials from the Outside project."
        }
      }
    }
  }

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
    if (activeOverlay) {
      setIsCollapsed(false)
      // Set the default active section to the first section of the overlay
      if (activeOverlay === 'outside') {
        setActiveSection('albumcover')
      }
    }
  }, [activeOverlay])

  useEffect(() => {
    setHasMounted(true)
    setWindowWidth(window.innerWidth)
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setIsMobile(window.innerWidth < 768)
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
      {/* Home Icon - Top Left - Only on main music page */}
      {!activeOverlay && (
        <button
          onClick={() => router.push('/')}
          className="fixed top-6 left-6 z-[1001] cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ pointerEvents: 'auto' }}
        >
          <Image 
            src="/images/home-icon.svg" 
            alt="Home" 
            width={60} 
            height={60} 
            className="drop-shadow-lg"
          />
        </button>
      )}

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

        {/* Project Overlays */}
        <AnimatePresence>
          {activeOverlay && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="fixed top-0 left-0 w-full h-full z-[999] bg-[#FAF8E9] flex flex-col md:flex-row"
              style={{ cursor: 'auto' }}
            >
              {/* Left Scrollable Column with Project Images */}
              <LeftColumnImages
                activeOverlay={activeOverlay}
                setActiveOverlay={setActiveOverlay}
                setActiveSection={setActiveSection}
                sections={sections}
                activeSection={activeSection}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
              />
              
              {/* Right Fixed Column with Project Info */}
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    key="expanded"
                    initial={hasToggled ? { y: '-100%' } : false}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="order-1 md:order-2 md:w-[40%] w-full md:h-full h-auto p-6 md:p-12 pb-16 relative text-center md:text-left overflow-visible md:overflow-hidden"
                  >
                  {/* MOBILE LAYOUT */}
                  <div className="md:hidden">
                    {/* Back button for mobile - top left */}
                    <button
                      onClick={() => {
                        setActiveOverlay(null)
                        setHasToggled(false)
                      }}
                      className="fixed top-4 left-4 z-[1000] cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Image 
                        src="/images/back-arrow.svg" 
                        alt="Back" 
                        width={32} 
                        height={32} 
                      />
                    </button>

                    {/* Mobile view star and title */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-[100px] h-[100px]" style={{ top: '-25px' }}>
                      {/* Back star (shadow) */}
                      <motion.div
                        className="absolute"
                        style={{ left: '-10px', top: '10px' }}
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
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </motion.div>
                      
                      {/* Front star */}
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
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </motion.div>
                      
                      {/* Star text */}
                      <div
                        className="absolute font-benton-compressed text-[1rem] z-10"
                        style={{
                          left: '50px',
                          top: '50px',
                          transform: 'translate(-50%, -50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#202020',
                          pointerEvents: 'none',
                          lineHeight: '0.8'
                        }}
                      >
                        Outside
                      </div>
                    </div>

                    {/* Title and description */}
                    <div className="text-center" style={{ marginTop: '70px', marginBottom: '10px' }}>
                      <div className="text-[#202020] font-benton-compressed text-2xl md:text-4xl leading-none mb-4">
                        {(activeOverlay === 'outside' && projectDescriptions.outside.sections[activeSection]) ?
                          projectDescriptions.outside.sections[activeSection].tagline :
                          "pressures, unease, and beauty of navigating your 20s."
                        }
                      </div>
                      <p className="text-sm md:text-base text-[#202020] leading-normal font-benton">
                        {(activeOverlay === 'outside' && projectDescriptions.outside.sections[activeSection]) ?
                          projectDescriptions.outside.sections[activeSection].description :
                          "For the EP cover, I embraced my creativity and resourcefulness. Using model train parts, a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that embodied the essence of Outside. It was a way to bring the physical world into the project and reflect the vibe of the project."
                        }
                      </p>
                    </div>

                    {/* Navigation menu - horizontal and center aligned at bottom - FOR OUTSIDE */}
                    {activeOverlay === 'outside' && (
                      <div className="flex justify-center">
                        <HorizontalScrollSpyNav
                          sections={sections}
                          activeSection={activeSection}
                          onNavClick={(id) => {
                            const leftCol = document.querySelector('.order-2');
                            if (leftCol) {
                              const sectionEl = leftCol.querySelector(`#${id}`);
                              if (sectionEl) {
                                sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                              }
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Collapse toggle - positioned at bottom of overlay - MOBILE ONLY */}
                  <div className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-[1002]">
                    <button
                      onClick={() => {
                        setHasToggled(true)
                        setIsCollapsed(true)
                      }}
                      className="bg-[#FAF8E9] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#F5F3E5] transition-colors border border-[#202020]/10"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#202020" strokeWidth="2">
                        <path d="M18 15l-6-6-6 6"/>
                      </svg>
                    </button>
                  </div>

                  {/* DESKTOP LAYOUT */}
                  <div className="hidden md:block">
                    {/* Sticky ScrollSpyNav at top left - for outside overlay */}
                    {activeOverlay === 'outside' && (
                      <div className="sticky top-0 left-0 z-10 pt-2 pb-4" style={{ background: 'none' }}>
                        <ScrollSpyNav
                          sections={sections}
                          activeSection={activeSection}
                          onNavClick={(id) => {
                            // Scroll the left column to the section
                            const leftCol = document.querySelector('.order-2');
                            if (leftCol) {
                              const sectionEl = leftCol.querySelector(`#${id}`);
                              if (sectionEl) {
                                sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                              }
                            }
                          }}
                        />
                      </div>
                    )}

                    {/* Desktop view star */}
                    <div className="absolute" style={{ top: '-30px', right: '-70px', width: '25vw', height: '25vw', maxWidth: '425px', maxHeight: '425px' }}>
                      {/* Back star (shadow) */}
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
                      
                      {/* Front star */}
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
                      
                      {/* Star text */}
                      <div
                        className="absolute font-benton-compressed text-[4.5vw] z-10"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#202020',
                          pointerEvents: 'none',
                          lineHeight: '0.8'
                        }}
                      >
                        Outside
                      </div>
                    </div>
                    
                    <div className="mt-[250px] text-[#202020] font-benton-compressed text-6xl md:text-8xl text-right" style={{ lineHeight: '0.8' }}>
                      {(activeOverlay === 'outside' && projectDescriptions.outside.sections[activeSection]) ?
                        projectDescriptions.outside.sections[activeSection].tagline :
                        "pressures, unease, and beauty of navigating your 20s."
                      }
                    </div>
                    <p className="text-base md:text-lg text-[#202020] mt-6 md:mt-8 leading-normal font-benton text-right">
                      {(activeOverlay === 'outside' && projectDescriptions.outside.sections[activeSection]) ?
                        projectDescriptions.outside.sections[activeSection].description :
                        "For the EP cover, I embraced my creativity and resourcefulness. Using model train parts, a piece of foam, and a candle box from IKEA, I crafted a visually captivating cover that embodied the essence of Outside. It was a way to bring the physical world into the project and reflect the vibe of the project."
                      }
                    </p>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed Tab - Mobile Only - AT TOP */}
              <AnimatePresence mode="wait">
                {isCollapsed && (
                  <motion.div
                    key="collapsed"
                    initial={hasToggled ? { y: '-100%' } : false}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="md:hidden fixed top-0 left-0 right-0 z-[1000] bg-[#FAF8E9] border-b border-[#202020]/20"
                  >
                  <div className="flex items-center justify-between p-4">
                    {/* Back button */}
                    <button
                      onClick={() => {
                        setActiveOverlay(null)
                        setHasToggled(false)
                      }}
                      className="cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Image 
                        src="/images/back-arrow.svg" 
                        alt="Back" 
                        width={24} 
                        height={24} 
                      />
                    </button>

                    {/* Current section name */}
                    <div className="flex-1 text-center font-benton-compressed text-lg text-[#202020]">
                      {(activeOverlay === 'outside' && projectDescriptions.outside.sections[activeSection]) ?
                        projectDescriptions.outside.sections[activeSection].title :
                        "Outside"
                      }
                    </div>

                    {/* Empty space for symmetry */}
                    <div className="w-6"></div>
                  </div>

                  {/* Bottom expand toggle */}
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-[1002]">
                    <button
                      onClick={() => {
                        setHasToggled(true)
                        setIsCollapsed(false)
                      }}
                      className="bg-[#FAF8E9] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#F5F3E5] transition-colors border border-[#202020]/10"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#202020" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

// Left Column Images Component
function LeftColumnImages({ activeOverlay, setActiveOverlay, setActiveSection, sections, activeSection, isCollapsed, isMobile }) {
  const leftColRef = useRef(null);

  // ScrollSpy: update active section on scroll
  useEffect(() => {
    const ref = leftColRef.current;
    if (!ref || sections.length === 0) return;
    
    const handleScroll = () => {
      const parentRect = ref.getBoundingClientRect();
      let newActiveSection = null;

      // Check if we're near the bottom of the scroll container
      const scrollTop = ref.scrollTop;
      const scrollHeight = ref.scrollHeight;
      const clientHeight = ref.clientHeight;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      // If near bottom, set last section as active
      if (isNearBottom && sections.length > 0) {
        newActiveSection = sections[sections.length - 1].id;
      } else {
        if (isMobile) {
          // Mobile: find the section whose top is closest to the top of viewport (but still visible)
          let closestSection = null;
          let closestDistance = Infinity;

          for (const section of sections) {
            const el = ref.querySelector(`#${section.id}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              const sectionTop = rect.top - parentRect.top;
              const sectionHeight = rect.height;
              
              // For short sections, be more lenient with detection
              const threshold = sectionHeight < 200 ? 150 : 100;
              
              // Section is visible and its top is within viewport
              if (sectionTop <= threshold && sectionTop >= -rect.height) {
                const distance = Math.abs(sectionTop);
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestSection = section.id;
                }
              }
            }
          }

          if (closestSection) {
            newActiveSection = closestSection;
          }
        } else {
          // Desktop: use midpoint logic but with adjustments for short sections
          const viewportMidpoint = parentRect.height / 2;
          
          for (const section of sections) {
            const el = ref.querySelector(`#${section.id}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              const sectionTopRelativeToParent = rect.top - parentRect.top;
              const sectionBottomRelativeToParent = rect.bottom - parentRect.top;
              const sectionHeight = rect.height;

              // For very short sections, use top-quarter detection instead of midpoint
              if (sectionHeight < 200) {
                const topQuarter = parentRect.height * 0.3;
                if (sectionTopRelativeToParent <= topQuarter && sectionBottomRelativeToParent > 0) {
                  newActiveSection = section.id;
                  break;
                }
              } else {
                // Normal midpoint detection for taller sections
                if (sectionTopRelativeToParent <= viewportMidpoint && sectionBottomRelativeToParent > viewportMidpoint) {
                  newActiveSection = section.id;
                  break;
                }
              }
            }
          }
        }
      }

      // Only update if the section actually changed and sections exist
      if (newActiveSection && newActiveSection !== activeSection && sections.length > 0) {
        setActiveSection(newActiveSection);
      }
    };
    
    ref.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => ref.removeEventListener('scroll', handleScroll);
  }, [sections, isMobile]); // Key fix: removed activeSection from dependencies

  return (
    <div 
      ref={leftColRef}
      className="order-2 md:order-1 md:w-[60%] w-full h-full overflow-y-scroll relative p-0 m-0"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#202020 #FAF8E9',
        padding: 0,
        margin: 0,
      }}
    >
      <style jsx global>{`
        .order-2::-webkit-scrollbar { width: 8px; }
        .order-2::-webkit-scrollbar-track { background: #FAF8E9; }
        .order-2::-webkit-scrollbar-thumb { background-color: #202020; border-radius: 4px; border: 2px solid #FAF8E9; }
      `}</style>
      
      {/* Back button - DESKTOP ONLY */}
      <button
        onClick={() => setActiveOverlay(null)}
        className="hidden md:block fixed top-6 left-6 z-[1000] cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        <Image 
          src="/images/back-arrow.svg" 
          alt="Back" 
          width={40} 
          height={40} 
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))' }}
        />
      </button>

      {activeOverlay === 'outside' && (
        <div className="w-full">
          <div id="albumcover">
            <Image
              src="/images/outside-cover.jpg"
              alt="Outside album cover"
              width={800}
              height={800}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <div className="grid grid-cols-2 gap-4 p-4">
              <Image
                src="/images/outside/59815894100__84E974C9-8D63-4EA1-B181-950697974B94-1.jpeg"
                alt="Outside project"
                width={400}
                height={600}
                className="w-full object-contain"
                style={{margin: 0, padding: 0}}
              />
              <Image
                src="/images/outside/IMG_2976.jpeg"
                alt="Outside project"
                width={400}
                height={600}
                className="w-full object-contain"
                style={{margin: 0, padding: 0}}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <video 
                controls 
                className="w-full object-contain"
                style={{margin: 0, padding: 0}}
                poster="/images/outside/IMG_0799.jpeg"
              >
                <source src="/images/outside/815f4145a2d14eaca2f0dd7f2e350ce8.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video 
                controls 
                className="w-full object-contain"
                style={{margin: 0, padding: 0}}
              >
                <source src="/images/outside/IMG_0782.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
            <Image
              src="/images/outside/IMG_0799.jpeg"
              alt="Outside project"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="music">
            {/* Spotify Album Embed */}
            <div style={{borderRadius: '0', overflow: 'hidden', margin: '0 0 16px 0'}}>
              <iframe 
                style={{border: 'none', margin: 0, padding: 0, display: 'block'}} 
                src="https://open.spotify.com/embed/album/4pIX210BAdULta4cK2H2cl?utm_source=generator" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>
          <div id="merch">
            <Image
              src="/images/outside/IMG_1248.jpeg"
              alt="Outside merch"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/outside/IMG_1250.jpeg"
              alt="Outside merch"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="content">
            <Image
              src="/images/outside/IMG_0798-1.jpeg"
              alt="Outside content"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ScrollSpy Navigation Component for Desktop
function ScrollSpyNav({ sections, activeSection, onNavClick }) {
  // For animated highlight bar
  const navRefs = useRef([]);
  const [highlightStyle, setHighlightStyle] = useState({ top: 0, width: 0, height: 0 });

  useEffect(() => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (navRefs.current[idx]) {
      const el = navRefs.current[idx];
      const lineHeight = 2; // Desired height of the horizontal line
      const lineWidth = 15; // Desired width of the horizontal line
      setHighlightStyle({
        top: el.offsetTop + (el.offsetHeight / 2) - (lineHeight / 2),
        width: lineWidth,
        height: lineHeight
      });
    }
  }, [activeSection, sections]);

  return (
    <nav className="relative flex flex-col items-start font-benton-compressed text-[1.5rem] sticky top-0 left-0 z-10" style={{padding: 0, margin: 0, background: 'none'}}>
      {/* Animated highlight bar */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute left-[-1.5rem] rounded bg-[#202020]"
        style={{
          top: highlightStyle.top,
          height: highlightStyle.height,
          width: highlightStyle.width,
          borderRadius: '2px',
        }}
      />
      {sections.map((section, idx) => (
        <button
          key={section.id}
          ref={el => navRefs.current[idx] = el}
          onClick={() => onNavClick(section.id)}
          className={`relative text-left transition-colors duration-300 w-full ${activeSection === section.id ? 'font-bold' : 'font-normal'}`}
          style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', minHeight: '2.5rem', display: 'flex', alignItems: 'center', color: activeSection === section.id ? '#202020' : '#bdbdbd', transition: 'color 0.3s' }}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

// Horizontal Navigation Component for Mobile
function HorizontalScrollSpyNav({ sections, activeSection, onNavClick }) {
  // Dynamically split sections for different layouts
  const midpoint = Math.ceil(sections.length / 2);
  const firstLine = sections.slice(0, midpoint);
  const secondLine = sections.slice(midpoint);
  
  return (
    <nav className="flex flex-col items-center gap-y-2 font-benton-compressed text-sm">
      {/* First line */}
      <div className="flex gap-x-4">
        {firstLine.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavClick(section.id)}
            className={`relative transition-colors duration-300 px-2 py-1 ${activeSection === section.id ? 'font-bold text-[#202020]' : 'font-normal text-[#bdbdbd]'}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {section.label}
            {activeSection === section.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#202020] rounded"></div>
            )}
          </button>
        ))}
      </div>
      {/* Second line - only show if there are items */}
      {secondLine.length > 0 && (
        <div className="flex gap-x-4">
          {secondLine.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavClick(section.id)}
              className={`relative transition-colors duration-300 px-2 py-1 ${activeSection === section.id ? 'font-bold text-[#202020]' : 'font-normal text-[#bdbdbd]'}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {section.label}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#202020] rounded"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}