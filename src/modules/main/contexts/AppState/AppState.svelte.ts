import { page } from '$app/state'

class AppState {
  maximizeAtTop = $derived(['/', '/sandbox'].includes(page.url.pathname))

  scene = $state<'top' | 'game' | 'chat'>('top')

  shouldShowHeroDecorator = $derived(this.maximizeAtTop && this.scene === 'top')
}

export const appState = new AppState()
