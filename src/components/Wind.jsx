import { useEffect, useRef } from 'react'

/*
  Vento suave: poeira dourada soprando da direita para a esquerda
  e, de vez em quando, uma folhinha. Canvas fixo, sem capturar cliques.
  - inicia só depois do carregamento (não afeta o LCP)
  - pausa com a aba oculta; desligado com "reduzir movimento"
*/
const LEAF_D = 'M0 -6 C 4 -4, 5 2, 0 7 C -5 2, -4 -4, 0 -6 Z M0 -6 L0 7'

export default function Wind() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const LEAF = new Path2D(LEAF_D)
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const COUNT = mobile ? 12 : 26
    let w = 0, h = 0, dpr = 1, raf = 0, last = 0, running = false, started = false
    let nextLeaf = 0
    const dust = []
    const leaves = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const rand = (a, b) => a + Math.random() * (b - a)
    const mkDust = (anywhere) => ({
      x: anywhere ? rand(0, w) : w + rand(0, 80),
      y: rand(0, h),
      len: rand(5, 16),
      speed: rand(28, 80),
      amp: rand(4, 14),
      phase: rand(0, Math.PI * 2),
      alpha: rand(0.18, 0.42),
      warm: Math.random() < 0.6,
    })
    const mkLeaf = () => ({
      x: w + 20, y: rand(h * 0.1, h * 0.85),
      speed: rand(60, 110), amp: rand(18, 40), phase: rand(0, 6), rot: rand(0, 6),
      spin: rand(1.2, 2.6) * (Math.random() < 0.5 ? -1 : 1), size: rand(0.9, 1.3),
      color: Math.random() < 0.5 ? 'rgba(201,123,94,.7)' : 'rgba(31,90,99,.6)',
    })

    const frame = (t) => {
      if (!running) return
      const dt = Math.min(0.05, (t - (last || t)) / 1000)
      last = t
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const p of dust) {
        p.x -= p.speed * dt
        p.phase += dt * 1.2
        const y = p.y + Math.sin(p.phase) * p.amp
        if (p.x < -30) Object.assign(p, mkDust(false))
        ctx.strokeStyle = p.warm ? `rgba(201,123,94,${p.alpha})` : `rgba(244,238,228,${p.alpha + 0.15})`
        ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(p.x, y); ctx.lineTo(p.x + p.len, y + Math.cos(p.phase) * 1.5); ctx.stroke()
      }
      if (t > nextLeaf) { leaves.push(mkLeaf()); nextLeaf = t + rand(7000, 14000) }
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]
        l.x -= l.speed * dt; l.phase += dt * 1.6; l.rot += l.spin * dt
        const y = l.y + Math.sin(l.phase) * l.amp
        ctx.save(); ctx.translate(l.x, y); ctx.rotate(l.rot); ctx.scale(l.size, l.size * (0.6 + 0.4 * Math.abs(Math.cos(l.phase))))
        ctx.fillStyle = l.color; ctx.fill(LEAF)
        ctx.strokeStyle = 'rgba(250,247,242,.55)'; ctx.lineWidth = 0.6; ctx.stroke(LEAF)
        ctx.restore()
        if (l.x < -30) leaves.splice(i, 1)
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (running) return; running = true; last = 0; raf = requestAnimationFrame(frame) }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    const onVis = () => (document.hidden ? stop() : start())

    const init = () => {
      if (started) return
      started = true
      resize()
      for (let i = 0; i < COUNT; i++) dust.push(mkDust(true))
      nextLeaf = performance.now() + 2500
      window.addEventListener('resize', resize)
      document.addEventListener('visibilitychange', onVis)
      start()
    }
    const kick = () => ('requestIdleCallback' in window ? requestIdleCallback(init, { timeout: 3000 }) : setTimeout(init, 1500))
    if (document.readyState === 'complete') kick()
    else window.addEventListener('load', kick, { once: true })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('load', kick)
    }
  }, [])

  return <canvas ref={ref} className="wind" aria-hidden="true" />
}
