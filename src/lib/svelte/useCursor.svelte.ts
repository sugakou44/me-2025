export function useCursor(className: string = 'cursor-pointer') {
  let isHover = $state(false)

  const onpointerenter = () => {
    isHover = true
  }

  const onpointerleave = () => {
    isHover = false
  }

  $effect(() => {
    if (!window) {
      return
    }

    document.body.classList.toggle(className, isHover)
  })

  return {
    isHover: () => isHover,
    onpointerenter,
    onpointerleave,
  }
}
