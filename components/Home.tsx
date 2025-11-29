'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import Image from 'next/image'
import { Linkedin, Facebook, Instagram, MessageCircle, Download, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const { t } = useLanguage()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % t.home.rotatingTexts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [t.home.rotatingTexts.length])

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/déyril-m-ibraimo-6b0707230?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    facebook: 'https://facebook.com/deyril.marlon',
    instagram: 'https://instagram.com/deyril.marlon',
    whatsapp: `https://wa.me/258845486656?text=${encodeURIComponent(t.contact.whatsappMessage)}`,
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Text Content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              {t.home.iAm} <span className="text-primary dark:text-primary-light">{t.home.name.split(' ')[0]}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200">
              {t.home.title}
            </h2>
          </motion.div>

          {/* Rotating Text */}
          <motion.div 
            className="h-20 md:h-24 relative"
            key={currentTextIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                {t.home.rotatingTexts[currentTextIndex]}
              </span>
            </p>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex items-center flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500"
              title="LinkedIn"
              whileHover={{ scale: 1.2, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
              {/* Icon with gradient */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </motion.a>
            <motion.a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500"
              title="Facebook"
              whileHover={{ scale: 1.2, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <Facebook className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </motion.a>
            <motion.a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500"
              title="Instagram"
              whileHover={{ scale: 1.2, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-orange-900/30 flex items-center justify-center border-2 border-pink-200 dark:border-pink-700/50 group-hover:border-pink-500 dark:group-hover:border-pink-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-pink-500/50">
                <Instagram className="w-6 h-6 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-pink-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </motion.a>
            <motion.a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500"
              title="WhatsApp"
              whileHover={{ scale: 1.2, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center border-2 border-green-200 dark:border-green-700/50 group-hover:border-green-500 dark:group-hover:border-green-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-green-500/50">
                <MessageCircle className="w-6 h-6 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-green-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </motion.a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="/cv.pdf"
              download
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:from-primary-light hover:to-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>{t.home.downloadCV}</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 dark:bg-dark-card/50 backdrop-blur-sm border-2 border-primary/30 text-primary dark:text-primary-light font-semibold rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>{t.home.contact}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Animated gradient rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-primary/30 via-primary-light/30 to-primary/30 blur-2xl animate-pulse-glow"></div>
              <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            </div>
            
            {/* Profile Image */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 dark:border-primary/50 shadow-2xl shadow-primary/30 transform hover:scale-105 transition-all duration-500 animate-float bg-gradient-to-br from-primary/20 to-primary-dark/20">
              <Image
                src="/profile.png"
                alt="Deyril Marlon Ibraimo"
                width={400}
                height={400}
                className="object-contain w-full h-full relative z-10"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
