'use client'

import { useLanguage } from './LanguageProvider'
import { motion } from 'framer-motion'

export default function Training() {
  const { t } = useLanguage()

  const trainings = [
    {
      title: 'Community-Based Biodiversity Monitoring',
      location: 'Mozambique',
      year: '2024',
      description: 'Training local communities in participatory spatial data collection for biodiversity monitoring',
    },
    {
      title: 'GIS Applications for Natural Resource Management',
      location: 'Kenya',
      year: '2023',
      description: 'Workshop on using GIS tools for community-based natural resources management',
    },
    // Add more trainings as needed
  ]

  return (
    <section id="training" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.training.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {trainings.map((training, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{training.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{training.year}</span>
              </div>
              <p className="text-primary dark:text-primary-light font-medium mb-2">{training.location}</p>
              <p className="text-gray-600 dark:text-gray-400">{training.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}