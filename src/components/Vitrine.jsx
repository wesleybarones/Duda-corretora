import { useRef, useState, useEffect, useLayoutEffect, createContext, useContext } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { RevealTitle, Eyebrow, MediaSlot, CTA, Scallop, SoundOnIcon, SoundOffIcon, useDesktop, useFinePointer } from './ui'
import { VITRINE } from '../config'
import { WaveRecede } from './Story'
import { useT, tx } from '../i18n'
import { usePrefs } from '../prefs'

const SoundCtx = createContext({ sound: false, setSound: () => {} })

const SIZES = [
  { w: 300, off: 0 }, { w: 270, off: 70 }, { w: 320, off: -20 }, { w: 280, off: 50 },
  { w: 300, off: -10 }, { w: 260, off: 80 }, { w: 300, off: 10 },
]

function VCard({ item, i, active, onHover, fine, tilt }) {
  const ref = useRef(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 }), sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const [hover, setHover] = useState(false)
  const size = SIZES[i % SIZES.length]
  const move = (e) => {
    if (!tilt) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 12); rx.set(-py * 12)
    ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const leave = () => { rx.set(0); ry.set(0); setHover(false); onHover?.(null) }
  const playing = fine ? hover : active
  const { sound, setSound } = useContext(SoundCtx)
  const T = useT()
  const { lang } = usePrefs()
  return (
    <motion.article
      ref={ref}
      className={`vcard ${active ? 'is-active' : ''}`}
      style={{ '--w': `${size.w}px`, '--off': `${size.off}px`, rotateX: srx, rotateY: sry }}
      onMouseMove={move}
      onMouseEnter={() => { setHover(true); onHover?.(i) }}
      onMouseLeave={leave}
      whileHover={tilt ? { scale: 1.03 } : undefined}
      data-cursor={T.cursorWatch}
    >
      <div className="vcard__media"><MediaSlot item={item} playing={playing} showLabel={false} sound={sound && playing} /></div>
      <button type="button" className={`vcard__sound ${sound ? 'is-on' : ''}`} aria-pressed={sound}
        aria-label={sound ? T.vitrine.soundOff : T.vitrine.soundOn}
        onClick={(e) => { e.stopPropagation(); setSound(!sound); if (!fine) setHover(true) }} data-cursor="hide">
        {sound ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
      <div className="vcard__cap">
        <strong>{item.bairro}</strong>
        <span>{tx(item, 'detalhe', lang)}</span>
      </div>
    </motion.article>
  )
}

function EndCard() {
  const T = useT()
  return (
    <div className="vcard vcard--end" data-dark>
      <Scallop size={70} stroke={1} className="vcard__end-shell" />
      <p className="h3">{T.vitrine.next} <em>{T.vitrine.nextEm}</em>.</p>
      <CTA variant="light" />
    </div>
  )
}

function Pinned() {
  const T = useT()
  const outer = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const [idx, setIdx] = useState(1)
  const total = VITRINE.length + 1
  const fine = useFinePointer()

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setIdx(Math.min(total, Math.round(p * (total - 1)) + 1)))

  return (
    <div ref={outer} className="vitrine__outer" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="vitrine__sticky">
        <div className="container vitrine__head">
          <div>
            <Eyebrow>{T.vitrine.eyebrow}</Eyebrow>
            <RevealTitle text={T.vitrine.title} className="h2" />
            <p className="vitrine__hint"><SoundOnIcon width="15" height="15" /> {T.vitrine.hintDesk}</p>
          </div>
          <p className="vitrine__count" aria-live="polite"><span>{String(idx).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}</p>
        </div>
        <motion.div ref={track} className="vitrine__track" style={{ x: sx }} data-cursor={T.cursorDrag}>
          {VITRINE.map((v, i) => <VCard key={i} item={v} i={i} fine={fine} tilt={fine} />)}
          <EndCard />
        </motion.div>
        <div className="container"><div className="vitrine__bar"><motion.span style={{ scaleX: scrollYProgress }} /></div></div>
      </div>
    </div>
  )
}

function Carousel() {
  const T = useT()
  const scroller = useRef(null)
  const [active, setActive] = useState(0)
  const total = VITRINE.length + 1
  const fine = useFinePointer()

  useEffect(() => {
    const el = scroller.current
    const on = () => {
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bd = Infinity
      Array.from(el.children).forEach((c, i) => {
        const cc = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(cc - center)
        if (d < bd) { bd = d; best = i }
      })
      setActive(best)
    }
    on()
    el.addEventListener('scroll', on, { passive: true })
    return () => el.removeEventListener('scroll', on)
  }, [])

  // arrastar com mouse (tablet com mouse / desktop pequeno)
  useEffect(() => {
    const el = scroller.current
    let down = false, sx = 0, sl = 0
    const d = (e) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = el.scrollLeft; el.classList.add('is-drag') }
    const m = (e) => { if (!down) return; el.scrollLeft = sl - (e.clientX - sx) }
    const u = () => { down = false; el.classList.remove('is-drag') }
    el.addEventListener('pointerdown', d); window.addEventListener('pointermove', m); window.addEventListener('pointerup', u)
    return () => { el.removeEventListener('pointerdown', d); window.removeEventListener('pointermove', m); window.removeEventListener('pointerup', u) }
  }, [])

  return (
    <>
      <div className="container vitrine__head">
        <div>
          <Eyebrow>{T.vitrine.eyebrow}</Eyebrow>
          <RevealTitle text={T.vitrine.title} className="h2" />
          <p className="vitrine__hint"><SoundOnIcon width="15" height="15" /> {T.vitrine.hintMob}</p>
        </div>
      </div>
      <div ref={scroller} className="vitrine__carousel" data-cursor={T.cursorDrag} tabIndex={0} aria-label={T.vitrine.carousel}>
        {VITRINE.map((v, i) => (
          <div key={i} className={`vslide ${active === i ? 'is-active' : ''}`}>
            <VCard item={v} i={i} active={active === i} fine={false} tilt={false} />
          </div>
        ))}
        <div className={`vslide ${active === VITRINE.length ? 'is-active' : ''}`}><EndCard /></div>
      </div>
      <div className="container vitrine__foot">
        <p className="vitrine__count"><span>{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}</p>
        <div className="vitrine__bar"><span style={{ transform: `scaleX(${(active + 1) / total})` }} /></div>
      </div>
    </>
  )
}

export default function Vitrine() {
  const T = useT()
  const desktop = useDesktop()
  const reduce = useReducedMotion()
  const [sound, setSound] = useState(false)
  return (
    <SoundCtx.Provider value={{ sound, setSound }}>
      <section id="vitrine" className="vitrine" aria-label={T.vitrine.aria}>
        <WaveRecede color="var(--pet)" />
        {desktop && !reduce ? <Pinned /> : <div className="section section--tight"><Carousel /></div>}
      </section>
    </SoundCtx.Provider>
  )
}
