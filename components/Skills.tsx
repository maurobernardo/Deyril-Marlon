'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { motion } from 'framer-motion'
import {
  Satellite,
  Map,
  BarChart3,
  Sprout,
  Database,
  TrendingUp,
  Microscope,
  Leaf,
  Recycle,
  Handshake,
  ChevronDown,
  Settings
} from 'lucide-react'

interface Skill {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tools?: string[]
  color: string
}

export default function Skills() {
  const { t } = useLanguage()
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    {
      name: t.skills.remoteSensing,
      description: t.skills.remoteSensingDescription,
      icon: Satellite,
      tools: ['Sentinel Application Platform-SNAP', 'Google Earth Engine-GEE'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: t.skills.gis,
      description: t.skills.gisDescription,
      icon: Map,
      tools: ['QGIS', 'ArcGIS Pro', 'Google Earth Pro', 'Google MyMaps', 'JOSM'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: t.skills.dataAnalysis,
      description: t.skills.dataAnalysisDescription,
      icon: BarChart3,
      tools: ['Statistical Package for Social Sciences (SPSS)', 'R/Rstudio', 'STATA'],
      color: 'from-sky-500 to-cyan-500',
    },
    {
      name: t.skills.precisionAgriculture,
      description: t.skills.precisionAgricultureDescription,
      icon: Sprout,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      name: t.skills.dataManagement,
      description: t.skills.dataManagementDescription,
      icon: Database,
      tools: ['MySQL', 'ArcGIS Online'],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      name: t.skills.mel,
      description: t.skills.melDescription,
      icon: TrendingUp,
      color: 'from-red-500 to-rose-500',
    },
    {
      name: t.skills.quantitativeQualitative,
      description: t.skills.quantitativeQualitativeDescription,
      icon: Microscope,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      name: t.skills.naturalResourcesManagement,
      description: t.skills.naturalResourcesManagementDescription,
      icon: Leaf,
      color: 'from-green-600 to-teal-600',
    },
    {
      name: t.skills.sustainableLivelihood,
      description: t.skills.sustainableLivelihoodDescription,
      icon: Recycle,
      color: 'from-emerald-500 to-green-500',
    },
    {
      name: t.skills.communityEngagement,
      description: t.skills.communityEngagementDescription,
      icon: Handshake,
      color: 'from-amber-500 to-yellow-500',
    },
  ]

  const toggleSkill = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName)
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {t.skills.title}
        </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`relative h-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                  expandedSkill === skill.name ? 'ring-2 ring-primary shadow-primary/30' : ''
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => skill.tools && toggleSkill(skill.name)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/30 group-hover:shadow-primary/50`}
                    >
                      {(() => {
                        const IconComponent = skill.icon
                        return <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                      })()}
                    </div>
                    {skill.tools && (
                      <div
                        className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center transition-transform duration-300 ${
                          expandedSkill === skill.name ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                    {skill.name}
                  </h3>

                  {/* Skill Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Tools List - Expandable */}
                  {skill.tools && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedSkill === skill.name
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-200 dark:border-dark-surface">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                          <Settings className="w-4 h-4 mr-2 text-primary" />
                          {t.skills.tools}
                        </p>
                        <ul className="space-y-2">
                          {skill.tools.map((tool, toolIndex) => (
                            <li
                              key={toolIndex}
                              className="text-sm text-gray-600 dark:text-gray-400 flex items-start group/item"
                            >
                              <span className="text-primary mr-2 mt-1">▸</span>
                              <span className="group-hover/item:text-primary dark:group-hover/item:text-primary-light transition-colors">
                                {tool}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Hover Indicator */}
                  {hoveredSkill === skill.name && !skill.tools && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}