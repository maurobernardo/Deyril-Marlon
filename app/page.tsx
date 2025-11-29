import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Courses from '@/components/Courses'
import Publications from '@/components/Publications'
import Training from '@/components/Training'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      <Navbar />
      <Home />
      <About />
      <Timeline />
      <Projects />
      <Skills />
      <Courses />
      <Publications />
      <Training />
      <Contact />
      <Footer />
    </main>
  )
}