'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    // Initialize with greeting when chatbot opens
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        text: t.chatbot.greeting,
        sender: 'bot',
        timestamp: new Date(),
      }])
    }
  }, [isOpen, t.chatbot.greeting, messages.length])

  // Knowledge base about Deyril Marlon Ibraimo
  const knowledgeBase = {
    en: {
      name: 'Deyril Marlon Ibraimo',
      title: 'Agronomist & Remote Sensing Analyst',
      experience: 'Over 3 years of experience in Remote Sensing and GIS',
      expertise: [
        'GIS and Earth Observation Systems',
        'Agriculture, Forest and biodiversity monitoring',
        'Participatory spatial data for community-based natural resources management',
        'Research design and Monitoring, Evaluation & Learning (MEL)',
      ],
      projects: [
        'SPACE4ALL - Mapping climate vulnerabilities of slums',
        'Participatory Coastal Resources Mapping in Greater Bazaruto',
        'LUISA - Land Use Intensity for Sustainable Agriculture in Africa',
      ],
      skills: [
        'Remote Sensing',
        'Geographic Information Systems (GIS)',
        'Data Analysis',
        'Precision Agriculture',
        'Community Engagement',
      ],
      education: [
        'BSc. Agricultural Engineering - Eduardo Mondlane University',
        'UAV in Precision Agriculture - University of Twente',
        'Advanced Statistics and Experimental Design',
        'Quali and Quantitative Research & Data Analysis - Amazonas University',
      ],
      publications: [
        'Exposed yet unmapped? Evidence of differential flood exposure in deprived urban areas using citizen science',
        'Validation of Leaf Area Index and Canopy Water Content through Sentinel-2 images in maize crop',
      ],
      contact: {
        email: 'deyrilibraimo@gmail.com',
        phone: '+258 845 486 656',
        linkedin: 'https://www.linkedin.com/in/déyril-m-ibraimo-6b0707230?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
    },
    pt: {
      name: 'Deyril Marlon Ibraimo',
      title: 'Agrónomo e Analista de Sensoriamento Remoto',
      experience: 'Mais de 3 anos de experiência em Sensoriamento Remoto e SIG',
      expertise: [
        'Sistemas de SIG e Observação da Terra',
        'Monitoramento de Agricultura, Floresta e biodiversidade',
        'Dados espaciais participativos para gestão comunitária de recursos naturais',
        'Design de pesquisa e Monitoramento, Avaliação e Aprendizagem (MEL)',
      ],
      projects: [
        'SPACE4ALL - Mapeamento de vulnerabilidades climáticas de favelas',
        'Mapeamento Participativo de Recursos Costeiros na Grande Bazaruto',
        'LUISA - Intensidade do Uso da Terra para Agricultura Sustentável em África',
      ],
      skills: [
        'Sensoriamento Remoto',
        'Sistemas de Informação Geográfica (SIG)',
        'Análise de Dados',
        'Agricultura de Precisão',
        'Engajamento Comunitário',
      ],
      education: [
        'Licenciatura em Engenharia Agronómica - Universidade Eduardo Mondlane',
        'UAV em Agricultura de Precisão - Universidade de Twente',
        'Estatística Avançada e Desenho Experimental',
        'Investigação Qualitativa e Quantitativa & Análise de Dados - Universidade do Amazonas',
      ],
      publications: [
        'Exposto mas não mapeado? Evidência de exposição diferencial a inundações em áreas urbanas carentes usando ciência cidadã',
        'Validação do Índice de Área Foliar e Conteúdo de Água do Dossel através de imagens Sentinel-2 em culturas de milho',
      ],
      contact: {
        email: 'deyrilibraimo@gmail.com',
        phone: '+258 845 486 656',
        linkedin: 'https://www.linkedin.com/in/déyril-m-ibraimo-6b0707230?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      },
    },
  }

  const getResponse = (userMessage: string): string => {
    const kb = knowledgeBase[language]
    const message = userMessage.toLowerCase()
    const hour = new Date().getHours()

    // Greetings with time-based responses
    if (message.match(/bom dia|good morning|buenos días|guten morgen|bonjour/i)) {
      return language === 'en'
        ? hour < 12 
          ? "Good morning! How can I help you learn about Deyril Marlon Ibraimo today?"
          : "Good morning! (Although it's a bit late for that 😊) How can I help you learn about Deyril Marlon Ibraimo?"
        : hour < 12
          ? "Bom dia! Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo hoje?"
          : "Bom dia! (Embora seja um pouco tarde para isso 😊) Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
    }

    if (message.match(/boa tarde|good afternoon|buenas tardes|buon pomeriggio/i)) {
      return language === 'en'
        ? hour >= 12 && hour < 18
          ? "Good afternoon! How can I help you learn about Deyril Marlon Ibraimo?"
          : hour < 12
            ? "Good afternoon! (A bit early, but that's okay 😊) How can I help you learn about Deyril Marlon Ibraimo?"
            : "Good afternoon! (It's actually evening now 😊) How can I help you learn about Deyril Marlon Ibraimo?"
        : hour >= 12 && hour < 18
          ? "Boa tarde! Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
          : hour < 12
            ? "Boa tarde! (Um pouco cedo, mas tudo bem 😊) Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
            : "Boa tarde! (Na verdade já é noite 😊) Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
    }

    if (message.match(/boa noite|good evening|good night|buenas noches|buona sera|buona notte|gute nacht/i)) {
      return language === 'en'
        ? hour >= 18 || hour < 6
          ? "Good evening! How can I help you learn about Deyril Marlon Ibraimo?"
          : "Good evening! (It's still daytime, but that's fine 😊) How can I help you learn about Deyril Marlon Ibraimo?"
        : hour >= 18 || hour < 6
          ? "Boa noite! Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
          : "Boa noite! (Ainda é dia, mas tudo bem 😊) Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?"
    }

    // General greetings - expanded with more variations
    if (message.match(/hello|hi|hey|olá|oi|e aí|eae|eai|salut|ciao|hallo|hola|こんにちは|你好|hey there|hi there|hey you|olá tudo bem|tudo bem|como vai|como está|how are you|what's up|sup|wassup|yo|eae|eai|opa|eita|fala|fala aí|beleza|blz/i)) {
      const greetings = language === 'en' 
        ? [
            "Hello! How can I help you learn about Deyril Marlon Ibraimo today?",
            "Hi there! What would you like to know about Deyril Marlon Ibraimo?",
            "Hey! I'm here to answer questions about Deyril Marlon Ibraimo. What can I help you with?",
            "Hello! Welcome! I can help you learn about Deyril Marlon Ibraimo's experience, skills, and projects.",
            "Hi! Great to see you! Ask me anything about Deyril Marlon Ibraimo.",
            "Hey there! I'm ready to answer your questions about Deyril Marlon Ibraimo.",
            "Hello! I'm here to help you discover more about Deyril Marlon Ibraimo's work and expertise.",
          ]
        : [
            "Olá! Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo hoje?",
            "Oi! O que gostaria de saber sobre Deyril Marlon Ibraimo?",
            "Olá! Estou aqui para responder perguntas sobre Deyril Marlon Ibraimo. Como posso ajudá-lo?",
            "Olá! Bem-vindo! Posso ajudá-lo a conhecer mais sobre a experiência, competências e projetos de Deyril Marlon Ibraimo.",
            "Oi! Que bom te ver! Pergunte-me qualquer coisa sobre Deyril Marlon Ibraimo.",
            "Olá! Estou pronto para responder suas perguntas sobre Deyril Marlon Ibraimo.",
            "Olá! Estou aqui para ajudá-lo a descobrir mais sobre o trabalho e a expertise de Deyril Marlon Ibraimo.",
            "E aí! Tudo bem? Como posso ajudá-lo a conhecer mais sobre Deyril Marlon Ibraimo?",
            "Opa! Fala aí! Pergunte o que quiser sobre Deyril Marlon Ibraimo.",
          ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    }

    // Thank you responses
    if (message.match(/thank|thanks|obrigado|obrigada|grato|grateful|agradecido|merci|gracias|danke|grazie|ありがとう|谢谢/i)) {
      const thanks = language === 'en'
        ? [
            "You're welcome! Is there anything else you'd like to know about Deyril Marlon Ibraimo?",
            "My pleasure! Feel free to ask more questions.",
            "Happy to help! What else can I tell you?",
            "You're very welcome! Ask me anything else about Deyril Marlon Ibraimo.",
          ]
        : [
            "De nada! Há mais alguma coisa que gostaria de saber sobre Deyril Marlon Ibraimo?",
            "Por nada! Sinta-se à vontade para fazer mais perguntas.",
            "Fico feliz em ajudar! O que mais posso contar?",
            "Muito obrigado! Pergunte-me qualquer outra coisa sobre Deyril Marlon Ibraimo.",
            "Disponha! Estou aqui para ajudar.",
          ]
      return thanks[Math.floor(Math.random() * thanks.length)]
    }

    // Goodbye responses
    if (message.match(/bye|goodbye|tchau|até logo|até mais|see you|até breve|farewell|adeus|ciao|au revoir|hasta luego|auf wiedersehen|さようなら|再见/i)) {
      const goodbyes = language === 'en'
        ? [
            "Goodbye! Feel free to come back anytime if you have more questions about Deyril Marlon Ibraimo.",
            "See you later! Don't hesitate to return if you need more information.",
            "Farewell! I'm here whenever you need to know more about Deyril Marlon Ibraimo.",
            "Take care! Come back anytime for more questions.",
          ]
        : [
            "Tchau! Sinta-se à vontade para voltar a qualquer momento se tiver mais perguntas sobre Deyril Marlon Ibraimo.",
            "Até logo! Não hesite em voltar se precisar de mais informações.",
            "Até mais! Estou aqui sempre que precisar saber mais sobre Deyril Marlon Ibraimo.",
            "Cuide-se! Volte a qualquer momento para mais perguntas.",
            "Até breve! Foi um prazer ajudar!",
          ]
      return goodbyes[Math.floor(Math.random() * goodbyes.length)]
    }

    // Name
    if (message.match(/name|nome|quem é|who is/)) {
      return language === 'en'
        ? `${kb.name} is an ${kb.title} with ${kb.experience}.`
        : `${kb.name} é um ${kb.title} com ${kb.experience}.`
    }

    // Title/Profession
    if (message.match(/title|profession|profissão|o que faz|what does|trabalho|job/)) {
      return language === 'en'
        ? `${kb.name} is an ${kb.title}. ${kb.experience}.`
        : `${kb.name} é um ${kb.title}. ${kb.experience}.`
    }

    // Experience
    if (message.match(/experience|experiência|anos|years|tempo|how long/)) {
      return language === 'en'
        ? `${kb.name} has ${kb.experience} in Remote Sensing, GIS, and Earth Observation Systems.`
        : `${kb.name} tem ${kb.experience} em Sensoriamento Remoto, SIG e Sistemas de Observação da Terra.`
    }

    // Skills
    if (message.match(/skills|habilidades|competências|what can|o que sabe|ferramentas|tools/)) {
      return language === 'en'
        ? `Key skills include: ${kb.skills.join(', ')}.`
        : `Principais competências incluem: ${kb.skills.join(', ')}.`
    }

    // Projects
    if (message.match(/projects|projetos|work|trabalho|what projects|quais projetos/)) {
      return language === 'en'
        ? `Some notable projects: ${kb.projects.join('; ')}.`
        : `Alguns projetos notáveis: ${kb.projects.join('; ')}.`
    }

    // Education
    if (message.match(/education|educação|formação|courses|cursos|degree|diploma|graduação/)) {
      return language === 'en'
        ? `Education includes: ${kb.education.join('; ')}.`
        : `Formação inclui: ${kb.education.join('; ')}.`
    }

    // Publications
    if (message.match(/publications|publicações|papers|artigos|research|pesquisa/)) {
      return language === 'en'
        ? `Publications include: ${kb.publications.join('; ')}.`
        : `Publicações incluem: ${kb.publications.join('; ')}.`
    }

    // Contact
    if (message.match(/contact|contato|email|phone|telefone|how to reach|como contatar/)) {
      return language === 'en'
        ? `You can reach ${kb.name} at: Email: ${kb.contact.email}, Phone: ${kb.contact.phone}, LinkedIn: ${kb.contact.linkedin}`
        : `Pode contactar ${kb.name} através de: Email: ${kb.contact.email}, Telefone: ${kb.contact.phone}, LinkedIn: ${kb.contact.linkedin}`
    }

    // Expertise areas
    if (message.match(/expertise|especialização|specialization|what is|o que é|áreas|areas/)) {
      return language === 'en'
        ? `Areas of expertise: ${kb.expertise.join('; ')}.`
        : `Áreas de especialização: ${kb.expertise.join('; ')}.`
    }

    // SPACE4ALL
    if (message.match(/space4all|space 4 all/)) {
      return language === 'en'
        ? 'SPACE4ALL is a project mapping climate vulnerabilities of slums by combining citizen science and earth observation technology. It was conducted in African cities including Kisumu and Nairobi in Kenya, Accra and Tema in Ghana, and Beira and Chimoio in Mozambique.'
        : 'SPACE4ALL é um projeto de mapeamento de vulnerabilidades climáticas de favelas combinando ciência cidadã e tecnologia de observação da terra. Foi realizado em cidades africanas incluindo Kisumu e Nairobi no Quênia, Accra e Tema em Gana, e Beira e Chimoio em Moçambique.'
    }

    // Default response
    return t.chatbot.defaultResponse
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-primary-light text-white rounded-full shadow-2xl hover:shadow-primary/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 group"
          aria-label={t.chatbot.openChatbot}
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-primary/20 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {t.chatbot.title}
                </h3>
                <p className="text-xs text-white/80">
                  {t.chatbot.online}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={t.chatbot.closeChatbot}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-surface">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white'
                      : 'bg-white dark:bg-dark-card text-gray-900 dark:text-white border border-gray-200 dark:border-primary/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-dark-card rounded-2xl px-4 py-2 border border-gray-200 dark:border-primary/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-primary/20 bg-white dark:bg-dark-card">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.chatbot.placeholder}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-primary/30 bg-white dark:bg-dark-surface text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {t.chatbot.hint}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

