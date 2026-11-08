import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, useReducedMotion, animate } from 'framer-motion'
import { RevealTitle, Reveal, Eyebrow, CTA, Phone, MediaSlot, Scallop, Nautilus, PlayIcon, WhatsAppIcon, ArrowIcon, EASE, useFinePointer, useMobile } from './ui'
import { ABOUT, TESTIMONIALS, TESTIMONIAL_VIDEO, FAQ, WHATSAPP_URL, INSTAGRAM_URL, SITE_URL } from '../config'
import { WaveRecede } from './Story'

/* ======================= SOBRE ======================= */
function Stat({ s }) {
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
      <span className="stat__l">{s.label}</span>
    </li>
  )
}

function Signature() {
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
    <svg ref={ref} className="signature" viewBox="0 0 240 76" aria-label="Assinatura Duda" role="img">
      {paths.map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.45, duration: 0.6, ease: 'easeInOut' }} />
      ))}
    </svg>
  )
}

export function About() {
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
          <div className="about__photo">
            {ABOUT.photo ? <img src={ABOUT.photo} alt="Duda, corretora de imóveis em Niterói" loading="lazy" /> : (
              <div className="about__ph"><Scallop size={90} stroke={0.9} /><span>Foto da Duda</span></div>
            )}
          </div>
          <span className="about__seal">CRECI 104.409</span>
        </motion.div>
        <div className="about__text">
          <Eyebrow>Prazer, Duda</Eyebrow>
          <RevealTitle id="about-title" text="Uma corretora que *conhece cada rua* de Niterói." className="h2" />
          <Reveal as="p" className="lead">{ABOUT.bio}</Reveal>
          <ul className="stats">{ABOUT.stats.map((s, i) => <Stat key={i} s={s} />)}</ul>
          <Signature />
        </div>
      </div>
    </section>
  )
}

/* ======================= DEPOIMENTOS ======================= */
function Note({ t }) {
  return (
    <article className="note">
      <div className="note__q" aria-hidden="true"><Scallop size={30} stroke={1.3} /><span>“</span></div>
      <p className="note__text">{t.text}</p>
      <footer>
        <strong>{t.name}</strong>
        <span>{t.bairro}</span>
        <span className="note__pill">vendido em {t.dias} dias</span>
      </footer>
    </article>
  )
}

export function Testimonials() {
  const items = [...TESTIMONIALS.map((t) => ({ kind: 'note', t })), ...(TESTIMONIAL_VIDEO ? [{ kind: 'video' }] : [])]
  const [active, setActive] = useState(0)
  const mobile = useMobile()
  const step = mobile ? 300 : 440
  const go = (d) => setActive((a) => Math.max(0, Math.min(items.length - 1, a + d)))

  return (
    <section className="section testi" aria-labelledby="testi-title">
      <div className="container testi__head">
        <div>
          <Eyebrow>Quem vendeu comigo</Eyebrow>
          <RevealTitle id="testi-title" text="Proprietários que *confiaram*." className="h2" />
        </div>
        <div className="testi__arrows">
          <MagArrow dir={-1} onClick={() => go(-1)} disabled={active === 0} />
          <MagArrow dir={1} onClick={() => go(1)} disabled={active === items.length - 1} />
        </div>
      </div>
      <motion.div className="testi__stage" data-cursor="Arrastar"
        onPanEnd={(e, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1) }}
        role="region" aria-roledescription="carrossel" aria-label="Depoimentos" tabIndex={0}
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
                  <p className="micro">Vídeo-depoimento (opcional)</p>
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
  const ref = useRef(null)
  const fine = useFinePointer()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.button ref={ref} className="mag-arrow" style={{ x: sx, y: sy }} onClick={onClick} disabled={disabled}
      aria-label={dir < 0 ? 'Depoimento anterior' : 'Próximo depoimento'}
      onMouseMove={(e) => { if (!fine) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35) }}
      onMouseLeave={() => { x.set(0); y.set(0) }} whileTap={{ scale: 0.94 }} data-cursor="hide">
      <ArrowIcon style={{ transform: dir < 0 ? 'rotate(180deg)' : 'none' }} />
    </motion.button>
  )
}

/* ======================= FAQ ======================= */
export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="duvidas" className="section faq grain" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__aside">
          <RevealTitle id="faq-title" text="Dúvidas de quem vai *vender*." className="h2" />
          <Reveal className="faq__card">
            <Scallop size={34} stroke={1.2} />
            <p>Ainda com dúvida? <br />Me chama no WhatsApp.</p>
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
                    <span>{f.q}</span>
                    <span className="qa__icon" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`qa-${i}`} role="region" aria-labelledby={`qa-b-${i}`} className="qa__a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 170, damping: 26 }}>
                      <p>{f.a}</p>
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
      <WaveRecede color="#EFE6D8" />
      <div className="final__shells" aria-hidden="true">
        {shells.map(({ C, s, top, left, L }, i) => (
          <motion.div key={i} style={{ position: 'absolute', top, left, ...L }}><C size={s} stroke={0.8} /></motion.div>
        ))}
      </div>
      <div className="final__content">
        <RevealTitle id="final-title" text="Vamos colocar seu imóvel *na vitrine*?" className="h2 final__title" stagger={0.07} />
        <Reveal as="p" className="final__sub" delay={0.4}>Me chama no WhatsApp, marcamos uma visita e eu cuido do resto.</Reveal>
        <motion.div className="final__btn" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }}>
          <CTA variant="light" size="xl" magnet={14} className="cta--glow" />
        </motion.div>
        <Reveal as="p" className="micro final__micro" delay={0.7}>Atendimento de segunda a sexta, das 9h às 18h</Reveal>
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
  return (
    <footer className="footer" data-dark>
      <div className="container footer__grid">
        <div>
          <p className="footer__brand"><Scallop size={24} stroke={1.3} /> Duda</p>
          <p className="footer__tag">Seu imóvel merece ser visto, não só anunciado.</p>
        </div>
        <div>
          <h2 className="footer__h">Contato</h2>
          <a className="link-u" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp (21) 99515-4231</a>
          <address>Rua Murilo Portugal, 112 – São Francisco, Niterói/RJ</address>
        </div>
        <div>
          <h2 className="footer__h">Horário</h2>
          <p>Seg. a sex., 9h às 18h</p>
        </div>
        <div>
          <h2 className="footer__h">Redes</h2>
          <a className="link-u" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram @duda_corretoradeimoveis</a>
          <a className="link-u" href={SITE_URL} target="_blank" rel="noopener noreferrer">Ver imóveis à venda</a>
        </div>
        <div>
          <h2 className="footer__h">Registro</h2>
          <p>CRECI 104.409</p>
        </div>
      </div>
      <p className="footer__copy container">© {new Date().getFullYear()} Duda Corretora de Imóveis · Niterói/RJ</p>
      <p className="footer__giant" aria-hidden="true">Duda</p>
    </footer>
  )
}

/* ======================= Flutuantes ======================= */
export function FloatingWA({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fab" aria-label="Marque sua visita pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }} data-cursor="hide">
          <span className="fab__ring" aria-hidden="true" />
          <WhatsAppIcon width="26" height="26" />
          <span className="fab__tip" role="tooltip">Marque sua visita</span>
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
