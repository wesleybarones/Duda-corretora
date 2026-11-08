import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, useReducedMotion, animate } from 'framer-motion'
import { RevealTitle, Reveal, Eyebrow, CTA, Phone, MediaSlot, Scallop, Nautilus, PlayIcon, WhatsAppIcon, ArrowIcon, EASE, useFinePointer, useMobile } from './ui'
import { ABOUT, TESTIMONIALS, TESTIMONIAL_VIDEO, FAQ, WHATSAPP_URL, INSTAGRAM_URL, SITE_URL, PERFIL } from '../config'
import { WaveRecede } from './Story'
import { useT, tx } from '../i18n'
import { usePrefs } from '../prefs'
import { scrollStore } from '../scroll'
import { WHATSAPP_URL_EN } from '../config'

/* ======================= SOBRE ======================= */
function Stat({ s }) {
  const { lang } = usePrefs()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView || typeof s.value !== 'number') return
    const c = animate(0, s.value, { duration: 1.6, ease: EASE, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView])
  return (
    <li ref={ref} className="stat">
      <span className="stat__n">{typeof s.value === 'number' ? v : '[00]'}{s.suffix}</span>
      <span className="stat__l">{tx(s, 'label', lang)}</span>
    </li>
  )
}

function Signature() {
  const T = useT()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const paths = [
    // D
    'M14 62 C 16 46, 18 30, 20 16 M8 20 C 30 6, 62 14, 60 38 C 58 58, 34 66, 12 62',
    // u
    'M70 40 C 66 52, 68 62, 76 60 C 84 58, 86 46, 88 38 C 86 50, 86 60, 94 60',
    // d
    'M118 44 C 108 38, 98 50, 102 58 C 106 64, 116 58, 120 48 M126 12 C 122 30, 118 48, 120 60 C 122 64, 128 62, 132 58',
    // a + rabisco final
    'M156 44 C 146 38, 136 50, 140 58 C 144 64, 154 58, 158 46 C 156 54, 158 62, 166 60 C 182 56, 200 50, 226 44',
  ]
  return (
    <svg ref={ref} className="signature" viewBox="0 0 240 76" aria-label={T.about.signature} role="img">
      {paths.map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.45, duration: 0.6, ease: 'easeInOut' }} />
      ))}
    </svg>
  )
}

/* Vídeo da Duda: toca uma vez ao entrar na tela e para no último quadro */
function AboutVideo({ v }) {
  const T = useT()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mobile = useMobile()
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const near = useInView(ref, { once: true, margin: '600px 0px' })
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    const arm = () => { setArmed(true); evs.forEach((e) => window.removeEventListener(e, arm)) }
    evs.forEach((e) => window.addEventListener(e, arm, { passive: true }))
    return () => evs.forEach((e) => window.removeEventListener(e, arm))
  }, [])
  useEffect(() => {
    const el = ref.current
    if (!el || reduce || !inView) return
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  }, [inView, reduce])
  const alt = T.about.videoAlt
  if (reduce) return <img ref={ref} src={v.final || v.poster} alt={alt} loading="lazy" />
  return (
    <video ref={ref} src={near ? (mobile && v.srcMobile ? v.srcMobile : v.src) : undefined} poster={near ? v.poster : undefined}
      muted playsInline preload="none" aria-label={alt} />
  )
}

export function About() {
  const T = useT()
  const { lang } = usePrefs()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60])
  return (
    <section id="sobre" ref={ref} className="section about grain" aria-labelledby="about-title">
      <div className="container about__grid">
        <motion.div className="about__photo-wrap" style={{ y: photoY }}>
          <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
            <clipPath id="scallop-top" clipPathUnits="objectBoundingBox">
              <path d="M0 0.2 C0 0.12 0.05 0.1 0.083 0.06 C0.12 0.02 0.16 0.02 0.2 0.05 C0.24 0.02 0.29 0 0.333 0.03 C0.38 0 0.45 -0.01 0.5 0.02 C0.55 -0.01 0.62 0 0.667 0.03 C0.71 0 0.76 0.02 0.8 0.05 C0.84 0.02 0.88 0.02 0.917 0.06 C0.95 0.1 1 0.12 1 0.2 L1 0.96 C1 0.985 0.985 1 0.96 1 L0.04 1 C0.015 1 0 0.985 0 0.96 Z" />
            </clipPath>
          </svg>
          <div className={`about__photo ${ABOUT.video ? 'about__photo--video' : ''}`}>
            {ABOUT.video ? <AboutVideo v={ABOUT.video} /> : ABOUT.photo ? <img src={ABOUT.photo} alt={T.about.photoAlt} loading="lazy" /> : (
              <div className="about__ph"><Scallop size={90} stroke={0.9} /><span>{T.about.photoPh}</span></div>
            )}
          </div>
          <span className="about__seal">CRECI 104.409</span>
        </motion.div>
        <div className="about__text">
          <Eyebrow>{T.about.eyebrow}</Eyebrow>
          <RevealTitle id="about-title" text={T.about.title} className="h2" />
          <Reveal as="p" className="lead">{tx(ABOUT, 'bio', lang)}</Reveal>
          <ul className="stats">{ABOUT.stats.map((s, i) => <Stat key={i} s={s} />)}</ul>
          <Signature />
        </div>
      </div>
    </section>
  )
}

/* ======================= DEPOIMENTOS ======================= */
function Note({ t }) {
  const T = useT()
  const { lang } = usePrefs()
  return (
    <article className="note">
      <div className="note__q" aria-hidden="true"><Scallop size={30} stroke={1.3} /><span>“</span></div>
      <p className="note__text">{tx(t, 'text', lang)}</p>
      <footer>
        <strong>{t.name}</strong>
        <span>{t.bairro}</span>
        <span className="note__pill">{T.testi.sold(t.dias)}</span>
      </footer>
    </article>
  )
}

export function Testimonials() {
  const T = useT()
  const items = [...TESTIMONIALS.map((t) => ({ kind: 'note', t })), ...(TESTIMONIAL_VIDEO ? [{ kind: 'video' }] : [])]
  const [active, setActive] = useState(0)
  const mobile = useMobile()
  const step = mobile ? 300 : 440
  const go = (d) => setActive((a) => Math.max(0, Math.min(items.length - 1, a + d)))

  return (
    <section className="section testi" aria-labelledby="testi-title">
      <div className="container testi__head">
        <div>
          <Eyebrow>{T.testi.eyebrow}</Eyebrow>
          <RevealTitle id="testi-title" text={T.testi.title} className="h2" />
        </div>
        <div className="testi__arrows">
          <MagArrow dir={-1} onClick={() => go(-1)} disabled={active === 0} />
          <MagArrow dir={1} onClick={() => go(1)} disabled={active === items.length - 1} />
        </div>
      </div>
      <motion.div className="testi__stage" data-cursor={T.cursorDrag}
        onPanEnd={(e, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1) }}
        role="region" aria-roledescription={T.testi.aria} aria-label={T.testi.aria} tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}>
        {items.map((it, i) => {
          const off = i - active
          return (
            <motion.div key={i} className="testi__item" aria-hidden={off !== 0}
              animate={{ x: off * step, scale: off === 0 ? 1 : 0.92, opacity: Math.abs(off) > 1 ? 0 : off === 0 ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
              onClick={() => off !== 0 && setActive(i)}>
              {it.kind === 'note' ? <Note t={it.t} /> : (
                <div className="testi__video">
                  <Phone><MediaSlot item={TESTIMONIAL_VIDEO} playing={off === 0} /></Phone>
                  <p className="micro">{T.testi.video}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
      <div className="testi__dots" aria-hidden="true">{items.map((_, i) => <span key={i} className={i === active ? 'on' : ''} />)}</div>
    </section>
  )
}

function MagArrow({ dir, onClick, disabled }) {
  const T = useT()
  const ref = useRef(null)
  const fine = useFinePointer()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.button ref={ref} className="mag-arrow" style={{ x: sx, y: sy }} onClick={onClick} disabled={disabled}
      aria-label={dir < 0 ? T.testi.prev : T.testi.next}
      onMouseMove={(e) => { if (!fine) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35) }}
      onMouseLeave={() => { x.set(0); y.set(0) }} whileTap={{ scale: 0.94 }} data-cursor="hide">
      <ArrowIcon style={{ transform: dir < 0 ? 'rotate(180deg)' : 'none' }} />
    </motion.button>
  )
}

/* ======================= FAQ ======================= */
export function Faq() {
  const T = useT()
  const { lang } = usePrefs()
  const [open, setOpen] = useState(0)
  return (
    <section id="duvidas" className="section faq grain" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__aside">
          <RevealTitle id="faq-title" text={T.faq.title} className="h2" />
          <Reveal className="faq__card">
            <img className="faq__av" src={PERFIL.foto} alt="Duda" width="56" height="56" loading="lazy" />
            <p>{T.faq.card1} <br />{T.faq.card2}</p>
            <CTA size="sm" />
          </Reveal>
        </div>
        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={i} delay={i * 0.04} className={`qa ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`qa-${i}`} id={`qa-b-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{tx(f, 'q', lang)}</span>
                    <span className="qa__icon" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`qa-${i}`} role="region" aria-labelledby={`qa-b-${i}`} className="qa__a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 170, damping: 26 }}>
                      <p>{tx(f, 'a', lang)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ======================= CTA FINAL ======================= */
export function FinalCTA() {
  const T = useT()
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 16 }), smy = useSpring(my, { stiffness: 40, damping: 16 })
  const l = (k) => ({ x: useTransform(smx, (v) => v * k), y: useTransform(smy, (v) => v * k) })
  const L1 = l(14), L2 = l(-24), L3 = l(34)
  const shells = [
    { C: Scallop, s: 120, top: '14%', left: '8%', L: L1 }, { C: Nautilus, s: 180, top: '18%', left: '78%', L: L2 },
    { C: Scallop, s: 70, top: '62%', left: '16%', L: L3 }, { C: Nautilus, s: 110, top: '58%', left: '86%', L: L1 },
    { C: Scallop, s: 54, top: '8%', left: '52%', L: L2 },
  ]
  return (
    <section id="cta-final" className="final" data-dark aria-labelledby="final-title"
      onMouseMove={(e) => { if (!fine || reduce) return; mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5) }}>
      <WaveRecede color="var(--areia)" />
      <div className="final__shells" aria-hidden="true">
        {shells.map(({ C, s, top, left, L }, i) => (
          <motion.div key={i} style={{ position: 'absolute', top, left, ...L }}><C size={s} stroke={0.8} /></motion.div>
        ))}
      </div>
      <div className="final__content">
        <RevealTitle id="final-title" text={T.final.title} className="h2 final__title" stagger={0.07} />
        <Reveal as="p" className="final__sub" delay={0.4}>{T.final.sub}</Reveal>
        <motion.div className="final__btn" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }}>
          <CTA variant="light" size="xl" magnet={14} className="cta--glow" />
        </motion.div>
        <Reveal as="p" className="micro final__micro" delay={0.7}>{T.final.micro}</Reveal>
      </div>
      <div className="waves" aria-hidden="true">
        {[0, 1, 2].map((k) => (
          <svg key={k} className={`wave wave--${k}`} viewBox="0 0 2880 160" preserveAspectRatio="none">
            <path d="M0 80 C 240 30, 480 130, 720 80 S 1200 30, 1440 80 S 1920 130, 2160 80 S 2640 30, 2880 80 V160 H0 Z" />
          </svg>
        ))}
      </div>
    </section>
  )
}

/* ======================= RODAPÉ ======================= */
export function Footer() {
  const T = useT()
  const F = T.footer
  const { lang } = usePrefs()
  return (
    <footer className="footer" data-dark>
      <div className="container footer__grid">
        <div>
          <p className="footer__brand"><Scallop size={24} stroke={1.3} /> Duda</p>
          <p className="footer__tag">{F.tag}</p>
        </div>
        <div>
          <h2 className="footer__h">{F.contact}</h2>
          <a className="link-u" href={lang === 'en' ? WHATSAPP_URL_EN : WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp (21) 99515-4231</a>
          <address>Rua Murilo Portugal, 112 – São Francisco, Niterói/RJ</address>
          <FooterMap />
        </div>
        <div>
          <h2 className="footer__h">{F.hours}</h2>
          <p>{F.hoursText}</p>
        </div>
        <div>
          <h2 className="footer__h">{F.social}</h2>
          <a className="link-u" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram @duda_corretoradeimoveis</a>
          <a className="link-u" href={SITE_URL} target="_blank" rel="noopener noreferrer">{F.site}</a>
        </div>
        <div>
          <h2 className="footer__h">{F.license}</h2>
          <p>CRECI 104.409</p>
        </div>
      </div>
      <div className="footer__bottom container">
        <p className="footer__copy">© {new Date().getFullYear()} {F.copy}</p>
        <a href="#topo" className="footer__top" onClick={toTop}>
          <span>{F.top}</span>
          <span className="footer__top-ic" aria-hidden="true"><ArrowIcon size={16} /></span>
        </a>
      </div>
      <GiantName />
    </footer>
  )
}

/* Mapa discreto do escritório: carrega só perto do rodapé; o cartão inteiro abre o Google Maps */
// Ponto exato do escritório no Google Maps (R. Murilo Portugal, 112 – Niterói, CEP 24360-410)
const MAP_LL = '-22.9240553,-43.0932589'
const MAP_PLACE = 'https://www.google.com/maps/place/R.+Murilo+Portugal,+112+-+Charitas,+Niter%C3%B3i+-+RJ,+24360-410/@-22.9240705,-43.0958046,17z/data=!3m1!4b1!4m6!3m5!1s0x9986adea3827ed:0x919711a416e90b67!8m2!3d-22.9240553!4d-43.0932589!16s%2Fg%2F11b8tdz_l2'
function FooterMap() {
  const F = useT().footer
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '600px 0px' })
  return (
    <a ref={ref} className="footer__map" href={MAP_PLACE} target="_blank" rel="noopener noreferrer" aria-label={F.mapAria}>
      {near && armed && <iframe title={F.mapAria} src={`https://www.google.com/maps?q=${MAP_LL}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} aria-hidden="true" />}
      <span className="footer__map-tag">{F.map} <ArrowIcon width="14" height="14" /></span>
    </a>
  )
}

const toTop = (e) => {
  e.preventDefault()
  if (scrollStore.lenis) scrollStore.lenis.scrollTo(0, { duration: 2.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* "Duda" gigante do rodapé: acende onde o cursor (ou o dedo) passa */
function GiantName() {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const on = (e) => { move(e); ref.current?.classList.add('is-lit') }
  const off = () => ref.current?.classList.remove('is-lit')
  return <p ref={ref} className="footer__giant" aria-hidden="true" data-t="Duda" onPointerEnter={on} onPointerMove={move} onPointerLeave={off} onPointerUp={(e) => { if (e.pointerType !== 'mouse') setTimeout(off, 900) }} />
}

/* ======================= Flutuantes ======================= */
export function FloatingWA({ visible }) {
  const T = useT()
  const { lang } = usePrefs()
  return (
    <AnimatePresence>
      {visible && (
        <motion.a href={lang === 'en' ? WHATSAPP_URL_EN : WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fab" aria-label={T.ctaAria}
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }} data-cursor="hide">
          <span className="fab__ring" aria-hidden="true" />
          <WhatsAppIcon width="26" height="26" />
          <span className="fab__tip" role="tooltip">{T.cta}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export function MobileBar({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="mbar" initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }} transition={{ duration: 0.5, ease: EASE }}>
          <CTA full magnet={0} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ======================= Cursor ======================= */
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 }), sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const [label, setLabel] = useState('')
  const [dark, setDark] = useState(false)
  const [hide, setHide] = useState(false)
  const [link, setLink] = useState(false)
  useEffect(() => {
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      const t = e.target instanceof Element ? e.target : null
      const c = t?.closest('[data-cursor]')
      const v = c?.getAttribute('data-cursor') || ''
      setHide(v === 'hide')
      setLabel(v && v !== 'hide' ? v : '')
      setDark(!!t?.closest('[data-dark]'))
      setLink(!!t?.closest('a, button, [role="button"], summary'))
    }
    const out = () => { x.set(-100); y.set(-100) }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', out)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', out); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return (
    <motion.div className={`cursor ${label ? 'has-label' : ''} ${dark ? 'on-dark' : ''} ${hide ? 'is-hidden' : ''} ${link && !label ? 'on-link' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span>{label}</span>
    </motion.div>
  )
}
