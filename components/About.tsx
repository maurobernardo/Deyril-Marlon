'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import {
  BookOpen,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
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


  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl"></div>
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
          {t.about.title}
        </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Bio Card */}
          <motion.div
            className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t.about.professionalOverview}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify">
              {t.about.bio.split('. ').slice(0, 3).join('. ')}.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {t.about.bio.split('. ').slice(3).join('. ')}
            </p>
          </motion.div>
        </div>

        {/* Bottom Quote Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="inline-block bg-white dark:bg-dark-card rounded-2xl p-8 shadow-xl border-l-4 border-primary"
            whileHover={{ scale: 1.02 }}
          >
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-lg italic text-gray-700 dark:text-gray-300 max-w-3xl">
              &ldquo;{t.about.quote}&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}