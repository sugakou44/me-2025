export function mountState() {
  // eslint-disable-next-line svelte/prefer-writable-derived
  let isMounted = $state(false)

  $effect(() => {
    isMounted = true
  })

  return () => isMounted
}
