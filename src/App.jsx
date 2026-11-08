import { useEffect, useState, useMemo, Suspense, startTransition } from 'react'
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
import Wind from './components/Wind'
import { useT } from './i18n'
import { usePrefs } from './prefs'

export default function App() {
  const T = useT()
  const { lang } = usePrefs()
  useEffect(() => {
    document.title = T.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', T.meta.description)
  }, [lang])
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
      startTransition(() => entries.forEach((e) => {
        if (e.target === hero) setHeroGone(!e.isIntersecting)
        if (e.target === fin) setFinalIn(e.isIntersecting)
      }))
    }, { threshold: 0.05 })
    io.observe(hero); io.observe(fin)
    return () => io.disconnect()
  }, [])

  const showFloat = heroGone && !finalIn

  // conteúdo estável: as seções leem idioma/tema sozinhas; mudanças no App não as redesenham
  const content = useMemo(() => (
        <main id="conteudo">
          <Hero />
          <Suspense fallback={null}><Marquee /></Suspense>
          <Suspense fallback={null}><Problem /></Suspense>
          <Suspense fallback={null}><Turn /></Suspense>
          <Suspense fallback={null}><Vitrine /></Suspense>
          <Suspense fallback={null}><TideDivider from="var(--concha)" to="var(--areia)" /></Suspense>
          <Suspense fallback={null}><HowItWorks /></Suspense>
          <Suspense fallback={null}><TideDivider from="var(--areia)" to="var(--concha)" /></Suspense>
          <Suspense fallback={null}><Bento /></Suspense>
          <Suspense fallback={null}><TideDivider from="var(--concha)" to="var(--areia)" /></Suspense>
          <Suspense fallback={null}><About /></Suspense>
          <Suspense fallback={null}><TideDivider from="var(--areia)" to="var(--concha)" /></Suspense>
          <Suspense fallback={null}><Testimonials /></Suspense>
          <Suspense fallback={null}><TideDivider from="var(--concha)" to="var(--areia)" /></Suspense>
          <Suspense fallback={null}><Faq /></Suspense>
          <Suspense fallback={null}><FinalCTA /></Suspense>
        </main>
  ), [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip">{T.skip}</a>
      <Nav />
      {content}
      <Suspense fallback={null}><Footer /></Suspense>
      <Wind />
      {!mobile && <FloatingWA visible={showFloat} />}
      {mobile && <MobileBar visible={showFloat} />}
      {fine && <Cursor />}
    </MotionConfig>
  )
}
