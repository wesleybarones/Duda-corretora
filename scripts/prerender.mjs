// Pré-renderiza o HTML da página (português, tema dia) dentro de #root,
// para o texto aparecer antes do JavaScript terminar de carregar.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const html = render()
const file = resolve('dist/index.html')
const page = readFileSync(file, 'utf8')
if (!page.includes('<div id="root"></div>')) throw new Error('#root não encontrado')
let out = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
// O JavaScript só começa a baixar depois do primeiro quadro desenhado:
// o conteúdo (já pronto no HTML) aparece primeiro e o React assume em seguida.
const m = out.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
if (!m) throw new Error('script principal não encontrado')
const loader = `<script>(function(){var go=function(){var s=document.createElement('script');s.type='module';s.crossOrigin='';s.src='${m[1]}';document.head.appendChild(s)};requestAnimationFrame(function(){setTimeout(go,0)})})();</script>`
out = out.replace(m[0], '')
out = out.replace('</body>', `  ${loader}\n  </body>`)
writeFileSync(file, out)
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`pré-renderizado: ${(html.length / 1024).toFixed(0)} KB de HTML`)
