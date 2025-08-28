export function effectOnce(fn: () => void | (() => void)) {
  let triggered = false

  $effect(() => {
    if (triggered) {
      return
    }

    fn()
    triggered = true
  })
}
