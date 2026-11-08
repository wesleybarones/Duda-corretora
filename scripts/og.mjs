// Gera public/og-image.jpg (1200x630), a imagem do link de compartilhamento.
// Rodar manualmente (usa o Playwright/Chromium do ambiente):  node scripts/og.mjs
// Foto: último quadro do vídeo original (originais/duda-sorriso.png).
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const b64 = (p) => readFileSync(resolve(p)).toString('base64')
const font = (p) => `url(data:font/woff2;base64,${b64(p)}) format('woff2')`

const html = `<!doctype html><html><head><style>
@font-face { font-family: 'Fraunces'; font-style: italic; font-weight: 300 400; src: ${font('public/fonts/fraunces-italic-latin.woff2')}; }
@font-face { font-family: 'Fraunces'; font-style: normal; font-weight: 300 400; src: ${font('public/fonts/fraunces-normal-latin.woff2')}; }
@font-face { font-family: 'Manrope'; font-weight: 300 600; src: ${font('public/fonts/manrope-normal-latin.woff2')}; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0E3B43; position: relative; font-family: 'Manrope'; }
.photo { position: absolute; right: 0; top: 0; width: 560px; height: 630px; background: url(data:image/png;base64,${b64('originais/duda-sorriso.png')}) 100% -125px / 505px auto no-repeat, linear-gradient(180deg, #BEA68D, #D6C1AA);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 630' preserveAspectRatio='none'%3E%3Cpath d='M70 0H560V630H40C80 540 20 470 52 380S110 230 70 150 40 50 70 0Z'/%3E%3C/svg%3E") 0 0 / 100% 100%; }
.tide { position: absolute; right: 0; top: 0; width: 580px; height: 630px; }
.copy { position: absolute; left: 84px; top: 0; bottom: 0; width: 560px; display: flex; flex-direction: column; justify-content: center; color: #F4EEE4; }
.shell { width: 54px; height: 54px; color: #C97B5E; margin-bottom: 18px; }
.name { font: italic 300 158px/.9 'Fraunces'; letter-spacing: -.02em; margin-left: -6px; }
.line { width: 72px; height: 2px; background: #C97B5E; margin: 30px 0 26px; }
.tag { font: 300 37px/1.18 'Fraunces'; max-width: 15ch; }
.tag em { font-style: italic; color: #E3A58B; }
.meta { margin-top: 30px; font: 600 14px/1 'Manrope'; letter-spacing: .26em; text-transform: uppercase; color: #A9C1C0; }
</style></head><body>
<svg class="tide" viewBox="0 0 580 630" preserveAspectRatio="none"><path d="M86 0 C56 50 86 150 86 150 S 128 300 68 380 S 96 540 56 630" fill="none" stroke="#C97B5E" stroke-width="2.5" stroke-linecap="round"/></svg>
<div class="photo"></div>
<div class="copy">
  <svg class="shell" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M50 86 C30 80 10 62 9 42 C8 24 26 12 50 12 C74 12 92 24 91 42 C90 62 70 80 50 86Z"/><path d="M50 86 L18 30 M50 86 L30 19 M50 86 L43 13.5 M50 86 L57 13.5 M50 86 L70 19 M50 86 L82 30 M50 86 L11 46 M50 86 L89 46"/><path d="M40 86 L36 93 L64 93 L60 86"/></svg>
  <div class="name">Duda</div>
  <div class="line"></div>
  <p class="tag">Seu imóvel merece ser <em>visto</em>, não só anunciado.</p>
  <p class="meta">Corretora de imóveis · Niterói</p>
</div>
</body></html>`

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
await p.setContent(html)
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(300)
writeFileSync('public/og-image.jpg', await p.screenshot({ type: 'jpeg', quality: 88 }))
await b.close()
console.log('og-image.jpg gerada')
