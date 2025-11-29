'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import {
  BookOpen,
  Sparkles,
  Award,
  Lightbulb
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
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
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
          {t.about.title}
        </h2>
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Bio Card - Takes 2 columns */}
          <motion.div
            className="lg:col-span-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50"
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
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t.about.bio.split('. ')[0]}.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t.about.bio.split('. ').slice(1, 3).join('. ')}.
            </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.bio.split('. ').slice(3).join('. ')}
          </p>
          </motion.div>

          {/* Highlights Card */}
          <motion.div
            className="bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/20 dark:to-primary-dark/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/30 dark:border-primary/40 hover:border-primary/60 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t.about.keyHighlights}
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t.about.bio.split('. ')[0].split(' ').slice(0, 5).join(' ')}...
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t.about.highlights.specialized}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t.about.highlights.passionate}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  {t.about.highlights.community}
                </span>
              </li>
            </ul>
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
              "{t.about.quote}"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}