<script lang="ts">
  import { RandomText } from './RandomText'

  import type { AnimatedTextProps } from './types'

  let { ...props }: AnimatedTextProps<'h1'> = $props()
</script>

<RandomText as="h1" class="font-body leading-tight font-semibold" {...props} />
