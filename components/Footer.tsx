'use client'

import { useLanguage } from './LanguageProvider'
import { Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/deyril-marlon-ibraimo',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      borderColor: 'border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400',
      shadowColor: 'shadow-blue-500/50',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/deyril.marlon',
      icon: Facebook,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      borderColor: 'border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400',
      shadowColor: 'shadow-blue-500/50',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/deyril_marlon',
      icon: Instagram,
      color: 'from-pink-500 via-purple-500 to-orange-500',
      bgColor: 'from-pink-50 via-purple-50 to-orange-50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-orange-900/30',
      borderColor: 'border-pink-200 dark:border-pink-700/50 group-hover:border-pink-500 dark:group-hover:border-pink-400',
      shadowColor: 'shadow-pink-500/50',
      iconColor: 'text-pink-500 dark:text-pink-400',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/258845486656?text=${encodeURIComponent(t.contact.whatsappMessage)}`,
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
      borderColor: 'border-green-200 dark:border-green-700/50 group-hover:border-green-500 dark:group-hover:border-green-400',
      shadowColor: 'shadow-green-500/50',
      iconColor: 'text-green-500 dark:text-green-400',
    },
  ]

  return (
    <footer className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-primary/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
              DM
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Deyril Marlon Ibraimo</span>
          </div>
          
          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {currentYear} Deyril Marlon Ibraimo. {t.footer.allRightsReserved}.
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              const getBorderColor = () => {
                if (social.name === 'LinkedIn') return 'border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400'
                if (social.name === 'Facebook') return 'border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400'
                if (social.name === 'Instagram') return 'border-pink-200 dark:border-pink-700/50 group-hover:border-pink-500 dark:group-hover:border-pink-400'
                return 'border-green-200 dark:border-green-700/50 group-hover:border-green-500 dark:group-hover:border-green-400'
              }
              const getShadowColor = () => {
                if (social.name === 'LinkedIn' || social.name === 'Facebook') return 'group-hover:shadow-blue-500/50'
                if (social.name === 'Instagram') return 'group-hover:shadow-pink-500/50'
                return 'group-hover:shadow-green-500/50'
              }
              const getPulseColor = () => {
                if (social.name === 'LinkedIn' || social.name === 'Facebook') return 'border-blue-500'
                if (social.name === 'Instagram') return 'border-pink-500'
                return 'border-green-500'
              }
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500 transform hover:scale-125 hover:rotate-12"
                  aria-label={social.name}
                >
                  {/* Animated background ring */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150`}></div>
                  {/* Icon container */}
                  <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${social.bgColor} flex items-center justify-center border-2 ${getBorderColor()} transition-all duration-500 group-hover:shadow-lg ${getShadowColor()}`}>
                    <Icon className={`w-6 h-6 ${social.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  {/* Pulse effect */}
                  <div className={`absolute inset-0 rounded-full border-2 ${getPulseColor()} opacity-0 group-hover:opacity-100 group-hover:animate-ping`}></div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

