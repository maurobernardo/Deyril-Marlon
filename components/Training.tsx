'use client'

import { useLanguage } from './LanguageProvider'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Users, GraduationCap, Globe, Map, Leaf, Users2, BookOpen } from 'lucide-react'

export default function Training() {
  const { t } = useLanguage()

  const trainings = [
    {
      type: 'koboToolbox',
      image: '/Training/Kobo ToolBox for Data Coollection and  Data Management/imagem.jpg',
    },
    {
      type: 'googleEarthEngine',
      image: '/Training/Google Earth Engine Webinar/image.jpg',
    },
    {
      type: 'googleMyMaps',
      image: '/Training/Google My Maps For Flood Mapping/image.jpg',
    },
    {
      type: 'sustainableNRM',
      image: '/Training/Sustainable Natural Resources Management/image.jpg',
    },
    {
      type: 'communityGovernance',
      image: '/Training/Community Governance/image.jpg',
    },
  ]

  const getTrainingData = (type: string) => {
    if (type === 'koboToolbox') {
      return {
        title: t.training.koboToolbox.title,
        date: t.training.koboToolbox.date,
        description: t.training.koboToolbox.description,
        students: t.training.koboToolbox.students,
        providedBy: t.training.koboToolbox.providedBy,
        programs: t.training.koboToolbox.programs,
        programsList: t.training.koboToolbox.programsList,
        outcome: t.training.koboToolbox.outcome,
        icon: GraduationCap,
      }
    } else if (type === 'googleEarthEngine') {
      return {
        title: t.training.googleEarthEngine.title,
        date: t.training.googleEarthEngine.date,
        description: t.training.googleEarthEngine.description,
        attendees: t.training.googleEarthEngine.attendees,
        providedBy: t.training.googleEarthEngine.providedBy,
        examples: t.training.googleEarthEngine.examples,
        examplesList: t.training.googleEarthEngine.examplesList,
        participants: t.training.googleEarthEngine.participants,
        icon: Globe,
      }
    } else if (type === 'googleMyMaps') {
      return {
        title: t.training.googleMyMaps.title,
        date: t.training.googleMyMaps.date,
        description: t.training.googleMyMaps.description,
        providedBy: t.training.googleMyMaps.providedBy,
        locations: t.training.googleMyMaps.locations,
        locationsList: t.training.googleMyMaps.locationsList,
        icon: Map,
      }
    } else if (type === 'sustainableNRM') {
      return {
        title: t.training.sustainableNRM.title,
        date: t.training.sustainableNRM.date,
        description: t.training.sustainableNRM.description,
        communities: t.training.sustainableNRM.communities,
        providedBy: t.training.sustainableNRM.providedBy,
        communitiesList: t.training.sustainableNRM.communitiesList,
        outcomes: t.training.sustainableNRM.outcomes,
        icon: Leaf,
      }
    } else {
      return {
        title: t.training.communityGovernance.title,
        date: t.training.communityGovernance.date,
        description: t.training.communityGovernance.description,
        committees: t.training.communityGovernance.committees,
        providedBy: t.training.communityGovernance.providedBy,
        contentTitle: t.training.communityGovernance.contentTitle,
        content: t.training.communityGovernance.content,
        icon: Users2,
      }
    }
  }

  return (
    <section id="training" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.training.title}
        </h2>

        {/* Education Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl border-l-4 border-primary-500 mb-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <BookOpen className="w-12 h-12 text-primary-500 dark:text-primary-light mb-6" />
            <blockquote className="text-gray-800 dark:text-white text-xl md:text-2xl italic font-medium leading-relaxed mb-4">
              &quot;Education is the most powerful weapon you can use to change the world&quot;
            </blockquote>
            <p className="text-primary-500 dark:text-primary-light text-base md:text-lg font-bold">
              — Nelson Mandela
            </p>
          </div>
        </motion.div>

        {/* Additional Text Outside Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
            Moved by the quote above, I use part of my time to share and/or transfer skills to the youth and the upcoming generations.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training, index) => {
            const data = getTrainingData(training.type)
            const Icon = data.icon

            return (
            <motion.div 
                key={training.type}
                className="bg-white dark:bg-dark-card rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 191, 255, 0.2)" }}
            >
                {/* Cover Image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                  <Image
                    src={training.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {data.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary dark:text-primary-light">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium text-sm">{data.date}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-sm">{data.description}</p>

                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      {training.type !== 'googleMyMaps' && training.type !== 'sustainableNRM' && training.type !== 'communityGovernance' && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-medium">
                            {training.type === 'koboToolbox' ? data.students : data.attendees}
                          </span>
                        </div>
                      )}
                      {training.type === 'sustainableNRM' && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-medium">{data.communities}</span>
                        </div>
                      )}
                      {training.type === 'communityGovernance' && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-medium">{data.committees}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{data.providedBy}</span>
                      </div>
                    </div>

                    {training.type === 'koboToolbox' && (
                      <>
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                            {data.programs}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {data.programsList}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {data.outcome}
                          </p>
                        </div>
                      </>
                    )}

                    {training.type === 'googleEarthEngine' && (
                      <>
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                            {data.examples}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {data.examplesList}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {data.participants}
                          </p>
                        </div>
                      </>
                    )}

                    {training.type === 'googleMyMaps' && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          {data.locations}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {data.locationsList}
                        </p>
                      </div>
                    )}

                    {training.type === 'sustainableNRM' && (
                      <>
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                            {data.communitiesList}
                          </h4>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {data.outcomes}
                          </p>
                        </div>
                      </>
                    )}

                    {training.type === 'communityGovernance' && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          {data.contentTitle}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {data.content}
                        </p>
                      </div>
                    )}
                  </div>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}