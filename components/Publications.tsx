'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Publications() {
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

  const publications = [
    {
      titleKey: 'exposedUnmapped',
      authorsKey: 'oliveiraEtAl',
      journalKey: 'researchSquare',
      year: '2025',
      link: 'https://doi.org/10.21203/rs.3.rs-6956238/v1',
    },
    {
      titleKey: 'validationLeafArea',
      authorsKey: 'ibraimoMananze',
      journalKey: 'scienceCribe',
      year: '2023',
      link: 'http://196.3.97.28/handle/123456789/3343',
    },
  ]

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-sky-500 to-cyan-500',
  ]

  return (
    <section
      ref={sectionRef}
      id="publications"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-block mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          {t.publications.title}
        </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub, index) => {
            const colorClass = colors[index % colors.length]
            return (
              <motion.div
                key={index}
                className="group bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/30 group-hover:shadow-primary/50`}
                    >
                      <BookOpen className="w-7 h-7 text-white drop-shadow-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors leading-tight">
                        {t.publications.publicationsList[pub.titleKey as keyof typeof t.publications.publicationsList]}
                      </h3>
                    </div>
                  </div>

                  {/* Authors */}
                  <div className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-300">
                    <Users className="w-4 h-4 text-primary dark:text-primary-light flex-shrink-0" />
                    <span className="text-sm md:text-base font-medium">
                      {t.publications.authors[pub.authorsKey as keyof typeof t.publications.authors]}
                    </span>
                  </div>

                  {/* Journal and Year */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-primary dark:text-primary-light font-semibold">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm md:text-base">
                        {t.publications.journals[pub.journalKey as keyof typeof t.publications.journals]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{pub.year}</span>
                    </div>
                </div>

                  {/* Read More Link */}
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 group/link"
                >
                    <span>{t.publications.readMore}</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}