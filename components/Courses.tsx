'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { GraduationCap, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Courses() {
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

  const courses = [
    {
      titleKey: 'bscAgriculturalEngineering',
      institutionKey: 'eduardoMondlaneUniversity',
      locationKey: 'mozambique',
    },
    {
      titleKey: 'uavPrecisionAgriculture',
      institutionKey: 'universityOfTwente',
      locationKey: 'netherlands',
    },
    {
      titleKey: 'advancedStatistics',
      institutionKey: 'centreOfExcellenceUEM',
      locationKey: 'mozambique',
    },
    {
      titleKey: 'qualiQuantitativeResearch',
      institutionKey: 'amazonasUniversity',
      locationKey: 'brazil',
    },
  ]

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-sky-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-amber-500 to-orange-500',
  ]

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          {t.courses.title}
        </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, index) => {
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
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/30 group-hover:shadow-primary/50`}
                  >
                    <GraduationCap className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {t.courses.coursesList[course.titleKey as keyof typeof t.courses.coursesList]}
                  </h3>

                  {/* Institution and Location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-primary dark:text-primary-light font-semibold">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm md:text-base">
                        {t.courses.institutions[course.institutionKey as keyof typeof t.courses.institutions]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {t.courses.locations[course.locationKey as keyof typeof t.courses.locations]}
                      </span>
                    </div>
                  </div>
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