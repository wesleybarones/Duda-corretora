import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion'
import { CTA, Scallop, SunIcon, MoonIcon, EASE } from './ui'
import { useT } from '../i18n'
import { usePrefs, setTheme, setLang } from '../prefs'
import { scrollToId, scrollStore } from '../scroll'

const LINK_IDS = ['como-funciona', 'vitrine', 'sobre', 'duvidas']

function Prefs({ className = '' }) {
  const T = useT()
  const { theme, lang } = usePrefs()
  const night = theme === 'night'
  return (
    <div className={`prefs ${className}`}>
      <button type="button" className="prefs__btn" onClick={() => setTheme(night ? 'day' : 'night')}
        aria-label={night ? T.nav.toDay : T.nav.toNight} title={night ? T.nav.toDay : T.nav.toNight} data-cursor="hide">
        {night ? <SunIcon /> : <MoonIcon />}
      </button>
      <button type="button" className="prefs__btn prefs__lang" onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
        aria-label={T.nav.lang} title={T.nav.lang} lang={lang === 'en' ? 'pt-BR' : 'en'} data-cursor="hide">
        {T.nav.langShort}
      </button>
    </div>
  )
}

export default function Nav() {
  const T = useT()
  const LINKS = LINK_IDS.map((id) => ({ id, label: T.nav.links[id] }))
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(false)
  const last = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const d = y - last.current
    setCompact(y > 40)
    if (y > 200 && d > 4) setHidden(true)
    else if (d < -4 || y < 200) setHidden(false)
    last.current = y
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (scrollStore.lenis) open ? scrollStore.lenis.stop() : scrollStore.lenis.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className={`nav ${compact ? 'nav--compact' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="nav__pill" aria-label={T.nav.aria}>
          <a href="#topo" className="nav__brand" onClick={go('topo')} aria-label={T.nav.brand}>
            <Scallop size={22} stroke={1.4} />
            <span>Duda</span>
          </a>
          <ul className="nav__links" onMouseLeave={() => setHover(null)}>
            {LINKS.map((l, i) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                  {l.label}
                  {hover === i && <motion.span layoutId="nav-underline" className="nav__underline" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__actions">
            <Prefs className="prefs--nav" />
            <CTA size="sm" className="nav__cta" magnet={6} />
            <CTA size="sm" className="nav__cta-mobile" compact magnet={0} aria-label={T.ctaAria} />
            <button className={`nav__burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? T.nav.close : T.nav.open}>
              <span /><span />
            </button>
          </div>
          <motion.span className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="menu"
            data-dark
            initial={{ clipPath: 'circle(0% at 90% 40px)' }}
            animate={{ clipPath: 'circle(150% at 90% 40px)' }}
            exit={{ clipPath: 'circle(0% at 90% 40px)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="menu__sun" aria-hidden="true"><Scallop size={260} stroke={0.6} className="menu__shell" /></span>
            <ul>
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE }}>
                  <a href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <Prefs className="prefs--menu" />
              <CTA variant="light" full magnet={0} />
              <p className="menu__note">Niterói · CRECI 104.409</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
