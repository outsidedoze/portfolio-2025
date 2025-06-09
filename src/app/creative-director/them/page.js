'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ThemPage() {
  const router = useRouter()
  const [svgContent, setSvgContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 })
  
  const viewerRef = useRef(null)

  // Load SVG with clear debugging
  useEffect(() => {
    console.log('Starting to load SVG...')
    setLoading(true)
    
    fetch('/images/creative/them/them-artboard.svg')
      .then(response => {
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.text()
      })
      .then(content => {
        console.log('SVG content loaded, length:', content.length)
        console.log('Content preview:', content.substring(0, 200))
        setSvgContent(content)
        setLoading(false)
        setError('')
      })
      .catch(error => {
        console.log('Error loading SVG:', error)
        setError(error.message)
        setLoading(false)
        // Create a simple visible SVG
        setSvgContent(`
          <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style="background: white;">
            <rect x="50" y="50" width="700" height="500" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
            <text x="400" y="200" text-anchor="middle" font-family="Arial Black" font-size="36" fill="#333">
              THEM
            </text>
            <text x="400" y="250" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">
              Case Study Artboard
            </text>
            <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">
              SVG file not found at: /images/creative/them/them-artboard.svg
            </text>
            <text x="400" y="330" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">
              Error: ${error}
            </text>
          </svg>
        `)
      })
  }, [error])

  // Mouse wheel zoom - properly handled
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    const handleWheel = (e) => {
      e.preventDefault()
      
      const rect = viewer.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
      const newZoom = Math.max(0.1, Math.min(5, zoom * zoomFactor))
      
      // Zoom towards mouse position
      const zoomRatio = newZoom / zoom
      const newPanX = mouseX - (mouseX - panX) * zoomRatio
      const newPanY = mouseY - (mouseY - panY) * zoomRatio
      
      setZoom(newZoom)
      setPanX(newPanX)
      setPanY(newPanY)
    }

    viewer.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      viewer.removeEventListener('wheel', handleWheel)
    }
  }, [zoom, panX, panY])

  // Touch/pinch zoom
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    let lastTouchDistance = 0

    const getTouchDistance = (touches) => {
      const touch1 = touches[0]
      const touch2 = touches[1]
      return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
    }

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        lastTouchDistance = getTouchDistance(e.touches)
      }
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      
      if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches)
        const zoomFactor = currentDistance / lastTouchDistance
        const newZoom = Math.max(0.1, Math.min(5, zoom * zoomFactor))
        
        setZoom(newZoom)
        lastTouchDistance = currentDistance
      }
    }

    viewer.addEventListener('touchstart', handleTouchStart, { passive: false })
    viewer.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    return () => {
      viewer.removeEventListener('touchstart', handleTouchStart)
      viewer.removeEventListener('touchmove', handleTouchMove)
    }
  }, [zoom])

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      panX: panX,
      panY: panY
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    setPanX(dragStart.panX + deltaX)
    setPanY(dragStart.panY + deltaY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(5, prev * 1.2))
  const zoomOut = () => setZoom(prev => Math.max(0.1, prev / 1.2))
  const resetView = () => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }
  const fitToScreen = () => {
    // Simple fit - you can make this more sophisticated later
    setZoom(0.8)
    setPanX(0)
    setPanY(0)
  }

  return (
    <main className="w-screen h-screen bg-[#FAF8E9] flex flex-col">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
      >
        <Image src="/images/back-arrow.svg" alt="Back" width={40} height={40} />
      </button>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Left side - SVG Viewer */}
        <div className="order-2 md:order-1 md:w-[70%] w-full h-full">
          <div className="w-full h-full bg-[#2c2c2c] flex flex-col">
            {/* Toolbar */}
            <div className="bg-[#383838] h-12 flex items-center px-5 gap-4 border-b border-[#555] text-[#ccc] text-sm">
              <div>them - Case Study Artboard</div>
              <div className="flex items-center gap-2 ml-auto">
                <button 
                  onClick={zoomOut}
                  className="bg-[#4a4a4a] border border-[#666] text-[#ccc] px-2 py-1 rounded hover:bg-[#555]"
                >
                  -
                </button>
                <div className="min-w-[60px] text-center text-yellow-400">
                  {Math.round(zoom * 100)}%
                </div>
                <button 
                  onClick={zoomIn}
                  className="bg-[#4a4a4a] border border-[#666] text-[#ccc] px-2 py-1 rounded hover:bg-[#555]"
                >
                  +
                </button>
                <button 
                  onClick={fitToScreen}
                  className="bg-[#4a4a4a] border border-[#666] text-[#ccc] px-2 py-1 rounded hover:bg-[#555]"
                >
                  Fit
                </button>
                <button 
                  onClick={resetView}
                  className="bg-[#4a4a4a] border border-[#666] text-[#ccc] px-2 py-1 rounded hover:bg-[#555]"
                >
                  Reset
                </button>
              </div>
              <div className="text-yellow-400">
                {loading ? 'Loading...' : error ? `Error: ${error}` : 'Ready'}
              </div>
            </div>

            {/* Viewer */}
            <div 
              ref={viewerRef}
              className={`flex-1 relative bg-white overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full text-gray-600 text-xl">
                  Loading SVG...
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    style={{ 
                      transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-[#383838] p-2 text-[#ccc] text-xs">
              <strong>Controls:</strong> Mouse wheel to zoom • Drag to pan • Pinch to zoom on touch devices
            </div>
          </div>
        </div>

        {/* Right side - Project info */}
        <div className="order-1 md:order-2 md:w-[30%] w-full h-auto md:h-full overflow-y-auto p-6 md:p-8 relative text-center md:text-left bg-[#FAF8E9]">
          {/* Mobile star */}
          <div className="md:hidden relative w-[180px] h-[180px] mx-auto mb-6">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/images/star-front.svg" alt="Star" fill className="object-contain" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-bold font-benton text-xl text-[#202020]">
              Them
            </div>
          </div>

          {/* Desktop star */}
          <div className="hidden md:block absolute top-0 right-0 w-48 h-48">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/images/star-front.svg" alt="Star" fill className="object-contain" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-bold font-benton text-2xl text-[#202020]">
              Them
            </div>
          </div>
          
          <div className="mt-[15vh] md:mt-[200px] text-[#202020] font-benton text-3xl md:text-4xl leading-tight">
            Inclusive content for the modern era.
          </div>
          <p className="text-sm md:text-base text-[#202020] mt-4 md:mt-6 leading-relaxed font-benton">
            Editorial design and art direction for a groundbreaking publication. Developed visual storytelling that resonates with diverse audiences.
          </p>
          
          <div className="mt-8 p-4 bg-white bg-opacity-50 rounded-lg">
            <h4 className="font-bold text-[#202020] mb-2">Interactive Artboard</h4>
            <p className="text-sm text-[#202020] leading-relaxed">
              {loading ? 'Loading artboard...' : error ? 'Artboard failed to load. Using placeholder.' : 'Explore the design system by zooming and panning through the artboard.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}