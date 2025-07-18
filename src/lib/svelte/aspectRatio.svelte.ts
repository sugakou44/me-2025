import { innerHeight, innerWidth } from 'svelte/reactivity/window'

export function useAspectRatio() {
  const aspectRatio = $derived.by(() => {
    if (!innerWidth.current || !innerHeight.current) {
      return 0
    }

    return innerWidth.current / innerHeight.current
  })

  return () => aspectRatio
}
