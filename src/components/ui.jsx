import { useEffect, useRef, useState, Fragment, startTransition } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, useInView } from 'framer-motion'
import { WHATSAPP_URL, WHATSAPP_URL_EN } from '../config'
import { useT } from '../i18n'
import { usePrefs } from '../prefs'

export const EASE = [0.22, 1, 0.36, 1]

/* ---------------- hooks ---------------- */
// Começa sempre com `initial` (igual ao HTML pré-renderizado) e ajusta logo após montar.
export function useMedia(query, initial = false) {
  const [match, setMatch] = useState(initial)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => startTransition(() => setMatch(m.matches))
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')
export const useDesktop = () => useMedia('(min-width: 1280px)')
export const useMobile = () => useMedia('(max-width: 767px)')

/* ---------------- icons (line-art 1.5px) ---------------- */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
)
export const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}><path fill="currentColor" d="M8 5.5v13a.6.6 0 0 0 .9.5l10.3-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z" /></svg>
)
export const SoundOnIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S} {...p}><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>
)
export const SoundOffIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S} {...p}><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></svg>
)
export const SunIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" /></svg>
)
export const MoonIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...S} {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
)
export const HeartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}><path fill="currentColor" d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.6 0 5.7 3.5 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" /></svg>
)
export const ContractIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...S} {...p}><path d="M7 3.5h7l4 4v13H7z" /><path d="M14 3.5v4h4M9.5 12h6M9.5 15h4" /><path d="M4 4l16 16" /></svg>
)
export const PapersIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...S} {...p}><path d="M8 3.5h8l3 3v11H8z" /><path d="M5 7v13.5h11" /><path d="M11 10h5M11 13h5" /></svg>
)
export const UserCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...S} {...p}><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c.8-3.6 3.3-5.5 6.5-5.5 1.4 0 2.7.4 3.7 1.1" /><path d="M15.5 18l2 2 4-4.5" /></svg>
)
export const EyeIcon = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...S} {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
)

/* Concha vieira (scallop) em line-art */
export function Scallop({ size = 40, stroke = 1.2, className, style }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path d="M50 86 C30 80 10 62 9 42 C8 24 26 12 50 12 C74 12 92 24 91 42 C90 62 70 80 50 86Z" />
      <path d="M50 86 L18 30 M50 86 L30 19 M50 86 L43 13.5 M50 86 L57 13.5 M50 86 L70 19 M50 86 L82 30 M50 86 L11 46 M50 86 L89 46" />
      <path d="M40 86 L36 93 L64 93 L60 86" />
      <path d="M36 93 L30 96 M64 93 L70 96" />
    </svg>
  )
}

/* Concha náutilo em line-art (espiral + câmaras) */
export function Nautilus({ size = 120, stroke = 1.2, className, style }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={style} aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round">
      <path d={spiralPath(100, 104, 92, 3.1, 260, true)} />
      {nautilusChambers(100, 104, 92, 3.1).map((d, i) => <path key={i} d={d} opacity="0.8" />)}
    </svg>
  )
}

/* espiral logarítmica (fora → dentro) */
export function spiralPoints(cx, cy, rMax, turns, n = 260) {
  const pts = []
  const b = Math.log(rMax / 3) / (turns * 2 * Math.PI)
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const th = t * turns * 2 * Math.PI
    const r = rMax * Math.exp(-b * th)
    const a = th - Math.PI / 2
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts
}
export function spiralPath(cx, cy, rMax, turns, n = 260) {
  const pts = spiralPoints(cx, cy, rMax, turns, n)
  return 'M' + pts.map((p) => p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' L')
}
function nautilusChambers(cx, cy, rMax, turns) {
  const pts = spiralPoints(cx, cy, rMax, turns, 260)
  const out = []
  const perTurn = 260 / turns
  for (let i = 8; i < 260 - perTurn; i += 13) {
    const p = pts[i]
    const q = pts[Math.min(259, Math.round(i + perTurn))]
    const mx = (p[0] + q[0]) / 2 + (cx - (p[0] + q[0]) / 2) * 0.12
    const my = (p[1] + q[1]) / 2 + (cy - (p[1] + q[1]) / 2) * 0.12
    out.push(`M${p[0].toFixed(1)} ${p[1].toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`)
  }
  return out
}

/* ---------------- Botão CTA magnético ---------------- */
export function CTA({ variant = 'dark', size = 'md', label, className = '', magnet = 8, full = false, compact = false, ...rest }) {
  const ref = useRef(null)
  const T = useT()
  const { lang } = usePrefs()
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const [ripples, setRipples] = useState([])
  const active = fine && !reduce

  const onMove = (e) => {
    if (!active) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set((dx / (r.width / 2)) * magnet)
    y.set((dy / (r.height / 2)) * magnet * 0.6)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const onClick = (e) => {
    const r = ref.current.getBoundingClientRect()
    const id = Date.now()
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setRipples((rs) => rs.filter((q) => q.id !== id)), 800)
  }

  return (
    <motion.a
      ref={ref}
      href={lang === 'en' ? WHATSAPP_URL_EN : WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta cta--${variant} cta--${size} ${full ? 'cta--full' : ''} ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      data-cursor="hide"
      {...rest}
    >
      <span className="cta__border" aria-hidden="true" />
      <span className="cta__inner">
        <WhatsAppIcon className="cta__wa" />
        <span className="cta__label">{compact ? T.ctaShort : label || T.cta}</span>
        {!compact && <ArrowIcon className="cta__arrow" />}
      </span>
      {ripples.map((r) => (
        <span key={r.id} className="cta__ripple" style={{ left: r.x, top: r.y }} aria-hidden="true" />
      ))}
    </motion.a>
  )
}

/* ---------------- Traço coral desenhado à mão ---------------- */
export function Squiggle({ delay = 0, inView = true }) {
  return (
    <svg className="squiggle" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M3 10 C 30 4, 52 13, 80 8 S 130 3, 158 9 S 190 11, 197 6"
        fill="none" stroke="#C97B5E" strokeWidth="2.6" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </svg>
  )
}

/* ---------------- Título com revelação por palavra ----------------
   Use *palavra* para ênfase em Fraunces itálico com traço coral.     */
export function RevealTitle({ as: Tag = 'h2', text, className = '', stagger = 0.06, delay = 0, emphasisLast = false, underline = true, once = true, immediate = false, id }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once, amount: 0.3 })
  const inView = immediate || seen
  const reduce = useReducedMotion()
  const tokens = []
  text.split(/(\*[^*]+\*)/).forEach((chunk) => {
    if (!chunk) return
    const em = chunk.startsWith('*')
    const clean = em ? chunk.slice(1, -1) : chunk
    clean.split(/(\s+)/).forEach((w) => {
      if (!w) return
      if (/^\s+$/.test(w)) tokens.push({ space: true })
      else tokens.push({ w, em })
    })
  })
  const words = tokens.filter((t) => !t.space)
  const total = words.length
  let wi = 0
  const lastEmIndex = (() => { let k = -1; let c = 0; tokens.forEach((t) => { if (!t.space) { if (t.em) k = c; c++ } }); return k })()

  return (
    <Tag ref={ref} id={id} className={`reveal-title ${className}`} aria-label={text.replace(/\*/g, '')}>
      {tokens.map((t, i) => {
        if (t.space) return <Fragment key={i}> </Fragment>
        const idx = wi++
        let order = idx
        if (emphasisLast && t.em) order = total + 1
        const d = delay + order * stagger
        const isLastEm = idx === lastEmIndex
        return (
          <span key={i} className={`rw ${t.em ? 'rw--em' : ''}`}>
            <motion.span
              className="rw__in"
              initial={reduce ? { opacity: 0 } : { y: '110%' }}
              animate={inView ? (reduce ? { opacity: 1 } : { y: '0%' }) : {}}
              transition={{ duration: 0.9, delay: d, ease: EASE }}
            >
              {t.em ? <em>{t.w}</em> : t.w}
            </motion.span>
            {t.em && underline && isLastEm && <Squiggle inView={inView} delay={d + 0.55} />}
          </span>
        )
      })}
    </Tag>
  )
}

/* ---------------- Reveal (fade-up + blur) ---------------- */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', amount = 0.15, ...rest }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  )
}

/* ---------------- Mídia (vídeo ou placeholder) ---------------- */
export function MediaSlot({ item = {}, playing = true, eager = false, showLabel = true, sound = false }) {
  const vref = useRef(null)
  const wrap = useRef(null)
  const visible = useInView(wrap, { amount: 0.2 })
  // capas e vídeos só carregam perto da tela (exceto o hero)
  const near = useInView(wrap, { once: true, margin: '600px 0px' })
  const mobile = useMobile()
  // vídeos "eager" (hero) só recebem o arquivo depois do carregamento da página
  const [late, setLate] = useState(!eager)
  useEffect(() => {
    if (!eager) return
    const go = () => ('requestIdleCallback' in window ? requestIdleCallback(() => setLate(true), { timeout: 2500 }) : setTimeout(() => setLate(true), 800))
    if (document.readyState === 'complete') go()
    else { window.addEventListener('load', go, { once: true }); return () => window.removeEventListener('load', go) }
  }, [eager])
  const fileSrc = mobile && item.srcMobile ? item.srcMobile : item.src
  const src = late && (eager || near) ? fileSrc : ''
  const poster = eager || near ? item.poster || undefined : undefined

  useEffect(() => {
    const v = vref.current
    if (!v) return
    v.muted = !sound
    if (playing && visible) {
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    } else v.pause()
  }, [playing, visible, src, sound])

  return (
    <div ref={wrap} className="media">
      {fileSrc ? (
        <video
          ref={vref}
          className="media__video"
          src={src || undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={item.label || item.bairro}
        />
      ) : item.poster ? (
        <img className="media__video" src={poster} alt={item.label || item.bairro || ''} loading={eager ? 'eager' : 'lazy'} />
      ) : (
        <div className="media__ph" role="img" aria-label={`Espaço para vídeo: ${item.label || item.bairro || ''}`}>
          <Scallop size={64} stroke={1} className="media__ph-shell" />
          <span className="media__ph-play"><PlayIcon /></span>
          {showLabel && <span className="media__ph-label">{item.label || item.bairro}</span>}
        </div>
      )}
    </div>
  )
}

/* ---------------- Mockup de celular ---------------- */
export function Phone({ children, className = '', style }) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone__screen">
        <span className="phone__island" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}

/* ---------------- Eyebrow ---------------- */
export const Eyebrow = ({ children, light }) => (
  <Reveal as="p" className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{children}</Reveal>
)

/* ---------------- Divisor de maré ---------------- */
export function TideDivider({ from = 'var(--concha)', to = 'var(--areia)', flip = false }) {
  return (
    <div className={`tide ${flip ? 'tide--flip' : ''}`} style={{ background: to }} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path style={{ fill: from }} d="M0 0 H1440 V38 C1260 72 1110 18 930 40 C760 61 610 70 450 46 C300 24 160 30 0 54 Z" />
      </svg>
    </div>
  )
}
