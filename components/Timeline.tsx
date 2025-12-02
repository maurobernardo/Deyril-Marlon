'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'

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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {t.timeline.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.timeline.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-light to-primary-dark transform md:-translate-x-1/2 opacity-60"></div>

          {/* Timeline Items - Grouped in pairs */}
          <div className="space-y-8 md:space-y-12">
            {Array.from({ length: Math.ceil(timelineItems.length / 2) }).map((_, pairIndex) => {
              const firstIndex = pairIndex * 2
              const secondIndex = firstIndex + 1
              const firstItem = timelineItems[firstIndex]
              const secondItem = timelineItems[secondIndex]

              return (
                <div key={pairIndex} className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8 pb-8 md:pb-12">
                  {/* Timeline Dot - Shared for the pair */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20 top-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl border-4 border-white dark:border-dark-bg hover:scale-110 transition-transform duration-300">
                      {(() => {
                        const IconComponent = firstItem ? getIconComponent(firstItem.type) : (secondItem ? getIconComponent(secondItem.type) : Award)
                        return <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      })()}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10"></div>
                  </div>

                  {/* First Card (Left) */}
                  {firstItem && (
                    <motion.div
                      className="relative w-full md:w-[calc(50%-20px)]"
                      initial={{ opacity: 0, x: -50 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: firstIndex * 0.15 }}
                    >
                      {/* Timeline Dot - Mobile */}
                      <div className="absolute left-8 transform z-20 top-4 md:hidden">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl border-4 border-white dark:border-dark-bg">
                          {(() => {
                            const IconComponent = getIconComponent(firstItem.type)
                            return <IconComponent className="w-7 h-7 text-white" />
                          })()}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10"></div>
                      </div>

                      {/* Content Card */}
                      <div className="ml-24 md:ml-0 md:pr-6">
                        <motion.div
                          className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 h-full"
                          whileHover={{ scale: 1.01 }}
                        >
                          {/* Type Badge */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary dark:text-primary-light border border-primary/30">
                              {firstItem.typeLabel}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {firstItem.period}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                            {firstItem.title}
                          </h3>

                          {/* Organization/Location */}
                          {(firstItem.organization || firstItem.location) && (
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-600 dark:text-gray-400">
                              {firstItem.organization && (
                                <span className="flex items-center gap-1.5 text-sm">
                                  <Briefcase className="w-4 h-4 text-primary" />
                                  {firstItem.organization}
                                </span>
                              )}
                              {firstItem.location && (
                                <span className="flex items-center gap-1.5 text-sm">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  {firstItem.location}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Description */}
                          {firstItem.description && (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-sm md:text-base">
                              {firstItem.description}
                            </p>
                          )}

                          {/* Achievements/Highlights */}
                          {firstItem.highlights && firstItem.highlights.length > 0 && (
                            <ul className="space-y-2.5">
                              {firstItem.highlights.map((highlight, hIndex) => (
                                <li
                                  key={hIndex}
                                  className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                                  <span className="leading-relaxed">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Second Card (Right) */}
                  {secondItem && (
                    <motion.div
                      className="relative w-full md:w-[calc(50%-20px)] md:ml-auto"
                      initial={{ opacity: 0, x: 50 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: secondIndex * 0.15 }}
                    >
                      {/* Timeline Dot - Mobile */}
                      <div className="absolute left-8 transform z-20 top-4 md:hidden">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl border-4 border-white dark:border-dark-bg">
                          {(() => {
                            const IconComponent = getIconComponent(secondItem.type)
                            return <IconComponent className="w-7 h-7 text-white" />
                          })()}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10"></div>
                      </div>

                      {/* Content Card */}
                      <div className="ml-24 md:ml-0 md:pl-6">
                        <motion.div
                          className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 h-full"
                          whileHover={{ scale: 1.01 }}
                        >
                          {/* Type Badge */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary dark:text-primary-light border border-primary/30">
                              {secondItem.typeLabel}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {secondItem.period}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                            {secondItem.title}
                          </h3>

                          {/* Organization/Location */}
                          {(secondItem.organization || secondItem.location) && (
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-600 dark:text-gray-400">
                              {secondItem.organization && (
                                <span className="flex items-center gap-1.5 text-sm">
                                  <Briefcase className="w-4 h-4 text-primary" />
                                  {secondItem.organization}
                                </span>
                              )}
                              {secondItem.location && (
                                <span className="flex items-center gap-1.5 text-sm">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  {secondItem.location}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Description */}
                          {secondItem.description && (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-sm md:text-base">
                              {secondItem.description}
                            </p>
                          )}

                          {/* Achievements/Highlights */}
                          {secondItem.highlights && secondItem.highlights.length > 0 && (
                            <ul className="space-y-2.5">
                              {secondItem.highlights.map((highlight, hIndex) => (
                                <li
                                  key={hIndex}
                                  className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                                  <span className="leading-relaxed">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
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
      return Award
  }
}



