'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

// Image with Loading Component
function ImageWithLoading({ src, alt, width, height, className, style, priority = false, imgRef = null }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const progressInterval = useRef(null)
  
  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setLoadProgress(0);
    
    // Start progress animation
    progressInterval.current = setInterval(() => {
      setLoadProgress(prev => {
        const increment = Math.random() * 20 + 5;
        const newProgress = prev + increment;
        
        if (newProgress >= 90) {
          if (progressInterval.current) clearInterval(progressInterval.current);
          return 90;
        }
        return newProgress;
      });
    }, 300);
    
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [src]); // Reset when src changes
  
  const handleLoadComplete = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setLoadProgress(100);
    setTimeout(() => setIsLoading(false), 200);
  };
  
  return (
    <div className="relative w-full">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#FAF8E9] flex items-center justify-center z-10" style={{ minHeight: '200px' }}>
          <div className="flex flex-col items-center gap-3 w-full px-6 max-w-[200px]">
            <div className="w-full bg-[#202020]/10 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                className="h-full bg-[#202020] rounded-full"
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="text-[#202020]/70 font-benton text-xs">
              {Math.round(loadProgress)}%
            </div>
          </div>
        </div>
      )}
      
      {/* Image */}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoadingComplete={handleLoadComplete}
        onError={() => {
          if (progressInterval.current) clearInterval(progressInterval.current);
          setIsLoading(false);
        }}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={90}
        sizes="(max-width: 768px) 100vw, 60vw"
        unoptimized={src.endsWith('.gif')}
      />
    </div>
  )
}

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
      desktop: { left: 650, top: 665.5, width: 455, height: 152 },
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
      src: '/images/creative/crosswater.png', 
      desktop: { left: 650, top: 450, width: 350, height: 280, zIndex: 1 },
      mobile: { left: -250, top: 700, width: 450, height: 200, scale: 0.6, zIndex: 16 },
      overlay: 'crosswater'
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
      src: '/images/creative/benttree.png', 
      desktop: { left: 520, top: 600, width: 150, height: 150 },
      mobile: { left: 200, top: 900, width: 200, height: 200, scale: 0.8, zIndex: 18 },
      overlay: 'benttree'
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
        x: 80,  // Adjusted for better alignment
        y: 50   // Adjusted for better alignment
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
          tagline: "Elevated, modern, trendy design",
          description: "That's what I do best. Truly – with web design – I strive to push boundaries, think outside of the box, and avoid the template cookie-cutter woes. That's exactly what I did for Sorette – an online shop for pregnancy, mom, and baby safe products. The website has changed a bit since my initial design, so I'm showing the initial mockups here. If you want to check it out in practice, head to shopsorette.com."
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
          tagline: "Look at this super cool sign!",
          description: "I made a branding package for a dispensary called The Gas Station in Rutland, VT. It's always super rad seeing your work implemented in the real world."
        },
        moodboard: {
          title: "Mood Board",
          tagline: "The building was a Texaco gas station in the 50s,",
          description: "so we wanted to stay true to the brand's history and keep the 50s gas station vibe while also making it feel modern and fresh. Scroll around the Figma mood board to see the foundation we created."
        },
        branding: {
          title: "Branding",
          tagline: "Super proud of where this one landed.",
          description: "Look – it wasn't easy. My process shows it all – lots of versions, lots of directions. But I'm proud of the end result – and the client was really happy as well, which is all that matters. Oh...and Oily is pretty cool too haha."
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
          tagline: "Modernizing pet healthcare.",
          description: "Omi Health was in a pinch – they needed branding quickly, didn't have a huge budget, but had an amazing mission. Luckily, I'm a sucker for my dog, so I agreed to help. I created a quick, simple wordmark for them and a color scheme rich in textures and gradients."
        },
        posters: {
          title: "Posters",
          tagline: "I'M TRYING TO GET YOUR ATTENTION.",
          description: "THAT'S WHAT POSTERS SHOULD DO. THAT'S WHAT I TRIED TO DO."
        },
        website: {
          title: "Website",
          tagline: "Designing on the fly and being adaptive",
          description: "are some of my most finely tuned skills, and they shine here. As you can see by the multiple versions we created, as the client refined their understanding of the brand identity, I refined the website to match. We brought it from SUPER playful to more refined and adult. I feel it landed really smoothly, on the right runway, in the correct city. If you want to check out the site in action, head to joinomi.com."
        }
      }
    },
    chambord: {
      title: "Chambord",
      tagline: "Here I am again, modernizing",
      description: "another logo in desperate need. During my time at Forte Brands, we brought on a fireclay farm sink company called Chambord. No – not the booze – the sinks haha. They had a super dated, maybe even from the early 1900s, logo for all I know. My job was to tweak it and modernize it while keeping it recognizable. Done."
    },
    landmade: {
      title: "Landmade",
      tagline: "Handcrafted goods, direct from artisans.",
      description: "Full-scope brand identity and e-commerce design for this marketplace connecting craftspeople with consumers. Developed a system that showcased makers' stories.",
      sections: {
        branding: {
          title: "Branding",
          tagline: "These are some boujee-ass bathtubs",
          description: "and the branding needed to match the price tag. Sometimes a $15,000 price tag. I know. While at Forte Brands, we launched a line of bathtubs that are 100% recyclable – seriously, they just decompose over time – and we wanted branding that felt elegant and could fit in houses with closets full of Dior and Louis, while also keeping to its commitment to the earth. I used organic shapes, a simple wordmark, and a NEVER PURE WHITE AND NEVER PURE BLACK mentality, just like nature."
        },
        photoshoot: {
          title: "Photoshoot",
          tagline: "Breaking the fourth wall of corny bathroom shoots.",
          description: "We wanted the brand to feel honest, pure, elegant, and exciting. With that in mind, we decided to shoot the tubs in a studio, no running water, no smoke and mirrors, and no implication of running water. Just the tubs, a room, a backdrop, and some humans interacting with them."
        },
        pricebook: {
          title: "Price Book",
          tagline: "One of my proudest designs.",
          description: "This price book is truly one of my greatest works. Its cover is made of recycled card stock paper. Each bath is paired with an element of nature, and while everything is structured on a grid, I wasn't afraid to break the grid and create some randomness, just like in nature."
        },
        website: {
          title: "Website",
          tagline: "Did I mention I develop sites too?",
          description: "This was another website where I tried to break the rules. Each tub was paired with a 'Sounds like' feature with a song. The grid was respected, but not to a fault. Images float, each bath is given a story. Check it out at landmade.us."
        },
        finishesbox: {
          title: "Finishes Box",
          tagline: "Just pure fun.",
          description: "Creating this box is the type of project I foam at the mouth for. I love problem solving, crafting from scratch, and making real-life things."
        },
        displaymedia: {
          title: "Display Media",
          tagline: "Eye-catching lightboxes for Showrooms",
          description: "that also tell a story. That was the goal. Again, we wanted to reinforce Landmade's commitment to the Earth and wanted these to stand out from typical bathroom display media."
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
          tagline: "Where you go to turn nothing into something",
          description: "After banging my head against the wall for far too long on this logo, I realized something. Colorblock, a creative-based coworking space startup, is as simple as a place creatives go to turn nothing into something. Boom – logo done. Sometimes, simplicity is the only way."
        }
      }
    },
    them: {
      title: "Them",
      tagline: "Here's a peek into my process",
      description: "Go ahead. Indulge yourself. Scroll around the Figma board and into my brain. Them was an idea my partner and I had that was born out of the fact that we share pants. Yes – I wear my girlfriend's pants on the regular and I don't see the big deal about it. They fit better, they're cooler. Anyway – that's a discussion for another day. We decided to create a genderless clothing line together starting with a pair of jeans. It's still in the works, but here's the process behind the logo! Which do you prefer? Let me know in the comments lol, or better yet – in my interview!"
    },
    crosswater: {
      title: "Crosswater",
      tagline: "Creative project showcase.",
      description: "Project description coming soon.",
      sections: {
        photoshoot: {
          title: "Photoshoot",
          tagline: "Ok...I'm not a photographer",
          description: "BUT – my team at Forte Brands desperately needed some consistent, on-brand, and modern imagery of each of our faucets. So I built a 2 foot by 2 foot box out of 2x4s (shoutout Home Depot for cutting everything there for me) and slapped some marble tiles on it that I drilled into MYSELF successfully. I then built a makeshift studio in my extra bedroom, using a canvas backdrop and lights off Amazon. Total cost: $500. Here are the results. I'd say pretty good ROI, right?"
        },
        brandingrefresh: {
          title: "Branding Refresh",
          tagline: "The old branding was not meeting the moment",
          description: "It was dated, early 2000s modern bleh – not like Von Dutch cool early 2000s, more like what we thought the future was going to look like back then. Boy, were we wrong. Anyway, I pitched a brand refresh from the font to colors to how we treat our spec sheets. I felt it was time to bring Crosswater into the modern age; the board did not agree. Oh well!"
        },
        pricebook: {
          title: "Price Book",
          tagline: "Price book got a facelift, too.",
          description: "I brought this new branding into the price book design, creating a cleaner, more concise price book that salespeople would feel proud showing their customers. This was a behemoth 400-page book – so I felt that it was super important to make it approachable and easy to digest."
        }
      }
    },
    benttree: {
      title: "Bent Tree",
      tagline: "Premium brand identity and packaging.",
      description: "Complete brand development for a luxury lifestyle brand, from logo design to sophisticated packaging solutions.",
      sections: {
        logo: {
          title: "Logo",
          tagline: "Pot + 90s skate nostalgia + Vermont nature",
          description: "I mean...is there any more...duh...combination? I developed a logo for my homie who was starting a pot grow in Vermont. We wanted to meld a bunch of different aesthetics of pot culture from when we grew up with the famous nature of Vermont. All my friend asked for was to incorporate his favorite tree on his property into the logo somehow."
        },
        packaging: {
          title: "Packaging",
          tagline: "I'd buy this pre-roll",
          description: "Yeah – I know – the fine print and warnings aren't on yet. His pot is still growing...so we'll have to wait for the final designs. The pattern was an added surprise bonus and byproduct of the logo design, though, which we were all really stoked with."
        }
      }
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
  const collageRef = useRef(null) // Add ref for collage container
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
    } else if (overlay === 'crosswater') {
      return [
        { id: 'photoshoot', label: 'Photoshoot' },
        { id: 'brandingrefresh', label: 'Branding Refresh' },
        { id: 'pricebook', label: 'Price Book' },
      ];
    } else if (overlay === 'benttree') {
      return [
        { id: 'logo', label: 'Logo' },
        { id: 'packaging', label: 'Packaging' },
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
      // Force re-render of images by changing key
      window.scrollTo(0, 0); // Scroll to top when opening overlay
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
      } else if (activeOverlay === 'crosswater') {
        setActiveSection('photoshoot')
      } else if (activeOverlay === 'benttree') {
        setActiveSection('logo')
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
      
      // Only apply new scaling logic for desktop
      if (window.innerWidth >= 768) {
        // NEW SCALING LOGIC FOR LARGE MONITORS (DESKTOP ONLY)
        const baseScale = Math.min(1, window.innerWidth / 1280, window.innerHeight / 1024)
        
        let finalScale = baseScale
        if (window.innerWidth > 1920) {
          const excessWidth = window.innerWidth - 1920
          const scaleReduction = Math.min(0.3, excessWidth / 3000)
          finalScale = baseScale * (1 - scaleReduction)
        }
        
        finalScale = Math.max(0.7, Math.min(1.1, finalScale))
        setScale(finalScale)
      } else {
        // Original mobile scaling - unchanged
        const newScale = Math.min(1, window.innerWidth / 1280, window.innerHeight / 1024)
        setScale(newScale)
      }
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
        {/* Max-width wrapper only applies to desktop */}
        <div className={`w-full ${!isMobile ? 'max-w-[2000px] mx-auto' : ''} relative h-full flex items-center justify-center`}>
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              ref={collageRef}
              className="relative collage-container"
              style={{
                width: 1280,
                height: 1024,
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                // Only add transition on desktop
                transition: !isMobile ? 'transform 0.3s ease-out' : undefined
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
                    if (isArmRight && !isMobile) {
                      const hotspot = img.cursorHotspot || { x: 0, y: 0 };
                      
                      // Get the collage container's bounding rect
                      const collageRect = collageRef.current?.getBoundingClientRect();
                      
                      if (collageRect) {
                        // Calculate the center of the collage in screen coordinates
                        const collageCenterX = collageRect.left + collageRect.width / 2;
                        const collageCenterY = collageRect.top + collageRect.height / 2;
                        
                        // Calculate mouse position relative to the collage center
                        const relativeMouseX = mouse.x - collageCenterX;
                        const relativeMouseY = mouse.y - collageCenterY;
                        
                        // Convert to collage coordinate system (accounting for scale)
                        const collageMouseX = relativeMouseX / scale;
                        const collageMouseY = relativeMouseY / scale;
                        
                        // Add back the collage dimensions to get position from top-left
                        const adjustedMouseX = collageMouseX + 1280 / 2;
                        const adjustedMouseY = collageMouseY + 1024 / 2;
                        
                        // Account for the inner container's 0.9 scale
                        const finalMouseX = adjustedMouseX / 0.9;
                        const finalMouseY = adjustedMouseY / 0.9;
                        
                        motionProps = {
                          animate: {
                            x: finalMouseX - position.left - hotspot.x,
                            y: finalMouseY - position.top - hotspot.y,
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
                        // Fallback positioning
                        motionProps = {
                          animate: { x: 0, y: 0, opacity: 1 },
                          transition: { duration: 0 },
                        };
                      }
                    } else if (isArmRight && isMobile) {
                      // Mobile positioning for cursor hand
                      motionProps = {
                        animate: { x: 0, y: 30, opacity: 1 },
                        transition: { duration: 0.6, ease: 'easeInOut' },
                      };
                    } else {
                      // All other images
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
                key={activeOverlay} // Force re-render when overlay changes
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
                          (activeOverlay === 'crosswater' && projectDescriptions.crosswater.sections[activeSection]) ?
                          projectDescriptions.crosswater.sections[activeSection].tagline :
                          (activeOverlay === 'benttree' && projectDescriptions.benttree.sections[activeSection]) ?
                          projectDescriptions.benttree.sections[activeSection].tagline :
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
                          (activeOverlay === 'crosswater' && projectDescriptions.crosswater.sections[activeSection]) ?
                          projectDescriptions.crosswater.sections[activeSection].description :
                          (activeOverlay === 'benttree' && projectDescriptions.benttree.sections[activeSection]) ?
                          projectDescriptions.benttree.sections[activeSection].description :
                          projectDescriptions[activeOverlay]?.description || "Project description coming soon."
                        }
                      </p>
                    </div>

                    {/* Navigation menu - horizontal and center aligned at bottom - FOR LANDMADE, OMI, COLORBLOCK, GAS, SORETTE, CROSSWATER AND benttree */}
                    {(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'colorblock' || activeOverlay === 'gas' || activeOverlay === 'sorette' || activeOverlay === 'crosswater' || activeOverlay === 'benttree') && (
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
                    {(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'colorblock' || activeOverlay === 'gas' || activeOverlay === 'sorette' || activeOverlay === 'crosswater' || activeOverlay === 'benttree') && (
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
                    
                    <div className={`${(activeOverlay === 'landmade' || activeOverlay === 'omi' || activeOverlay === 'gas' || activeOverlay === 'crosswater' || activeOverlay === 'benttree') ? 'mt-[250px]' : 'mt-[350px]'} text-[#202020] font-benton-compressed text-6xl md:text-8xl text-right`} style={{ lineHeight: '0.8' }}>
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
                        (activeOverlay === 'crosswater' && projectDescriptions.crosswater.sections[activeSection]) ?
                        projectDescriptions.crosswater.sections[activeSection].tagline :
                        (activeOverlay === 'benttree' && projectDescriptions.benttree.sections[activeSection]) ?
                        projectDescriptions.benttree.sections[activeSection].tagline :
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
                        (activeOverlay === 'crosswater' && projectDescriptions.crosswater.sections[activeSection]) ?
                        projectDescriptions.crosswater.sections[activeSection].description :
                        (activeOverlay === 'benttree' && projectDescriptions.benttree.sections[activeSection]) ?
                        projectDescriptions.benttree.sections[activeSection].description :
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
                        (activeOverlay === 'crosswater' && projectDescriptions.crosswater.sections[activeSection]) ?
                        projectDescriptions.crosswater.sections[activeSection].title :
                        (activeOverlay === 'benttree' && projectDescriptions.benttree.sections[activeSection]) ?
                        projectDescriptions.benttree.sections[activeSection].title :
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
      
      {/* Optional: Add CSS for ultra-wide optimizations - DESKTOP ONLY */}
      <style jsx global>{`
        /* Optimize for ultra-wide displays - DESKTOP ONLY */
        @media (min-width: 2560px) {
          .collage-container {
            filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.1));
          }
        }
        
        /* Prevent scrolling text from being too wide - DESKTOP ONLY */
        @media (min-width: 3000px) {
          .animate-marquee {
            max-width: 3000px;
            margin: 0 auto;
          }
        }
        
        /* Remove any desktop optimizations on mobile */
        @media (max-width: 767px) {
          .collage-container {
            filter: none !important;
          }
          .animate-marquee {
            max-width: none !important;
          }
        }
      `}</style>
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const ref = leftColRef.current;
    if (!ref || sections.length === 0) return;
    
    // Scroll to top when component mounts
    ref.scrollTop = 0;
    
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
  }, [activeOverlay, isMobile]);

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
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/sorette/sorette-1.jpg"
              alt="Sorette project image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/sorette/sorette-2.jpg"
              alt="Sorette project image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/sorette/sorette-3.jpg"
              alt="Sorette project image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/sorette/sorette-4.jpg"
              alt="Sorette project image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/sorette/sorette-5.jpg"
              alt="Sorette project image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'landmade' ? (
        <div className="w-full">
          <div id="branding">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/landmade/landmade-1.jpg"
              alt="Landmade project image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/landmade/landmade-2.jpg"
              alt="Landmade project image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="photoshoot">
            <ImageWithLoading
              src="/images/creative/landmade/landmade-3.gif"
              alt="Landmade project image 3"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true} // GIFs should load with priority
            />
          </div>
          <div id="pricebook">
            <ImageWithLoading
              src="/images/creative/landmade/landmade-4.jpg"
              alt="Landmade project image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/landmade/landmade-5.gif"
              alt="Landmade project image 5"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true} // GIFs should load with priority
            />
            <ImageWithLoading
              src="/images/creative/landmade/landmade-6.jpg"
              alt="Landmade project image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="website">
            <ImageWithLoading
              src="/images/creative/landmade/website.gif"
              alt="Landmade project image 7"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true} // GIFs should load with priority
            />
            <ImageWithLoading
              src="/images/creative/landmade/website-3.jpg"
              alt="Landmade website image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/landmade/website-4.jpg"
              alt="Landmade website image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="finishesbox">
            <ImageWithLoading
              src={isMobile ? "/images/creative/landmade/finishes-box-mobile.jpg" : "/images/creative/landmade/landmade-8.jpg"}
              alt="Landmade finishes box"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="displaymedia">
            <ImageWithLoading
              src="/images/creative/landmade/landmade-9.jpg"
              alt="Landmade project image 9"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'omi' ? (
        <div className="w-full">
          <div id="branding">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/omi/omi-heading.jpg"
              alt="Omi heading image"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/omi/omi-branding.jpg"
              alt="Omi branding image"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="posters">
            <ImageWithLoading
              src="/images/creative/omi/poster-1.jpg"
              alt="Omi poster 1"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="website">
            <ImageWithLoading
              src="/images/creative/omi/website-v1.jpg"
              alt="Omi website v1"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/omi/website-v2.jpg"
              alt="Omi website v2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/omi/website-1.jpg"
              alt="Omi website 1"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/omi/website-2.jpg"
              alt="Omi website 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'colorblock' ? (
        <div className="w-full">
          <div id="branding">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/colorblock/colorblock-1.jpg"
              alt="Colorblock branding image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/colorblock/colorblock-2.jpg"
              alt="Colorblock branding image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/colorblock/colorblock-3.jpg"
              alt="Colorblock branding image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'gas' ? (
        <div className="w-full">
          <div id="supercoolsign">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/gasstation/gasstation-1.jpg"
              alt="Gas Station super cool sign"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
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
            <ImageWithLoading
              src="/images/creative/gasstation/final-logo.jpg"
              alt="Gas Station final logo"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/gasstation/gasstation-logo-v1.jpg"
              alt="Gas Station branding image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/gasstation/gasstation-4.jpg"
              alt="Gas Station branding image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/gasstation/gasstation-5.jpg"
              alt="Gas Station branding image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'chambord' ? (
        <div className="w-full">
          <ImageWithLoading
            imgRef={firstImgRef}
            src="/images/creative/chambord/chambord-1.jpg"
            alt="Chambord project image 1"
            width={800}
            height={600}
            className="w-full object-contain"
            priority={true}
          />
        </div>
      ) : activeOverlay === 'crosswater' ? (
        <div className="w-full">
          <div id="photoshoot">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/crosswater/crosswater-1.jpg"
              alt="Crosswater photoshoot image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-2.jpg"
              alt="Crosswater photoshoot image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="brandingrefresh">
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-3.jpg"
              alt="Crosswater branding refresh image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-4.jpg"
              alt="Crosswater branding refresh image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-5.jpg"
              alt="Crosswater branding refresh image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-6.jpg"
              alt="Crosswater branding refresh image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-7.jpg"
              alt="Crosswater branding refresh image 7"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="pricebook">
            <ImageWithLoading
              src="/images/creative/crosswater/crosswater-8.jpg"
              alt="Crosswater price book"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : activeOverlay === 'benttree' ? (
        <div className="w-full">
          <div id="logo">
            <ImageWithLoading
              imgRef={firstImgRef}
              src="/images/creative/benttree/benttree-1.jpg"
              alt="Bent Tree logo image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/creative/benttree/benttree-2.jpg"
              alt="Bent Tree logo image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/benttree/benttree-3.jpg"
              alt="Bent Tree logo image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
          <div id="packaging">
            <ImageWithLoading
              src="/images/creative/benttree/benttree-4.jpg"
              alt="Bent Tree packaging image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/creative/benttree/benttree-5.jpg"
              alt="Bent Tree packaging image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-0 p-0 m-0">
          <ImageWithLoading
            imgRef={firstImgRef}
            src={`/images/creative/${activeOverlay}/${activeOverlay}-cover.jpg`}
            alt={`${activeOverlay} project cover`}
            width={800}
            height={800}
            className="w-full h-full object-cover p-0 m-0"
            priority={true}
          />
          {Array.from({ length: 3 }).map((_, idx) => (
            <ImageWithLoading
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