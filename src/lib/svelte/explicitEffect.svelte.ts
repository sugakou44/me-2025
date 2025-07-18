import { untrack } from 'svelte'

export function explicitEffect(
  fn: () => void | (() => void),
  depsFn: () => unknown[],
) {
  $effect(() => {
    depsFn()
    return untrack(fn)
  })
}
