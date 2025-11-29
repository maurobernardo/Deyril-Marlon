'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import ProjectCard from './ProjectCard'
import { FolderKanban, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Projects() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const projects = [
    {
      id: 'space4all',
      title: t.projects.space4all.title,
      subtitle: t.projects.space4all.subtitle,
      date: t.projects.space4all.date,
      description: t.projects.space4all.overview.substring(0, 150) + '...',
      images: [
        '/projects/space4all/Cover.jpg',
        '/projects/space4all/Image1.png',
        '/projects/space4all/Image2.JPG',
        '/projects/space4all/Image3.jpg',
      ],
      video: '/projects/space4all/Video.MOV',
    },
    {
      id: 'bazaruto',
      title: t.projects.bazaruto.title,
      subtitle: t.projects.bazaruto.subtitle,
      date: t.projects.bazaruto.date,
      description: t.projects.bazaruto.overviewText.substring(0, 150) + '...',
      images: [
        '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 1_ Cover Image.jpg',
        '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 2 Workshop at District Level.JPG',
        '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 3 _ CCP Participatory Mapping.jpg',
        '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 4 Island Community Participatory Mapping.JPG',
      ],
    },
    {
      id: 'luisa',
      title: t.projects.luisa.title,
      subtitle: t.projects.luisa.subtitle,
      date: t.projects.luisa.date,
      description: t.projects.luisa.overviewText.substring(0, 150) + '...',
      images: [
        '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/IMAGE 1 Cover .jpg',
        '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 2.jpg',
        '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 3.jpg',
        '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 4.jpg',
      ],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-block mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FolderKanban className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          {t.projects.title}
        </h2>
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}