import { useState, useEffect, startTransition } from 'react'

/*
  Preferências do visitante: tema (dia/noite) e idioma (pt/en).
  O tema inicial é aplicado no <head> (index.html) antes da página desenhar,
  para não piscar. Aqui só lemos e trocamos.
*/
const isBrowser = typeof document !== 'undefined'
const root = isBrowser ? document.documentElement : { dataset: {}, classList: { add() {}, remove() {} } }
const listeners = new Set()
let state = {
  theme: root.dataset.theme === 'night' ? 'night' : 'day',
  lang: root.dataset.lang === 'en' ? 'en' : 'pt',
}
const emit = () => listeners.forEach((l) => l())
const save = (k, v) => { try { localStorage.setItem(k, v) } catch (e) { /* modo privado */ } }

export function setTheme(theme) {
  root.classList.add('theme-anim')
  root.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'night' ? '#0B1E23' : '#0E3B43')
  save('duda-tema', theme)
  state = { ...state, theme }
  emit()
  setTimeout(() => root.classList.remove('theme-anim'), 800)
}

export function setLang(lang) {
  root.dataset.lang = lang
  root.lang = lang === 'en' ? 'en' : 'pt-BR'
  save('duda-lang', lang)
  const url = new URL(window.location.href)
  if (lang === 'en') url.searchParams.set('lang', 'en')
  else url.searchParams.delete('lang')
  window.history.replaceState(null, '', url)
  state = { ...state, lang }
  emit()
}

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l) }
// Começa com os valores do HTML pré-renderizado (pt, dia) e aplica a preferência
// do visitante logo após a hidratação, como atualização não urgente.
export function usePrefs() {
  const [p, setP] = useState({ theme: 'day', lang: 'pt' })
  useEffect(() => {
    const sync = () => startTransition(() => setP((cur) => (cur.theme === state.theme && cur.lang === state.lang ? cur : { theme: state.theme, lang: state.lang })))
    sync()
    return subscribe(sync)
  }, [])
  return p
}
