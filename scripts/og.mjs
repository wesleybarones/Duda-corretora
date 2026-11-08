// Gera public/og-image.png (1200x630) a partir de um SVG com a paleta da marca.
import { writeFileSync, mkdirSync } from 'node:fs'

const rays = [[18,30],[30,19],[43,13.5],[57,13.5],[70,19],[82,30],[11,46],[89,46]]
  .map(([x, y]) => `M50 86 L${x} ${y}`).join(' ')
const shell = (tx, ty, s, o) => `<g transform="translate(${tx} ${ty}) scale(${s})" fill="none" stroke="#F4EEE4" stroke-opacity="${o}" stroke-width="${1.4 / s}" stroke-linecap="round" stroke-linejoin="round"><path d="M50 86 C30 80 10 62 9 42 C8 24 26 12 50 12 C74 12 92 24 91 42 C90 62 70 80 50 86Z"/><path d="${rays}"/><path d="M40 86 L36 93 L64 93 L60 86"/></g>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<radialGradient id="bg" cx="40%" cy="30%" r="90%"><stop offset="0" stop-color="#1F5A63"/><stop offset="0.75" stop-color="#0E3B43"/></radialGradient>
<radialGradient id="sun" cx="82%" cy="8%" r="60%"><stop offset="0" stop-color="#C97B5E" stop-opacity="0.45"/><stop offset="1" stop-color="#C97B5E" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#sun)"/>
${shell(640, 70, 5.2, 0.85)}
${shell(120, 380, 1.6, 0.25)}
<path d="M0 540 C 200 500, 400 590, 600 545 S 1000 500, 1200 545 V630 H0 Z" fill="#F4EEE4" fill-opacity="0.06"/>
<path d="M0 575 C 220 545, 420 615, 640 580 S 1020 545, 1200 585 V630 H0 Z" fill="#0A2E34"/>
<path d="M90 120 C 160 110, 220 130, 290 118" stroke="#C97B5E" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`

try {
  const sharp = (await import('sharp')).default
  mkdirSync('public', { recursive: true })
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
  writeFileSync('public/og-image.png', png)
  console.log('og-image.png gerada')
} catch (e) {
  console.warn('og-image não gerada:', e.message)
}
