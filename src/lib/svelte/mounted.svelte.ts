export function useMounted() {
  const isMounted = $state({ current: false })

  $effect(() => {
    isMounted.current = true
  })

  return isMounted
}
