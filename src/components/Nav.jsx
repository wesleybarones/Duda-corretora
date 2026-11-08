import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion'
import { CTA, Scallop, EASE } from './ui'
import { scrollToId, scrollStore } from '../scroll'

const LINKS = [
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'vitrine', label: 'Vitrine' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'duvidas', label: 'Dúvidas' },
]

export default function Nav() {
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
        <nav className="nav__pill" aria-label="Principal">
          <a href="#topo" className="nav__brand" onClick={go('topo')} aria-label="Duda, voltar ao topo">
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
            <CTA size="sm" className="nav__cta" magnet={6} />
            <CTA size="sm" className="nav__cta-mobile" compact magnet={0} aria-label="Marque sua visita pelo WhatsApp" />
            <button className={`nav__burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
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
            <Scallop size={260} stroke={0.6} className="menu__shell" />
            <ul>
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE }}>
                  <a href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <CTA variant="light" full magnet={0} />
              <p className="menu__note">Niterói · CRECI 104.409</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
