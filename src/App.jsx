import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Marquee, Problem, Turn } from './components/Story'
import Vitrine from './components/Vitrine'
import { HowItWorks, Bento } from './components/Process'
import { About, Testimonials, Faq, FinalCTA, Footer, FloatingWA, MobileBar, Cursor } from './components/Closing'
import { TideDivider, useFinePointer, useMobile } from './components/ui'
import { scrollStore } from './scroll'

export default function App() {
  const fine = useFinePointer()
  const mobile = useMobile()
  const [heroGone, setHeroGone] = useState(false)
  const [finalIn, setFinalIn] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    scrollStore.lenis = lenis
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); scrollStore.lenis = null }
  }, [])

  useEffect(() => {
    const hero = document.getElementById('topo')
    const fin = document.getElementById('cta-final')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) setHeroGone(!e.isIntersecting)
        if (e.target === fin) setFinalIn(e.isIntersecting)
      })
    }, { threshold: 0.05 })
    io.observe(hero); io.observe(fin)
    return () => io.disconnect()
  }, [])

  const showFloat = heroGone && !finalIn

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip">Pular para o conteúdo</a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Problem />
        <Turn />
        <Vitrine />
        <TideDivider from="#FAF7F2" to="#EFE6D8" />
        <HowItWorks />
        <TideDivider from="#EFE6D8" to="#FAF7F2" />
        <Bento />
        <TideDivider from="#FAF7F2" to="#EFE6D8" />
        <About />
        <TideDivider from="#EFE6D8" to="#FAF7F2" />
        <Testimonials />
        <TideDivider from="#FAF7F2" to="#EFE6D8" />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
      {!mobile && <FloatingWA visible={showFloat} />}
      {mobile && <MobileBar visible={showFloat} />}
      {fine && <Cursor />}
    </MotionConfig>
  )
}
