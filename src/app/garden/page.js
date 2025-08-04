"use client"
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Image with Loading Component (same as creative page)
function ImageWithLoading({ src, alt, width, height, className, style, priority = false, imgRef = null }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const progressInterval = useRef(null)
  
  useEffect(() => {
    setIsLoading(true);
    setLoadProgress(0);
    
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
  }, [src]);
  
  const handleLoadComplete = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setLoadProgress(100);
    setTimeout(() => setIsLoading(false), 200);
  };
  
  return (
    <div className="relative w-full">
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

export default function GardenPage() {
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(0)
  const [activeOverlay, setActiveOverlay] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const collageImages = [
    {
      src: '/images/garden/2022.png',
      desktop: { bottom: 0, left: 0, width: 600, zIndex: 10 },
      mobile: { bottom: 50, left: -140, width: 380, zIndex: 40 },
      overlay: '2022'
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
      overlay: '2023'
    },
    {
      src: '/images/garden/2024.png',
      desktop: { bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 900, zIndex: 40 },
      mobile: { bottom: 380, left: 280, transform: 'translateX(-50%)', width: 450, zIndex: 40 },
      overlay: '2024'
    },
    {
      src: '/images/garden/2025.png',
      desktop: { top: 0, right: 0, width: 700, zIndex: 50 },
      mobile: { top: 0, right: 0, width: 380, zIndex: 50 },
      overlay: '2025'
    }
  ]

  // Project descriptions for garden years
  const projectDescriptions = {
    '2022': {
      title: "Garden 2022",
      tagline: "When I fell in love.",
      description: "2022 was a special year; it was the first time I ever truly had my own raised bed to grow in. I spent hours, days outside. In the baking sun in Denver, Colorado. Tending to my garden. I was hooked. I did plant things too close together. I would do so again even though I knew I shouldn't. The chaos is too pretty!"
    },
    '2023': {
      title: "Garden 2023",
      tagline: "Got realllll good at it.",
      description: "This year was all about me flexing my chops and pretending I was a pro while still learning big lessons. 1. Squirrels SUCK. Hence the fence lol. I def didn't grow an absolutely massive beautiful pot plant - if you saw that - no you didn't hahaah"
    },
    '2024': {
      title: "Garden 2024",
      tagline: "Taking my skills cross country.",
      description: "This was my first year growing in Vermont! BUGS. bugs everywhere. So much different than Denver. That being said - I really explored multiple sowings of seeds and plants to maximize my harvest this year. I had a ton of fun with it. I mean...look at that Gennel! can't get that at the grocery store. 100% organic baby!!! Oh and bonus clip: we lived right int he flight path of the Burlington Airport - so fighter jets frequently flew over my head while gardening. It was fun, until it wasn't haha"
    },
    '2025': {
      title: "Garden 2025",
      tagline: "Vermont is the best place to Garden in the country. ",
      description: "Hot take. I know - but this community garden I joined this year (Thommy Thompson in Burlington) was the most impressive, amazing community garden I've ever taken part in. Right in the flood plain of the Winooski River, this 25 foot by 25 foot plot (HUGE) had the most amazing soil imaginable. I unfortunately moved before I could harvest close to anything (except a shit ton of spring onions and napa cabbage and lettuces etc) but this was the most amazing epxerience. The first photo was how I inherited the plot. I plowed it by hand. Fun!!!! Oh - I also still gardned at home...so there's pics of that too!"
    }
  }

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
          src="/images/garden/garden-background.JPG"
          alt="Garden Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Home icon in top left corner - only show when no overlay */}
      {!activeOverlay && (
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
      )}
      
      {/* Collage Images */}
      {collageImages.map((img) => {
        const style = isMobile ? img.mobile : img.desktop
        if (img.hideOnMobile && isMobile) return null
        
        const content = (
          <Image
            src={img.src}
            alt=""
            width={typeof style.width === 'number' ? style.width : 100}
            height={typeof style.width === 'number' ? style.width : 100}
            className={`object-contain ${img.overlay ? 'cursor-pointer hover:scale-105 transition-transform duration-300' : ''}`}
            priority
          />
        )
        
        return (
          <div
            key={img.src}
            className="absolute"
            style={{ ...style, position: 'absolute', zIndex: style.zIndex }}
          >
            {img.overlay ? (
              <div onClick={() => setActiveOverlay(img.overlay)}>
                {content}
              </div>
            ) : (
              content
            )}
            
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
            {/* Left Scrollable Column with Garden Images */}
            <GardenImages
              activeOverlay={activeOverlay}
              setActiveOverlay={setActiveOverlay}
              isCollapsed={isCollapsed}
              isMobile={isMobile}
            />
            
            {/* Right Fixed Column with Garden Info */}
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
                      {/* Star animations same as creative page */}
                      <motion.div
                        className="absolute"
                        style={{ left: '-10px', top: '10px' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <Image
                          src="/images/star-background.svg"
                          alt="Star Badge Shadow"
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <motion.div
                        className="absolute"
                        style={{ left: '0', top: '0' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <Image
                          src="/images/star-front.svg"
                          alt="Star Badge"
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <div
                        className="absolute font-benton-compressed text-[0.8rem] z-10"
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
                        {activeOverlay}
                      </div>
                    </div>

                    {/* Title and description */}
                    <div className="text-center" style={{ marginTop: '70px', marginBottom: '10px' }}>
                      <div className="text-[#202020] font-benton-compressed text-2xl md:text-4xl leading-none mb-4">
                        {projectDescriptions[activeOverlay]?.tagline}
                      </div>
                      <p className="text-sm md:text-base text-[#202020] leading-normal font-benton">
                        {projectDescriptions[activeOverlay]?.description}
                      </p>
                    </div>
                  </div>

                  {/* Collapse toggle - MOBILE ONLY */}
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
                    {/* Desktop view star */}
                    <div className="absolute" style={{ top: '-30px', right: '-70px', width: '25vw', height: '25vw', maxWidth: '425px', maxHeight: '425px' }}>
                      <motion.div
                        className="absolute"
                        style={{ left: '-50px', top: '30px', width: '100%', height: '100%' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <Image
                          src="/images/star-background.svg"
                          alt="Star Badge Shadow"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <motion.div
                        className="absolute"
                        style={{ left: '0', top: '0', width: '100%', height: '100%' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <Image
                          src="/images/star-front.svg"
                          alt="Star Badge"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <div
                        className="absolute font-benton-compressed text-[3.5vw] z-10"
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
                        Garden<br/>{activeOverlay}
                      </div>
                    </div>
                    
                    <div className="mt-[350px] text-[#202020] font-benton-compressed text-6xl md:text-8xl text-right" style={{ lineHeight: '0.8' }}>
                      {projectDescriptions[activeOverlay]?.tagline}
                    </div>
                    <p className="text-base md:text-lg text-[#202020] mt-6 md:mt-8 leading-normal font-benton text-right">
                      {projectDescriptions[activeOverlay]?.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed Tab - Mobile Only */}
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

                    <div className="flex-1 text-center font-benton-compressed text-lg text-[#202020]">
                      {projectDescriptions[activeOverlay]?.title}
                    </div>

                    <div className="w-6"></div>
                  </div>

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
    </>
  )
}

// Garden Images Component (simplified version for garden)
function GardenImages({ activeOverlay, setActiveOverlay, isCollapsed, isMobile }) {
  const firstImgRef = useRef(null);
  
  return (
    <div 
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
      
      {/* Garden Images - Ready for your uploads */}
      <div className="w-full">
        {activeOverlay === '2022' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <ImageWithLoading
              imgRef={activeOverlay === '2022' ? firstImgRef : null}
              src="/images/garden/2022/IMG_3874_2.JPG"
              alt="Garden 2022 image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_3874.JPG"
              alt="Garden 2022 image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4176_2.JPG"
              alt="Garden 2022 image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4263.JPG"
              alt="Garden 2022 image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4360.JPG"
              alt="Garden 2022 image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4399.JPG"
              alt="Garden 2022 image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4474.JPG"
              alt="Garden 2022 image 7"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4579.JPG"
              alt="Garden 2022 image 8"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4823.JPG"
              alt="Garden 2022 image 9"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2022/IMG_4952.JPG"
              alt="Garden 2022 image 10"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        ) : activeOverlay === '2023' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <ImageWithLoading
              imgRef={activeOverlay === '2023' ? firstImgRef : null}
              src="/images/garden/2023/68212832028__5DACA172-23A4-4A12-B508-2656546D230E.JPG"
              alt="Garden 2023 image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/garden/2023/68479237851__41A444B1-E2AD-47F9-B4F9-89E784511781-2.JPG"
              alt="Garden 2023 image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2023/IMG_0033.JPG"
              alt="Garden 2023 image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2023/IMG_0169.JPG"
              alt="Garden 2023 image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2023/IMG_5826.JPG"
              alt="Garden 2023 image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2023/IMG_5827.JPG"
              alt="Garden 2023 image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2023/IMG_5975.JPG"
              alt="Garden 2023 image 7"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        ) : activeOverlay === '2024' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <ImageWithLoading
              imgRef={activeOverlay === '2024' ? firstImgRef : null}
              src="/images/garden/2024/IMG_2341.JPG"
              alt="Garden 2024 image 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority={true}
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2369.JPG"
              alt="Garden 2024 image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2370.JPG"
              alt="Garden 2024 image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2403.JPG"
              alt="Garden 2024 image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <video
              src="/images/garden/2024/IMG_2429.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2437.JPG"
              alt="Garden 2024 image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2438.JPG"
              alt="Garden 2024 image 7"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2463.JPG"
              alt="Garden 2024 image 8"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2464.JPG"
              alt="Garden 2024 image 9"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2574.JPG"
              alt="Garden 2024 image 10"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2575.JPG"
              alt="Garden 2024 image 11"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2576.JPG"
              alt="Garden 2024 image 12"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2577.JPG"
              alt="Garden 2024 image 13"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2582.JPG"
              alt="Garden 2024 image 14"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2652.JPG"
              alt="Garden 2024 image 15"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2653.JPG"
              alt="Garden 2024 image 16"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2655.JPG"
              alt="Garden 2024 image 17" 
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2709_2.JPG"
              alt="Garden 2024 image 18"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2710.JPG"
              alt="Garden 2024 image 19"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2711.JPG"
              alt="Garden 2024 image 20"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2736.JPG"
              alt="Garden 2024 image 21"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_2737.JPG"
              alt="Garden 2024 image 22"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3095.JPG"
              alt="Garden 2024 image 23"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3097.JPG"
              alt="Garden 2024 image 24"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3098.JPG"
              alt="Garden 2024 image 25"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <video
              src="/images/garden/2024/IMG_3114.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3115.JPG"
              alt="Garden 2024 image 27"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3116_2.JPG"
              alt="Garden 2024 image 28"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3117.JPG"
              alt="Garden 2024 image 29"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <video
              src="/images/garden/2024/IMG_3118.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3122.JPG"
              alt="Garden 2024 image 31"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_3284.JPG"
              alt="Garden 2024 image 32"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_4562.JPG"
              alt="Garden 2024 image 33"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2024/IMG_4563.JPG"
              alt="Garden 2024 image 34"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        ) : activeOverlay === '2025' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <video
              src="/images/garden/2025/IMG_4766.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4814.JPG"
              alt="Garden 2025 image 2"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4815.JPG"
              alt="Garden 2025 image 3"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4819_2.JPG"
              alt="Garden 2025 image 4"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4827.JPG"
              alt="Garden 2025 image 5"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4926.JPG"
              alt="Garden 2025 image 6"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_4971.JPG"
              alt="Garden 2025 image 7"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5296_2.JPG"
              alt="Garden 2025 image 8"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5382.JPG"
              alt="Garden 2025 image 9"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <video
              src="/images/garden/2025/IMG_5396.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5482.JPG"
              alt="Garden 2025 image 11"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <video
              src="/images/garden/2025/IMG_5549.mp4"
              className="w-full object-contain"
              controls
              playsInline
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5550.JPG"
              alt="Garden 2025 image 13"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          
            <ImageWithLoading
              src="/images/garden/2025/IMG_5620.JPG"
              alt="Garden 2025 image 15"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5621_2.JPG"
              alt="Garden 2025 image 16"
              width={800}
              height={600}
              className="w-full object-contain"
            />
            <ImageWithLoading
              src="/images/garden/2025/IMG_5628.JPG"
              alt="Garden 2025 image 17"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[600px] bg-[#F5F3E5] text-[#202020] font-benton">
            <div className="text-center">
              <p className="text-2xl mb-4">Garden {activeOverlay} Images</p>
              <p className="text-sm text-[#202020]/60">Images will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}