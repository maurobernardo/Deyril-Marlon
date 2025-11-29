'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string; label?: string }>
  isOpen: boolean
  initialIndex: number
  onClose: () => void
  projectTitle?: string
}

export default function ImageLightbox({
  images,
  isOpen,
  initialIndex,
  onClose,
  projectTitle,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [autoPlay, setAutoPlay] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  // Reset zoom and position when image changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [initialIndex, isOpen])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [images.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [images.length])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.25, 1)
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }, [])

  // Auto-play slideshow
  useEffect(() => {
    if (autoPlay && isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay, isOpen, images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      } else if (e.key === '-') {
        handleZoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrevious, handleZoomIn, handleZoomOut, onClose])

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Filter images by project (if filter is implemented)
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter((img) => img.label?.toLowerCase().includes(filter.toLowerCase()))

  const displayIndex = filteredImages.findIndex((img) => img.src === images[currentIndex].src)
  const currentImage = filteredImages[displayIndex >= 0 ? displayIndex : 0]

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 z-40 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain"
              quality={100}
              priority
            />
          </motion.div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-40 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Controls Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-sm min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all"
                aria-label="Reset zoom"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Auto-play Toggle */}
            {images.length > 1 && (
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  autoPlay
                    ? 'bg-primary text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {autoPlay ? 'Pause' : 'Play'}
              </button>
            )}
          </div>

          {/* Image Label */}
          {currentImage.label && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
              <p className="text-white text-sm font-medium">{currentImage.label}</p>
            </div>
          )}
        </div>

        {/* Thumbnail Strip (for multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40 max-w-[90vw] overflow-x-auto">
            <div className="flex gap-2 px-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setZoom(1)
                    setPosition({ x: 0, y: 0 })
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? 'border-primary scale-110'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

