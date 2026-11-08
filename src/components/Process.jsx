import { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useInView, useReducedMotion } from 'framer-motion'
import { RevealTitle, Reveal, Eyebrow, CTA, Phone, MediaSlot, EyeIcon, EASE, useDesktop } from './ui'
import { BENTO_VIDEO } from '../config'

/* ======================= COMO FUNCIONA ======================= */
const STEPS = [
  { t: 'Você me chama', d: 'Um oi no WhatsApp e já combinamos o melhor dia para eu conhecer seu imóvel.' },
  { t: 'Eu visito seu imóvel', d: 'Conheço cada detalhe, entendo sua expectativa e alinhamos um preço justo para o mercado do bairro.' },
  { t: 'Eu gravo e divulgo', d: 'Faço o vídeo pessoalmente e coloco seu imóvel na minha vitrine, no Instagram e no site.' },
  { t: 'Eu cuido do resto', d: 'Filtro os interessados, acompanho as visitas, conduzo a negociação e cuido da documentação até a assinatura.' },
]

const VB = { w: 1200, h: 720, cx: 600, cy: 360, rMax: 320, rMin: 34, turns: 1.9 }
function buildSpiral() {
  const { cx, cy, rMax, rMin, turns } = VB
  const n = 400
  const thMax = turns * Math.PI * 2
  const b = Math.log(rMax / rMin) / thMax
  const pts = []
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * thMax
    const r = rMax * Math.exp(-b * th)
    const a = th - Math.PI / 2
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), th })
  }
  const cum = [0]
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
  const L = cum[cum.length - 1]
  const d = 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')
  const anchors = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((th) => {
    const i = Math.round((th / thMax) * n)
    return { x: pts[i].x, y: pts[i].y, f: cum[i] / L }
  })
  return { d, anchors, end: pts[pts.length - 1] }
}

// posição dos cards (em unidades do viewBox) — quadrantes
const CARD_POS = [
  { x: 880, y: 120, side: 'r' },
  { x: 880, y: 470, side: 'r' },
  { x: 20, y: 470, side: 'l' },
  { x: 20, y: 120, side: 'l' },
]

function SpiralDesktop() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { d, anchors, end } = useMemo(buildSpiral, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const len = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [lit, setLit] = useState(reduce ? 4 : 0)
  useMotionValueEvent(len, 'change', (p) => setLit(anchors.filter((a) => p >= a.f - 0.005).length))
  const done = lit === 4

  return (
    <div ref={ref} className="spiral" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="spiral__svg" aria-hidden="true">
        <path d={d} className="spiral__ghost" />
        <motion.path d={d} className="spiral__line" style={{ pathLength: reduce ? 1 : len }} />
        {anchors.map((a, i) => {
          const c = CARD_POS[i]
          const tx = c.side === 'r' ? c.x - 14 : c.x + 314
          const ty = c.y + 40
          return (
            <g key={i} className={i < lit ? 'is-lit' : ''}>
              <line x1={a.x} y1={a.y} x2={tx} y2={ty} className="spiral__leader" />
              <circle cx={a.x} cy={a.y} r="17" className="spiral__dot" />
              <text x={a.x} y={a.y + 5} textAnchor="middle" className="spiral__num">{i + 1}</text>
            </g>
          )
        })}
        <circle cx={end.x} cy={end.y} r={done ? 7 : 3} className={`spiral__core ${done ? 'is-lit' : ''}`} />
      </svg>
      {STEPS.map((s, i) => {
        const c = CARD_POS[i]
        return (
          <div key={i} className={`spiral__step ${i < lit ? 'is-lit' : ''} spiral__step--${c.side}`}
            style={{ left: `${(c.x / VB.w) * 100}%`, top: `${(c.y / VB.h) * 100}%` }}>
            <span className="step__k">Passo {i + 1}</span>
            <h3 className="h3">{s.t}</h3>
            <p>{s.d}</p>
          </div>
        )
      })}
    </div>
  )
}

function TideStep({ s, i }) {
  const ref = useRef(null)
  const lit = useInView(ref, { once: true, amount: 0.8 })
  return (
    <li ref={ref} className={`tstep ${lit ? 'is-lit' : ''}`}>
      <span className="tstep__dot" aria-hidden="true">{i + 1}</span>
      <div>
        <h3 className="h3">{s.t}</h3>
        <p>{s.d}</p>
      </div>
    </li>
  )
}
function TideLine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 70%'] })
  const reduce = useReducedMotion()
  return (
    <div ref={ref} className="tide-steps">
      <svg className="tide-steps__line" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 0 C 34 60, 6 120, 20 180 S 34 300, 20 360 S 6 480, 20 540 S 34 660, 20 720 S 6 840, 20 900 S 30 960, 20 1000" className="spiral__ghost" vectorEffect="non-scaling-stroke" />
        <motion.path d="M20 0 C 34 60, 6 120, 20 180 S 34 300, 20 360 S 6 480, 20 540 S 34 660, 20 720 S 6 840, 20 900 S 30 960, 20 1000" className="spiral__line" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : scrollYProgress }} />
      </svg>
      <ol>{STEPS.map((s, i) => <TideStep key={i} s={s} i={i} />)}</ol>
    </div>
  )
}

export function HowItWorks() {
  const desktop = useDesktop()
  return (
    <section id="como-funciona" className="section how grain" aria-labelledby="how-title">
      <div className="container how__head">
        <Eyebrow>Sem complicação</Eyebrow>
        <RevealTitle id="how-title" text="Do primeiro oi até a *chave na mão* de quem comprou." className="h2" />
      </div>
      <div className="container">{desktop ? <SpiralDesktop /> : <TideLine />}</div>
      <Reveal className="how__cta">
        <CTA size="lg" />
        <p className="micro">Leva 1 minuto. Sem compromisso.</p>
      </Reveal>
    </section>
  )
}

/* ======================= O QUE VOCÊ RECEBE (bento) ======================= */
function Cell({ className = '', children, i }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--sx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  return (
    <motion.article ref={ref} className={`cell ${className}`} onMouseMove={onMove}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
      <span className="cell__spot" aria-hidden="true" />
      {children}
    </motion.article>
  )
}

function Calendar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const checked = [3, 8, 12, 17]
  return (
    <div ref={ref} className="cal" aria-hidden="true">
      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => <span key={'h' + i} className="cal__h">{d}</span>)}
      {Array.from({ length: 21 }).map((_, i) => (
        <span key={i} className={`cal__d ${checked.includes(i) ? 'is-on' : ''}`}>
          {checked.includes(i) && (
            <svg viewBox="0 0 20 20"><motion.path d="M5 10.5l3.2 3.2L15 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.3 + checked.indexOf(i) * 0.18, duration: 0.5, ease: EASE }} /></svg>
          )}
        </span>
      ))}
    </div>
  )
}

function MiniChart() {
  return (
    <svg className="chart" viewBox="0 0 220 90" aria-hidden="true">
      <path d="M0 89 H220" className="chart__base" />
      <motion.path d="M4 70 C 30 66, 40 52, 64 56 S 100 40, 122 44 S 160 22, 182 26 S 210 14, 216 12" className="chart__line"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.4, ease: EASE }} />
      <motion.circle cx="216" cy="12" r="4" className="chart__dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} />
    </svg>
  )
}

export function Bento() {
  return (
    <section className="section bento-sec" aria-labelledby="bento-title">
      <div className="container">
        <Eyebrow>Para o proprietário</Eyebrow>
        <RevealTitle id="bento-title" text="Tudo o que seu imóvel precisa para *sair*." className="h2 bento-sec__title" />
        <div className="bento">
          <Cell i={0} className="cell--big" >
            <div className="cell--big__text" data-dark>
              <h3 className="h3">Vídeo autêntico do seu imóvel</h3>
              <p>Gravado por mim, com o olhar de quem vende.</p>
            </div>
            <div className="cell--big__phone"><Phone><MediaSlot item={BENTO_VIDEO} /></Phone></div>
          </Cell>
          <Cell i={1} className="cell--vis">
            <div className="rings" aria-hidden="true"><span /><span /><span /><EyeIcon /></div>
            <h3 className="h3">Grande visibilidade</h3>
            <p>Uma das maiores vitrines de imóveis de Niterói.</p>
          </Cell>
          <Cell i={2} className="cell--free">
            <svg className="lock" viewBox="0 0 40 40" aria-hidden="true">
              <path className="lock__shackle" d="M13 18 V12 a7 7 0 0 1 14 0 V14" />
              <rect x="9" y="18" width="22" height="16" rx="4" />
              <path d="M20 24 v4" />
            </svg>
            <h3 className="h3">Sem exclusividade</h3>
            <p>Você continua livre.</p>
          </Cell>
          <Cell i={3} className="cell--visits">
            <div>
              <h3 className="h3">Visitas com quem quer comprar</h3>
              <p>Eu filtro antes de marcar.</p>
            </div>
            <Calendar />
          </Cell>
          <Cell i={4} className="cell--price">
            <MiniChart />
            <h3 className="h3">Preço alinhado ao mercado</h3>
            <p>Leitura do bairro na visita.</p>
          </Cell>
          <Cell i={5} className="cell--docs">
            <div className="papers" aria-hidden="true">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} style={{ '--k': k }}><i /><i /><i /></span>
              ))}
            </div>
            <div>
              <h3 className="h3">Burocracia comigo</h3>
              <p>Documentos, certidões e acompanhamento até a escritura.</p>
            </div>
          </Cell>
        </div>
      </div>
    </section>
  )
}
