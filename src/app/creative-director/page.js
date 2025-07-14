'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CreativePage() {
  const router = useRouter()

  // Enhanced collage image system with more mobile controls
  const collageImages = [
    { 
      src: '/images/creative/desk.png', 
      desktop: { left: -230, top: 150, width: 2000, height: 1134 },
      mobile: { left: -1950, top: -300, width: 4500, height: 907, scale: 0.8, zIndex: 1 }
    },
    { 
      src: '/images/creative/sorette.png', 
      desktop: { left: 880, top: 130, width: 800, height: 761 },
      mobile: { left: 100, top: 0, width: 943, height: 380, scale: 0.5, zIndex: 10 },
      overlay: 'sorette'
    },
    { 
      src: '/images/creative/gas.png', 
      desktop: { left: 1178.38, top: 805, width: 474, height: 328 },
      mobile: { left:280, top: 1050, width: 724, height: 197, scale: 0.6, zIndex: 14 },
      overlay: 'gas'
    },
    { 
      src: '/images/creative/omi.png', 
      desktop: { left: 230, top: 450, width: 306, height: 396 },
      mobile: { left: -20, top: 300, width: 414, height: 277, scale: 0.7, zIndex: 12 },
      overlay: 'omi'
    },
    { 
      src: '/images/creative/chambord.png', 
      desktop: { left: -250, top: 841, width: 549, height: 300 },
      mobile: { left: -510, top: 850, width: 892, height: 195, scale: 0.65, zIndex: 13 },
      overlay: 'chambord'
    },
    { 
      src: '/images/creative/landmade.png', 
      desktop: { left: -300, top: 202, width: 600, height: 433 },
      mobile: { left: -500, top: 100, width: 624, height: 238, scale: 0.55, zIndex: 14 },
      overlay: 'landmade'
    },
    { 
      src: '/images/creative/colorblock.png', 
      desktop: { left: 700, top: 565.5, width: 455, height: 152 },
      mobile: { left: 300, top: 750, width: 541, height: 114, scale: 0.75, zIndex: 15 },
      overlay: 'colorblock'
    },
    { 
      src: '/images/creative/them.png', 
      desktop: { left: 1021.48, top: 691, width: 323, height: 333 },
      mobile: { left: 420, top: 900, width: 494, height: 200, scale: 0.6, zIndex: 16 },
      overlay: 'them'
    },
    { 
      src: '/images/creative/screen.png', 
      desktop: { left: 76, top: 198, width: 1273, height: 327 },
      mobile: { left: -700, top: -200, width: 1891, height: 229, scale: 0.7, zIndex: 19 }
    },
    { 
      src: '/images/creative/keysandmouse.png', 
      desktop: { left: 380, top: 809, width: 778, height: 258 },
      mobile: { left: -650, top: 1520, width: 1845, height: 181, scale: 0.7, zIndex: 16 }
    },
    { 
      src: '/images/creative/arm-l.png', 
      desktop: { left: 197, top: 868, width: 486, height: 375 },
      mobile: { left: -900, top: 1580, width: 1216, height: 244, scale: 0.65, zIndex: 24 },
      isHand: true
    },
    { 
      src: '/images/creative/arm-r.png', 
      desktop: { left: 1019, top: 921, width: 486, height: 485 },
      mobile: { left: 800, top: 1600, width: 1216, height: 315, scale: 0.65, zIndex: 25 },
      isHand: true,
      isCursor: true,
      // Define the hotspot (fingertip) location relative to the image
      cursorHotspot: { 
        x: 100, // Adjust this value to move the fingertip horizontally
        y: -40  // Adjust this value to move the fingertip vertically
      }
    },
  ]

  // Project descriptions
  const projectDescriptions = {
    sorette: {
      title: "Sorette",
      tagline: "Elevated essentials for modern motherhood.",
      description: "Designed for a European-inspired wellness brand built for expecting moms. I led visual identity and UX storytelling across packaging, e-commerce, and social.",
      sections: {
        webdesign: {
          title: "Web Design",
          tagline: "Elevated essentials for modern motherhood.",
          description: "Designed for a European-inspired wellness brand built for expecting moms. I led visual identity and UX storytelling across packaging, e-commerce, and social."
        }
      }
    },
    gas: {
      title: "The Gas Station",
      tagline: "Supercharging Gen Z social connections.",
      description: "Product design for a viral social app acquired by Discord. I led design strategy from early sketches through user testing to launch and beyond.",
      sections: {
        supercoolsign: {
          title: "Super Cool Sign",
          tagline: "Eye-catching signage design.",
          description: "Creating bold, attention-grabbing signage that captures the energy and vibe of The Gas Station brand experience."
        },
        moodboard: {
          title: "Mood Board",
          tagline: "Visual inspiration and direction.",
          description: "Curated mood board showcasing the aesthetic inspiration, color palettes, and visual references that guided the brand development process."
        },
        branding: {
          title: "Branding",
          tagline: "Supercharging Gen Z social connections.",
          description: "Product design for a viral social app acquired by Discord. I led design strategy from early sketches through user testing to launch and beyond."
        }
      }
    },
    omi: {
      title: "Omi Health",
      tagline: "Revolutionizing personal care with innovation.",
      description: "Brand identity and packaging design for a breakthrough personal care brand. Created a bold visual system that stands out in a crowded marketplace.",
      sections: {
        branding: {
          title: "Branding",
          tagline: "Bold brand identity for personal care.",
          description: "Creating a distinctive visual language that communicates innovation and wellness in the personal care space."
        },
        posters: {
          title: "Posters",
          tagline: "Impactful visual communications.",
          description: "Dynamic poster designs that capture the energy and innovation of the Omi Health brand across various applications."
        },
        website: {
          title: "Website",
          tagline: "Digital experience design.",
          description: "User-centered web design that seamlessly integrates the brand identity with intuitive navigation and compelling storytelling."
        }
      }
    },
    chambord: {
      title: "Chambord",
      tagline: "Luxury liqueur with a French twist.",
      description: "Campaign development for this iconic brand. Crafted digital and print experiences that elevated the brand's premium positioning while driving engagement."
    },
    landmade: {
      title: "Landmade",
      tagline: "Handcrafted goods, direct from artisans.",
      description: "Full-scope brand identity and e-commerce design for this marketplace connecting craftspeople with consumers. Developed a system that showcased makers' stories.",
      sections: {
        branding: {
          title: "Branding",
          tagline: "The core identity for Landmade.",
          description: "Exploring the visual language and foundational elements that define the Landmade brand, from wordmark to initial icon concepts."
        },
        photoshoot: {
          title: "Photoshoot",
          tagline: "Capturing the essence of handcrafted goods.",
          description: "Behind-the-scenes and final images from photoshoots designed to highlight the authentic craftsmanship of Landmade products."
        },
        pricebook: {
          title: "Price Book",
          tagline: "Pricing and product catalog details.",
          description: "A comprehensive guide to product offerings, pricing structures, and specifications for Landmade's artisan collection."
        },
        website: {
          title: "Website",
          tagline: "Bringing the marketplace online.",
          description: "User experience and interface design for the Landmade e-commerce platform, focusing on seamless navigation and artisan storytelling."
        },
        finishesbox: {
          title: "Finishes Box",
          tagline: "Tangible brand experience for customers.",
          description: "Design and creation of a physical sample box showcasing the quality and variety of materials and finishes used in Landmade products."
        },
        displaymedia: {
          title: "Display Media",
          tagline: "Visual storytelling in various channels.",
          description: "Development of digital and print media assets for marketing and promotional campaigns, extending the Landmade brand across platforms."
        }
      }
    },
    colorblock: {
      title: "Colorblock",
      tagline: "Bold color theory meets practical design.",
      description: "Art direction for an experimental color theory project. Created a design system that pushes boundaries while maintaining visual harmony.",
      sections: {
        branding: {
          title: "Branding",
          tagline: "Bold color theory meets practical design.",
          description: "Art direction for an experimental color theory project. Created a design system that pushes boundaries while maintaining visual harmony."
        }
      }
    },
    them: {
      title: "Them",
      tagline: "Inclusive content for the modern era.",
      description: "Editorial design and art direction for a groundbreaking publication. Developed visual storytelling that resonates with diverse audiences."
    }
  }

  const [scale, setScale] = useState(1)
  const [hasMounted, setHasMounted] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [activeOverlay, setActiveOverlay] = useState(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)
  const [figmaLoading, setFigmaLoading] = useState({})
  // --- ScrollSpy state for overlays ---
  const [activeSection, setActiveSection] = useState('branding');
  
  // Dynamic sections based on active overlay
  const getSections = (overlay) => {
    if (overlay === 'landmade') {
      return [
        { id: 'branding', label: 'Branding' },
        { id: 'photoshoot', label: 'Photoshoot' },
        { id: 'pricebook', label: 'Price Book' },
        { id: 'website', label: 'Website' },
        { id: 'finishesbox', label: 'Finishes Box' },
        { id: 'displaymedia', label: 'Display Media' },
      ];
    } else if (overlay === 'omi') {
      return [
        { id: 'branding', label: 'Branding' },
        { id: 'posters', label: 'Posters' },
        { id: 'website', label: 'Website' },
      ];
    } else if (overlay === 'colorblock') {
      return [
        { id: 'branding', label: 'Branding' },
      ];
    } else if (overlay === 'gas') {
      return [
        { id: 'supercoolsign', label: 'Super Cool Sign' },
        { id: 'moodboard', label: 'Mood Board' },
        { id: 'branding', label: 'Branding' },
      ];
    } else if (overlay === 'sorette') {
      return [
        { id: 'webdesign', label: 'Web Design' },
      ];
    }
    return [];
  };
  
  const sections = getSections(activeOverlay);
  // --- ---

  useEffect(() => {
    if (activeOverlay) {
      setIsCollapsed(false)
      // Reset loading states for Figma embeds
      setFigmaLoading({})
      // Set the default active section to the first section of the overlay
      if (activeOverlay === 'landmade') {
        setActiveSection('branding')
      } else if (activeOverlay === 'omi') {
        setActiveSection('branding')
      } else if (activeOverlay === 'colorblock') {
        setActiveSection('branding')
      } else if (activeOverlay === 'gas') {
        setActiveSection('supercoolsign')
      } else if (activeOverlay === 'sorette') {
        setActiveSection('webdesign')
      }
    }
  }, [activeOverlay])

  useEffect(() => {
    setHasMounted(true)
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setIsMobile(window.innerWidth < 768)
      const newScale = Math.min(1, window.innerWidth / 1280, window.innerHeight / 1024)
      setScale(newScale)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="w-screen h-screen bg-black text-white flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/images/creative/creative-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: 'none', // Hide the default cursor
      }}
    >
      {/* Home Icon - Top Left - Only on main creative page */}
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

      {/* Scrolling Text Banner with top-0 and color #FFFDE6 */}
      <div className="absolute top-0 left-0 w-full z-50 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[10rem] font-bold font-benton space-x-16 w-[200%] leading-[1.2]" style={{ color: '#FFFDE6' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              Creative & Art Direction
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
              <div className="absolute inset-0" style={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}>
                {collageImages.map((img, index) => {
                  const isArmRight = img.src.includes('arm-r.png')
                  
                  // Get the appropriate position, size, and style based on device
                  const position = isMobile ? img.mobile : img.desktop
                  
                  // For cursor hand, calculate position to align fingertip with cursor
                  let motionProps;
                  if (isArmRight) {
                    const hotspot = img.cursorHotspot || { x: 0, y: 0 };
                    motionProps = {
                      animate: {
                        // Position the image so that the hotspot aligns with the cursor position
                        x: !isMobile ? mouse.x - position.left - hotspot.x : 0,
                        y: !isMobile ? mouse.y - position.top - hotspot.y : 0,
                        opacity: 1,
                      },
                      transition: {
                        type: 'spring',
                        stiffness: 800,
                        damping: 35,
                        mass: 0.5,
                      },
                    };
                  } else {
                    motionProps = {
                      initial: {
                        x: Math.random() > 0.5 ? -200 : 200,
                        y: Math.random() > 0.5 ? -150 : 150,
                        opacity: 0,
                      },
                      animate: { x: 0, y: 0, opacity: 1 },
                      transition: {
                        duration: 0.6,
                        ease: 'easeInOut',
                        delay: index * 0.1,
                      },
                    };
                  }

                  const content = (
                    <Image
                      src={img.src}
                      alt=""
                      width={position.width}
                      height={position.height}
                      className={`object-contain ${img.overlay ? 'cursor-none hover:scale-105 transition-transform duration-300' : ''}`}
                      priority
                    />
                  )

                  return (
                    <motion.div
                      key={img.src}
                      {...motionProps}
                      style={{
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                        height: position.height,
                        zIndex: img.isCursor ? 100 : (position.zIndex || index), // Ensure cursor hand is on top
                        transform: position.scale ? `scale(${position.scale})` : undefined,
                        transformOrigin: position.originX ? `${position.originX} ${position.originY || 'center'}` : 'center',
                        opacity: position.opacity !== undefined ? position.opacity : 1,
                        pointerEvents: img.isHand ? 'none' : 'auto' // Make hands non-interactive
                      }}
                    >
                      {img.overlay ? (
                        <div onClick={() => setActiveOverlay(img.overlay)}>
                          {content}
                        </div>
                      ) : (
                        content
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

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
                figmaLoading={figmaLoading}
                setFigmaLoading={setFigmaLoading}
              />
              
              {/* Right Fixed Column with Project Info and Sticky Nav */}
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

                    {/* Mobile view star and title - AT TOP, positioned absolutely to overflow window */}
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
                        {projectDescriptions[activeOverlay]?.title || activeOverlay}
                      </div>
                    </div>

                    {/* Title and description - with top margin to account for star */}
                    <div className="text-center" style={{ marginTop: '70px', marginBottom: '10px' }}>
                      <div className="text-[#202020] font-benton-compressed text-2xl md:text-4xl leading-none mb-4">
                        {(activeOverlay === 'landmade' && projectDescriptions.landmade.sections[activeSection]) ?
                          projectDescriptions.landmade.sections[activeSection].tagline :
                          (activeOverlay === 'omi' && projectDescriptions.omi.sections[activeSection]) ?
                          projectDescriptions.omi.sections[activeSection].tagline :
                          (activeOverlay === 'colorblock' && projectDescriptions.colorblock.sections[activeSection]) ?
                          projectDescriptions.colorblock.sections[activeSection].tagline :
                          (activeOverlay === 'gas' && projectDescriptions.gas.sections[activeSection]) ?
                          projectDescriptions.gas.sections[activeSection].tagline :
                          (activeOverlay === 'sorette' && projectDescriptions.sorette.sections[activeSection]) ?
                          projectDescriptions.sorette.sections[activeSection].tagline :
                          projectDescriptions[activeOverlay]?.tagline || "Creative project showcase"
                        }
                      </div>
                      <p className="text-sm md:text-base text-[#202020] leading-normal font-benton">
                        {(activeOverlay === 'landmade' && projectDescriptions.landmade.sections[activeSection]) ?
                          projectDescriptions.landmade.sections[activeSection].description :
                          (activeOverlay === 'omi' && projectDescriptions.omi.sections[activeSection]) ?
                          projectDescriptions.omi.sections[activeSection].description :
                          (activeOverlay === 'colorblock' && projectDescriptions.colorblock.sections[activeSection]) ?
                          projectDescriptions.colorblock.sections[activeSection].description :
                          (activeOverlay === 'gas' && projectDescriptions.gas.sections[activeSection]) ?
                          projectDescriptions.gas.sections[activeSection].description :
                          (activeOverlay === 'sorette' && projectDescriptions.sorette.sections[activeSection]) ?
                          projectDescriptions.sorette.sections[activeSection].description :
                          projectDescriptions[activeOverlay]?.description || "Project description coming soon."
                        }
                      </p>
                    </div>

                    {/* Navigation menu - horizontal and center aligned at bottom - FOR LANDMADE, OMI, COLORBLOCK, GAS, AND SORETTE */}
                    {(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'colorblock' || activeOverlay === 'gas' || activeOverlay === 'sorette') && (
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
                    {/* Sticky ScrollSpyNav at top left - only for projects with sections */}
                    {(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'colorblock' || activeOverlay === 'gas' || activeOverlay === 'sorette') && (
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
                        {projectDescriptions[activeOverlay]?.title || activeOverlay}
                      </div>
                    </div>
                    
                    <div className={`${(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'colorblock' || activeOverlay === 'gas' || activeOverlay === 'sorette') ? 'mt-[250px]' : 'mt-[350px]'} text-[#202020] font-benton-compressed text-6xl md:text-8xl text-right`} style={{ lineHeight: '0.8' }}>
                      {(activeOverlay === 'landmade' && projectDescriptions.landmade.sections[activeSection]) ?
                        projectDescriptions.landmade.sections[activeSection].tagline :
                        (activeOverlay === 'omi' && projectDescriptions.omi.sections[activeSection]) ?
                        projectDescriptions.omi.sections[activeSection].tagline :
                        (activeOverlay === 'colorblock' && projectDescriptions.colorblock.sections[activeSection]) ?
                        projectDescriptions.colorblock.sections[activeSection].tagline :
                        (activeOverlay === 'gas' && projectDescriptions.gas.sections[activeSection]) ?
                        projectDescriptions.gas.sections[activeSection].tagline :
                        (activeOverlay === 'sorette' && projectDescriptions.sorette.sections[activeSection]) ?
                        projectDescriptions.sorette.sections[activeSection].tagline :
                        projectDescriptions[activeOverlay]?.tagline || "Creative project showcase"
                      }
                    </div>
                    <p className="text-base md:text-lg text-[#202020] mt-6 md:mt-8 leading-normal font-benton text-right">
                      {(activeOverlay === 'landmade' && projectDescriptions.landmade.sections[activeSection]) ?
                        projectDescriptions.landmade.sections[activeSection].description :
                        (activeOverlay === 'omi' && projectDescriptions.omi.sections[activeSection]) ?
                        projectDescriptions.omi.sections[activeSection].description :
                        (activeOverlay === 'colorblock' && projectDescriptions.colorblock.sections[activeSection]) ?
                        projectDescriptions.colorblock.sections[activeSection].description :
                        (activeOverlay === 'gas' && projectDescriptions.gas.sections[activeSection]) ?
                        projectDescriptions.gas.sections[activeSection].description :
                        (activeOverlay === 'sorette' && projectDescriptions.sorette.sections[activeSection]) ?
                        projectDescriptions.sorette.sections[activeSection].description :
                        projectDescriptions[activeOverlay]?.description || "Project description coming soon."
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
                      {(activeOverlay === 'landmade' && projectDescriptions.landmade.sections[activeSection]) ?
                        projectDescriptions.landmade.sections[activeSection].title :
                        (activeOverlay === 'omi' && projectDescriptions.omi.sections[activeSection]) ?
                        projectDescriptions.omi.sections[activeSection].title :
                        (activeOverlay === 'colorblock' && projectDescriptions.colorblock.sections[activeSection]) ?
                        projectDescriptions.colorblock.sections[activeSection].title :
                        (activeOverlay === 'gas' && projectDescriptions.gas.sections[activeSection]) ?
                        projectDescriptions.gas.sections[activeSection].title :
                        (activeOverlay === 'sorette' && projectDescriptions.sorette.sections[activeSection]) ?
                        projectDescriptions.sorette.sections[activeSection].title :
                        projectDescriptions[activeOverlay]?.title || activeOverlay
                      }
                    </div>

                    {/* Empty space for symmetry */}
                    <div className="w-6"></div>
                  </div>

                  {/* Bottom expand toggle - half circle */}
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

// --- Helper component for left column images and arrow ---
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

// New horizontal navigation component for mobile
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

function LeftColumnImages({ activeOverlay, setActiveOverlay, setActiveSection, sections, activeSection, isCollapsed, isMobile, figmaLoading, setFigmaLoading }) {
  const firstImgRef = useRef(null);
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
      {activeOverlay === 'them' ? (
        <div className="w-full h-full relative">
          {/* Figma iframe - always visible so it can show native loading */}
          <iframe
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FKGwBk0wU1OutwWrJsYqOta%2FThem-Logo-Mockups%3Fnode-id%3D0-1%26t%3D5D33dShOKNFeALqi-1"
            allowFullScreen
            className="w-full h-full"
            style={{
              border: 'none',
              margin: 0,
              padding: 0
            }}
            onLoad={() => setFigmaLoading(prev => ({ ...prev, them: false }))}
          />
          
          {/* Loading animation overlay - fades out when Figma fully loads */}
          <AnimatePresence>
            {figmaLoading['them'] !== false && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FAF8E9] flex items-center justify-center z-10"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-[#202020]/20 border-t-[#202020] rounded-full"
                  />
                  <div className="text-[#202020] font-benton text-sm">Loading Figma board...</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : activeOverlay === 'sorette' ? (
        <div className="w-full">
          <div id="webdesign">
            <Image
              ref={firstImgRef}
              src="/images/creative/sorette/sorette-1.jpg"
              alt="Sorette project image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/sorette/sorette-2.jpg"
              alt="Sorette project image 2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/sorette/sorette-3.jpg"
              alt="Sorette project image 3"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/sorette/sorette-4.jpg"
              alt="Sorette project image 4"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/sorette/sorette-5.jpg"
              alt="Sorette project image 5"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      ) : activeOverlay === 'landmade' ? (
        <div className="w-full">
          <div id="branding">
            <Image
              ref={firstImgRef}
              src="/images/creative/landmade/landmade-1.jpg"
              alt="Landmade project image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/landmade/landmade-2.jpg"
              alt="Landmade project image 2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="photoshoot">
            <Image
              src="/images/creative/landmade/landmade-3.gif"
              alt="Landmade project image 3"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="pricebook">
            <Image
              src="/images/creative/landmade/landmade-4.jpg"
              alt="Landmade project image 4"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/landmade/landmade-5.gif"
              alt="Landmade project image 5"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/landmade/landmade-6.jpg"
              alt="Landmade project image 6"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="website">
            <Image
              src="/images/creative/landmade/website.gif"
              alt="Landmade project image 7"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/landmade/website-3.jpg"
              alt="Landmade website image 3"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/landmade/website-4.jpg"
              alt="Landmade website image 4"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="finishesbox">
            <Image
              src={isMobile ? "/images/creative/landmade/finishes-box-mobile.jpg" : "/images/creative/landmade/landmade-8.jpg"}
              alt="Landmade finishes box"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="displaymedia">
            <Image
              src="/images/creative/landmade/landmade-9.jpg"
              alt="Landmade project image 9"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      ) : activeOverlay === 'omi' ? (
        <div className="w-full">
          <div id="branding">
            <Image
              ref={firstImgRef}
              src="/images/creative/omi/omi-heading.jpg"
              alt="Omi heading image"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/omi/omi-branding.jpg"
              alt="Omi branding image"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="posters">
            <Image
              src="/images/creative/omi/poster-1.jpg"
              alt="Omi poster 1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="website">
            <Image
              src="/images/creative/omi/website-v1.jpg"
              alt="Omi website v1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/omi/website-v2.jpg"
              alt="Omi website v2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/omi/website-1.jpg"
              alt="Omi website 1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/omi/website-2.jpg"
              alt="Omi website 2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      ) : activeOverlay === 'colorblock' ? (
        <div className="w-full">
          <div id="branding">
            <Image
              ref={firstImgRef}
              src="/images/creative/colorblock/colorblock-1.jpg"
              alt="Colorblock branding image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/colorblock/colorblock-2.jpg"
              alt="Colorblock branding image 2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/colorblock/colorblock-3.jpg"
              alt="Colorblock branding image 3"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      ) : activeOverlay === 'gas' ? (
        <div className="w-full">
          <div id="supercoolsign">
            <Image
              ref={firstImgRef}
              src="/images/creative/gasstation/gasstation-1.jpg"
              alt="Gas Station super cool sign"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
          <div id="moodboard">
            {/* Figma mood board embed */}
            <div className="w-full relative" style={{margin: 0, padding: 0, height: '600px'}}>
              {/* Figma iframe - always visible so it can show native loading */}
              <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FW6qSZ5aoDaX15uaeEegX0t%2FGas-Station-VT-Mood-Board%3Fnode-id%3D0-1%26t%3Dqd8RBECDX53xS7wA-1"
                allowFullScreen
                className="w-full h-full"
                style={{
                  border: 'none',
                  margin: 0,
                  padding: 0
                }}
                onLoad={() => setFigmaLoading(prev => ({ ...prev, gasMoodboard: false }))}
              />
              
              {/* Loading animation overlay - fades out when Figma fully loads */}
              <AnimatePresence>
                {figmaLoading['gasMoodboard'] !== false && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#FAF8E9] flex items-center justify-center z-10"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-[#202020]/20 border-t-[#202020] rounded-full"
                      />
                      <div className="text-[#202020] font-benton text-sm">Loading mood board...</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div id="branding">
            <Image
              src="/images/creative/gasstation/final-logo.jpg"
              alt="Gas Station final logo"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/gasstation/gasstation-logo-v1.jpg"
              alt="Gas Station branding image 2"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/gasstation/gasstation-4.jpg"
              alt="Gas Station branding image 4"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
            <Image
              src="/images/creative/gasstation/gasstation-5.jpg"
              alt="Gas Station branding image 5"
              width={800}
              height={600}
              className="w-full object-contain"
              style={{margin: 0, padding: 0}}
            />
          </div>
        </div>
      ) : activeOverlay === 'chambord' ? (
        <div className="w-full">
          <Image
            ref={firstImgRef}
            src="/images/creative/chambord/chambord-1.jpg"
            alt="Chambord project image 1"
            width={800}
            height={600}
            className="w-full object-contain"
            style={{margin: 0, padding: 0}}
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-0 p-0 m-0">
          <Image
            ref={firstImgRef}
            src={`/images/creative/${activeOverlay}/${activeOverlay}-cover.jpg`}
            alt={`${activeOverlay} project cover`}
            width={800}
            height={800}
            className="w-full h-full object-cover p-0 m-0"
          />
          {Array.from({ length: 3 }).map((_, idx) => (
            <Image
              key={idx}
              src={`/images/creative/${activeOverlay}/${activeOverlay}-${idx + 1}.jpg`}
              alt={`${activeOverlay} project image ${idx + 1}`}
              width={800}
              height={800}
              className="w-full h-full object-cover p-0 m-0"
            />
          ))}
        </div>
      )}
    </div>
  );
}