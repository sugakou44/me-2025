<script lang="ts">
  import { interactivity } from '@threlte/extras'

  import type { Snippet } from 'svelte'

  interface Props {
    container?: HTMLDivElement
    children?: Snippet
  }

  const { container, children }: Props = $props()

  const { target } = interactivity({
    filter: (hits) => {
      return hits.slice(0, 1)
    },
  })

  $effect.pre(() => {
    if (!container) {
      return
    }

    target.set(container)
  })
</script>

{@render children?.()}
