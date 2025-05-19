import { page } from '$app/state'
import { scrollY } from 'svelte/reactivity/window'

export function shouldMaximizeAtTop() {
  const maximizeAtTop = $derived(['/', '/sandbox'].includes(page.url.pathname))

  return () => maximizeAtTop
}

export function isAtTop() {
  const isAtTop = $derived((scrollY.current ?? Infinity) <= 10)

  return () => isAtTop
}
