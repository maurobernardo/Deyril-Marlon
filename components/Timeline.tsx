'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react'

export default function Timeline() {
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

  const timelineItems = t.timeline.items

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className={`text-center mb-16 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {t.timeline.title}
            </h2>
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.timeline.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary-dark transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0
              const IconComponent = getIconComponent(item.type)

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg border-4 border-white dark:border-dark-bg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <motion.div
                      className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Type Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary dark:text-primary-light">
                          {item.typeLabel}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>

                      {/* Organization/Location */}
                      {(item.organization || item.location) && (
                        <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
                          {item.organization && (
                            <span className="flex items-center gap-1 text-sm">
                              <Briefcase className="w-4 h-4" />
                              {item.organization}
                            </span>
                          )}
                          {item.location && (
                            <span className="flex items-center gap-1 text-sm">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}

                      {/* Achievements/Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, hIndex) => (
                            <li
                              key={hIndex}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-primary mt-1">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function getIconComponent(type: string) {
  switch (type) {
    case 'work':
      return Briefcase
    case 'education':
      return GraduationCap
    case 'achievement':
      return Award
    default:
      return Sparkles
  }
}

