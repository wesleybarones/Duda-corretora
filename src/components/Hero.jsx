import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { CTA, RevealTitle, Phone, MediaSlot, Nautilus, Scallop, PlayIcon, HeartIcon, ContractIcon, PapersIcon, UserCheckIcon, EASE, useFinePointer, useMobile } from './ui'
import { HERO_VIDEO, VITRINE } from '../config'
import { scrollToId } from '../scroll'
import { useT } from '../i18n'

/* blob orgânico: mesma estrutura de comandos para permitir morphing */
function blob(radii, cx = 250, cy = 250) {
  const n = radii.length
  const pts = radii.map((r, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + ' Z'
}
const BLOBS = [
  blob([220, 200, 232, 196, 214, 236, 198, 226]),
  blob([206, 234, 204, 228, 196, 214, 236, 204]),
  blob([232, 210, 218, 238, 204, 200, 222, 236]),
]

const TRUST_ICONS = [ContractIcon, PapersIcon, UserCheckIcon]

export default function Hero() {
  const T = useT()
  const H = T.hero
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const mobile = useMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : mobile ? 60 : 220])
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 50, damping: 18 })
  const smy = useSpring(my, { stiffness: 50, damping: 18 })
  const depth = (k) => ({
    x: useTransform(smx, (v) => v * k),
    y: useTransform(smy, (v) => v * k),
  })
  const d1 = depth(10), d2 = depth(22), d3 = depth(34), d4 = depth(-14)

  useEffect(() => {
    if (!fine || reduce) return
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [fine, reduce])

  const up = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section id="topo" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__grid container">
        <div className="hero__text">
          <motion.p className="eyebrow" {...up(0.15)}>{H.eyebrow}</motion.p>
          <RevealTitle as="h1" key={H.title} text={H.title} id="hero-title" className="h1" stagger={0.06} delay={0.3} emphasisLast immediate />
          <p className="hero__sub lead hero-rise" style={{ '--d': '.5s' }} id="hero-title-sub">
            {H.sub}
          </p>
          <div className="hero__ctas hero-rise" style={{ '--d': '.6s' }}>
            <CTA size="lg" className="hero__cta" />
            <a href="#vitrine" className="link-u hero__secondary" onClick={(e) => { e.preventDefault(); scrollToId('vitrine') }}>
              {H.secondary} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <ul className="hero__trust hero-rise" style={{ '--d': '.7s' }} aria-label={H.trustAria}>
            {H.trust.map((text, i) => {
              const I = TRUST_ICONS[i]
              return <li key={i}><I /> <span>{text}</span></li>
            })}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="false">
          <motion.div className="hero__blob" style={{ scale: blobScale, ...d1 }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: EASE }}>
            <svg viewBox="0 0 500 500" aria-hidden="true">
              <defs>
                <radialGradient id="mare" cx="70%" cy="22%" r="85%">
                  <stop offset="0" stopColor="#C97B5E" stopOpacity="0.55" />
                  <stop offset="0.28" stopColor="#1F5A63" />
                  <stop offset="1" stopColor="#0E3B43" />
                </radialGradient>
              </defs>
              <motion.path fill="url(#mare)" d={BLOBS[0]} initial={{ d: BLOBS[0] }}
                animate={reduce ? {} : { d: [BLOBS[0], BLOBS[1], BLOBS[2], BLOBS[0]] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
            </svg>
          </motion.div>

          <motion.div className="hero__nautilus" style={d4}>
            <Nautilus size={150} stroke={0.9} className="spin-slow" />
          </motion.div>

          <motion.div className="hero__phones" style={{ y: phoneY }}>
            <motion.div className="hero__phone-back-wrap" style={d2}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 16, delay: 0.95 }}>
              <Phone className="hero__phone-back">
                <MediaSlot item={{ ...VITRINE[1], label: VITRINE[1].bairro }} playing={false} showLabel={false} />
              </Phone>
            </motion.div>
            <motion.div className="hero__phone-main-wrap" style={d1}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 160 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 55, damping: 15, delay: 0.85 }}>
              <Phone className="hero__phone-main">
                <MediaSlot item={HERO_VIDEO} eager />
                <div className="hearts" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ '--i': i }}><HeartIcon /></span>)}
                </div>
              </Phone>
            </motion.div>
          </motion.div>

          <motion.div className="float-card float-card--a" style={d3}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8, ease: EASE }}>
            <div className="float-inner" style={{ '--phase': '0s' }}>
              <span className="pulse-dot" aria-hidden="true" />
              <span><strong>{H.cardVisit}</strong><small>Icaraí</small></span>
            </div>
          </motion.div>
          <motion.div className="float-card float-card--b" style={d2}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.8, ease: EASE }}>
            <div className="float-inner" style={{ '--phase': '-2.5s' }}>
              <span className="float-play" aria-hidden="true"><PlayIcon width="14" height="14" /></span>
              <span><strong>{H.cardVideo}</strong><small>Icaraí</small></span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button className="hero__scroll" onClick={() => scrollToId('problema')} aria-label={H.scroll}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <Scallop size={26} stroke={1.3} />
      </motion.button>
    </section>
  )
}
