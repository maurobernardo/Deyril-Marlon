'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import { Mail, Send, MessageSquare, User, FileText, Phone, Linkedin, MessageCircle, MapPin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

export default function Contact() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    apelido: '',
    email: '',
    assunto: '',
    contacto: '',
    mensagem: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    // Initialize EmailJS with your public key
    // Note: EmailJS v4+ doesn't require init() - the public key is passed directly to send()
    // But we can still initialize for compatibility
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      try {
        emailjs.init(publicKey)
      } catch (error) {
        console.warn('EmailJS init warning:', error)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Validate EmailJS configuration
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setSubmitStatus('error')
      setErrorMessage(
        language === 'pt' 
          ? 'EmailJS não está configurado. Configure as variáveis de ambiente no Vercel: Settings → Environment Variables. Veja CONFIGURAR_VERCEL.md para instruções.'
          : 'EmailJS is not configured. Set environment variables in Vercel: Settings → Environment Variables. See CONFIGURAR_VERCEL.md for instructions.'
      )
      setIsSubmitting(false)
      return
    }

    try {
      const templateParams = {
        title: formData.assunto,
        name: `${formData.nome} ${formData.apelido}`,
        email: formData.email, // Usado no Reply To como {{from_email}}
        from_name: `${formData.nome} ${formData.apelido}`,
        from_email: formData.email, // Usado no Reply To
        phone: formData.contacto,
        subject: formData.assunto,
        message: formData.mensagem,
        time: new Date().toLocaleString('pt-PT', {
          dateStyle: 'full',
          timeStyle: 'short'
        }),
        to_email: 'deyrilibraimo@gmail.com',
      }

      // Get environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      // Validate all required variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is incomplete. Please check your .env.local file.')
      }

      console.log('Sending email with:', {
        serviceId,
        templateId,
        publicKey: publicKey.substring(0, 5) + '...' // Only show first 5 chars for security
      })

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      console.log('Email sent successfully:', result)
      
      setSubmitStatus('success')
      setFormData({
        nome: '',
        apelido: '',
        email: '',
        assunto: '',
        contacto: '',
        mensagem: '',
      })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      console.error('Error sending email:', error)
      console.error('Error details:', {
        text: error?.text,
        status: error?.status,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Not set'
      })
      setSubmitStatus('error')
      setErrorMessage(error?.text || t.contact.errorMessage)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
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
                {t.contact.title}
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <div
            className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              {t.contact.sendMessage}
            </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Surname Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nome" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-primary" />
                  {t.contact.nome}
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder={t.contact.nomePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="apelido" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-primary" />
                  {t.contact.apelido}
                </label>
                <input
                  type="text"
                  id="apelido"
                  name="apelido"
                  value={formData.apelido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder={t.contact.apelidoPlaceholder}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4 text-primary" />
                {t.contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder={t.contact.emailPlaceholder}
              />
            </div>

            {/* Subject and Contact Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="assunto" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4 text-primary" />
                  {t.contact.assunto}
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder={t.contact.assuntoPlaceholder}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contacto" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-primary" />
                  {t.contact.contacto}
                </label>
                <input
                  type="tel"
                  id="contacto"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder={t.contact.contactoPlaceholder}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="mensagem" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <MessageSquare className="w-4 h-4 text-primary" />
                {t.contact.mensagem}
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                placeholder={t.contact.mensagemPlaceholder}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:from-primary-light hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t.contact.sending}</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t.contact.success}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>{t.contact.send}</span>
                </>
              )}
            </motion.button>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-center">
                {t.contact.successMessage}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-center">
                {errorMessage || t.contact.errorMessage}
              </div>
            )}
          </form>
          </div>

          {/* Right: Connect with Us Card */}
          <div
            className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              {t.contact.connectWithUs}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
              {t.contact.scheduleConsultation}
            </p>

            {/* Contact Information */}
            <div className="space-y-6 mb-8">
              {/* Email */}
              <a
                href="mailto:deyrilibraimo@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-surface/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white font-semibold group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    deyrilibraimo@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone/WhatsApp */}
              <a
                href={`https://wa.me/258845486656?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-surface/50 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.contact.contacto}</p>
                  <p className="text-gray-900 dark:text-white font-semibold group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                    +258 845 486 656
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-surface/50 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.contact.location}</p>
                  <p className="text-gray-900 dark:text-white font-semibold group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {t.contact.city}, {t.contact.province}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t.contact.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats - Small and discrete */}
            <div className="mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-primary dark:text-primary-light">3+</span>
                  <span>{t.stats.yearsExperience}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-primary dark:text-primary-light">10+</span>
                  <span>{t.stats.projectsCompleted}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-primary dark:text-primary-light">5+</span>
                  <span>{t.stats.publications}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-primary dark:text-primary-light">15+</span>
                  <span>{t.stats.communitiesTrained}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-primary dark:text-primary-light">3+</span>
                  <span>{t.stats.countriesWorked}</span>
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.contact.followUs}
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/déyril-m-ibraimo-6b0707230?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500 transform hover:scale-125 hover:rotate-12"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-700/50 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </a>
                <a
                  href={`https://wa.me/258845486656?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 transition-all duration-500 transform hover:scale-125 hover:rotate-12"
                  aria-label="WhatsApp"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-150"></div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center border-2 border-green-200 dark:border-green-700/50 group-hover:border-green-500 dark:group-hover:border-green-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-green-500/50">
                    <MessageCircle className="w-6 h-6 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-green-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

