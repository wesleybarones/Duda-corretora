export const scrollStore = { lenis: null }

export function scrollToId(id, offset = -20) {
  const el = document.getElementById(id)
  if (!el) return
  if (scrollStore.lenis) scrollStore.lenis.scrollTo(el, { offset, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
