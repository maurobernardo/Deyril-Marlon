'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Video } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    subtitle: string
    date: string
    description: string
    images: string[]
    video?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [project.images.length])

  return (
    <motion.div 
      className="group relative h-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary-dark/0 group-hover:from-primary/5 group-hover:to-primary-dark/5 transition-all duration-500 z-0"></div>

      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden">
        {project.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`${project.title} - Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={85}
            />
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
        
        {/* Video Badge */}
        {project.video && (
          <div className="absolute top-4 right-4 z-10 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 text-white text-xs font-semibold shadow-lg">
            <Video className="w-3 h-3" />
            <span>Video</span>
          </div>
        )}

        {/* Image Indicators */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImageIndex(index)
                }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-primary w-8 h-2 shadow-lg shadow-primary/50'
                    : 'bg-white/50 dark:bg-gray-600/50 w-2 h-2 hover:bg-white/80 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Date Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-full">
            {project.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 line-clamp-1">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* View Details Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/projects/${project.id}`}
            className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:from-primary-light hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
          >
            <span>{t.projects.viewDetails}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
    </motion.div>
  )
}