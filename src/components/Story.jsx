import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { RevealTitle, Reveal, Eyebrow, Phone, MediaSlot, Scallop, Nautilus, PlayIcon, HeartIcon, EASE, useDesktop } from './ui'
import { BAIRROS, TURN_VIDEO, VITRINE } from '../config'

/* ======================= MARQUEE ======================= */
export function Marquee() {
  const row = (outline) => (
    <div className={`marquee__row ${outline ? 'marquee__row--outline' : ''}`} aria-hidden={outline ? 'true' : undefined}>
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k} aria-hidden={k === 1 ? 'true' : undefined}>
            {BAIRROS.map((b) => (
              <span className="marquee__item" key={b}>
                {b}<Scallop size={18} stroke={1.4} className="marquee__shell" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <section className="marquee" data-dark aria-label="Bairros que eu atendo em Niterói">
      {row(false)}
      {row(true)}
    </section>
  )
}

/* ======================= O PROBLEMA ======================= */
const PAINS = [
  { n: '01', t: 'Anúncio parado', d: 'Seu imóvel some no meio de milhares de fotos iguais em portais.' },
  { n: '02', t: 'Visita que não compra', d: 'Você abre a porta, arruma a casa e a pessoa só queria conhecer.' },
  { n: '03', t: 'Papelada sem fim', d: 'Certidões, documentos, banco, cartório. Tudo cai no seu colo.' },
]

function LetterReveal({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  return (
    <p ref={ref} className="bridge" aria-label={text}>
      {text.split(' ').map((w, wi, arr) => {
        const before = arr.slice(0, wi).join(' ').length + (wi ? 1 : 0)
        return (
          <span key={wi} className="bridge__w" aria-hidden="true">
            {w.split('').map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: (before + i) * 0.025, duration: 0.5, ease: EASE }}>{c}</motion.span>
            ))}
            {wi < arr.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

export function Problem() {
  return (
    <section id="problema" className="section problem grain" aria-labelledby="problem-title">
      <div className="container problem__grid">
        <div className="problem__head">
          <Eyebrow>Vender imóvel não precisa ser assim</Eyebrow>
          <RevealTitle id="problem-title" text="Você não tem tempo a perder com quem só está *olhando*." className="h2" />
          <Nautilus size={140} stroke={0.8} className="problem__orn" />
        </div>
        <ol className="problem__list">
          {PAINS.map((p, i) => (
            <motion.li key={p.n} className="pain"
              initial={{ opacity: 0, x: 80, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}>
              <span className="pain__n" aria-hidden="true">{p.n}</span>
              <div>
                <h3 className="h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <LetterReveal text="Eu faço diferente. E é bem simples." />
    </section>
  )
}

/* ======================= Onda que recua (transição de seção) ======================= */
export function WaveRecede({ color = '#EFE6D8' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'start start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['calc(0% - 0px)', 'calc(-100% - 160px)'])
  const wy = useTransform(scrollYProgress, [0, 1], [0, -40])
  if (reduce) return <div ref={ref} />
  return (
    <div ref={ref} className="recede" aria-hidden="true">
      <motion.div className={`recede__fill ${color === '#EFE6D8' ? 'grain' : ''}`} style={{ y, background: color }}>
        <motion.svg className="recede__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ y: wy }}>
          <path fill={color} d="M0 0 H1440 V40 C1300 100 1150 30 980 62 C820 92 700 110 520 70 C360 36 200 60 0 96 Z" />
        </motion.svg>
      </motion.div>
    </div>
  )
}

/* ======================= A VIRADA ======================= */
const COMMENTS = [
  { c: 'Que luz linda nessa sala', a: '#C97B5E' },
  { c: 'Dá pra marcar uma visita?', a: '#1F5A63' },
  { c: 'Finalmente um vídeo que mostra a casa de verdade', a: '#A9C1C0' },
  { c: 'Qual o andar? Amei a varanda', a: '#DCCFBB' },
  { c: 'Te chamei no direct!', a: '#C97B5E' },
]

function ScreenTour() {
  return (
    <div className="scr">
      <MediaSlot item={TURN_VIDEO} />
      <span className="rec" aria-hidden="true"><i /> gravando</span>
    </div>
  )
}
function ScreenComments() {
  return (
    <div className="scr scr--comments">
      <div className="scr__blurbg"><MediaSlot item={VITRINE[0]} playing={false} showLabel={false} /></div>
      <div className="comments">
        <p className="comments__title">Comentários</p>
        {COMMENTS.map((k, i) => (
          <motion.div key={i} className="comment" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }}>
            <span className="comment__av" style={{ background: k.a }} />
            <span className="comment__body"><span className="comment__name" />{k.c}</span>
            <HeartIcon width="12" height="12" />
          </motion.div>
        ))}
      </div>
      <div className="reactions" aria-hidden="true">
        {[0, 1, 2].map((i) => <span key={i} style={{ '--i': i }}><HeartIcon /></span>)}
      </div>
    </div>
  )
}
function ScreenGrid() {
  return (
    <div className="scr scr--grid">
      <div className="profile">
        <span className="profile__av"><Scallop size={22} stroke={1.4} /></span>
        <div>
          <p className="profile__handle">@duda_corretoradeimoveis</p>
          <p className="profile__bio">Vitrine de imóveis · Niterói</p>
        </div>
      </div>
      <div className="tiles">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span key={i} className="tile" style={{ '--h': i }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: EASE }}>
            <PlayIcon width="12" height="12" />
          </motion.span>
        ))}
      </div>
    </div>
  )
}
const SCREENS = [ScreenTour, ScreenComments, ScreenGrid]

const BLOCKS = [
  { t: 'Eu, meu cinegrafista e o seu imóvel.', d: 'Muitos proprietários esperam uma superprodução. Eu chego com meu cinegrafista e um olhar cuidadoso. Equipe enxuta, sem roteiro forçado, com verdade.' },
  { t: 'Pessoas se conectam com pessoas reais.', d: 'Quem me assiste confia no que vê. Por isso seu imóvel não é só mais um anúncio: é uma recomendação.' },
  { t: 'Grande visibilidade, do jeito certo.', d: 'Seu imóvel aparece para milhares de pessoas que procuram casa em Niterói, e muitas delas estão prontas para comprar.' },
]

function TurnBlock({ i, b, onActive, desktop }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.55 })
  useEffect(() => { if (inView) onActive(i) }, [inView])
  const Screen = SCREENS[i]
  return (
    <div ref={ref} className="turn__block">
      <Reveal>
        <span className="turn__idx">{String(i + 1).padStart(2, '0')} / 03</span>
        <h3 className="h3 turn__h">{b.t}</h3>
        <p className="turn__p">{b.d}</p>
      </Reveal>
      {!desktop && (
        <Reveal className="turn__phone-inline">
          <Phone><Screen /></Phone>
        </Reveal>
      )}
    </div>
  )
}

function ScrollQuote({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <figure ref={ref} className="quote">
      <Scallop size={44} stroke={1.1} className="quote__shell" />
      <blockquote>
        <p aria-label={text}>
          <span aria-hidden="true" className="quote__mark">“</span>
          {words.map((w, i) => <QuoteWord key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
          <span aria-hidden="true" className="quote__mark">”</span>
        </p>
      </blockquote>
      <figcaption>Duda</figcaption>
    </figure>
  )
}
function QuoteWord({ w, i, n, p }) {
  const reduce = useReducedMotion()
  const start = i / n
  const o = useTransform(p, [start, Math.min(1, start + 1.5 / n)], [0.2, 1])
  return <motion.span aria-hidden="true" style={{ opacity: reduce ? 1 : o }}>{w} </motion.span>
}

export function Turn() {
  const [active, setActive] = useState(0)
  const desktop = useDesktop()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const l1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -260])
  const l2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -520])
  const Screen = SCREENS[active]

  return (
    <section ref={ref} className="turn" data-dark aria-labelledby="turn-title">
      <WaveRecede color="#EFE6D8" />
      <div className="turn__shells" aria-hidden="true">
        <motion.div style={{ y: l1 }}><Scallop size={180} stroke={0.7} className="ts ts--1" /><Nautilus size={260} stroke={0.6} className="ts ts--2" /></motion.div>
        <motion.div style={{ y: l2 }}><Scallop size={110} stroke={0.8} className="ts ts--3" /><Nautilus size={150} stroke={0.7} className="ts ts--4" /></motion.div>
      </div>

      <div className="container turn__intro">
        <Eyebrow light>A virada</Eyebrow>
        <RevealTitle text="Em tempos de IA, a *autenticidade* é o funil." className="h2" />
        <span id="turn-title" className="sr-only">Autenticidade é o funil</span>
      </div>

      <div className="container turn__grid">
        {desktop && (
          <div className="turn__sticky">
            <div className="turn__phone">
              <Phone>
                <AnimatePresence mode="sync">
                  <motion.div key={active} className="scr-wrap" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </Phone>
              <div className="turn__dots" aria-hidden="true">
                {BLOCKS.map((_, i) => <span key={i} className={i === active ? 'on' : ''} />)}
              </div>
            </div>
          </div>
        )}
        <div className="turn__blocks">
          {BLOCKS.map((b, i) => <TurnBlock key={i} i={i} b={b} onActive={setActive} desktop={desktop} />)}
        </div>
      </div>

      <div className="container">
        <ScrollQuote text="A simplicidade atrai, a autenticidade vende e ser de verdade gera confiança." />
      </div>
    </section>
  )
}
