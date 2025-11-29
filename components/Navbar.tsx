'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'
import Link from 'next/link'
import { 
  Home, 
  User, 
  FolderKanban, 
  Code, 
  GraduationCap, 
  BookOpen, 
  Users,
  Sun,
  Moon,
  Languages,
  Menu,
  X
} from 'lucide-react'

export default function Navbar() {
  const { t, toggleLanguage, language } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isProjectPage = pathname?.startsWith('/projects/')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (isProjectPage) {
      e.preventDefault()
      router.push(`/${anchor}`)
    } else {
      // Smooth scroll to section
      e.preventDefault()
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const navItems = [
    { key: 'home', href: '#home', icon: Home },
    { key: 'about', href: '#about', icon: User },
    { key: 'projects', href: '#projects', icon: FolderKanban },
    { key: 'skills', href: '#skills', icon: Code },
    { key: 'courses', href: '#courses', icon: GraduationCap },
    { key: 'publications', href: '#publications', icon: BookOpen },
    { key: 'training', href: '#training', icon: Users },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl shadow-xl border-b border-primary/10 dark:border-primary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href={isProjectPage ? "/#home" : "#home"} 
              className="text-xl font-bold text-primary dark:text-primary-light"
            >
              DM
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 ml-auto mr-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const href = isProjectPage ? `/${item.href}` : item.href
              return (
              <Link
                key={item.key}
                  href={href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group font-medium"
              >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{t.nav[item.key as keyof typeof t.nav]}</span>
              </Link>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group border border-transparent hover:border-primary/30"
              title={language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <Languages className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group border border-transparent hover:border-primary/30"
              title={theme === 'dark' ? 'Switch to light mode' : 'Mudar para modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
                {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
                ) : (
                <Menu className="w-6 h-6" />
                )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const href = isProjectPage ? `/${item.href}` : item.href
              return (
              <Link
                key={item.key}
                  href={href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false)
                    handleNavClick(e, item.href)
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card"
              >
                  <Icon className="w-5 h-5" />
                  <span>{t.nav[item.key as keyof typeof t.nav]}</span>
              </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}