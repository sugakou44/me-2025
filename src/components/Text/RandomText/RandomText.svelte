<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'p'">
  import { cn } from '@/lib/utils/className'

  import Word from './Word.svelte'

  import type { AnimatedTextProps } from '../types'

  const {
    as = 'p' as T,
    content,
    class: className,
    isIn,
    separator = ' ',
    immediateExit = false,
    immediateEnter = false,
  }: AnimatedTextProps<T> = $props()

  const splittedText = $derived(content.split(separator))
</script>

<svelte:element
  this={as}
  class={cn('flex flex-wrap gap-x-[1ch] font-mono', className)}
>
  {#each splittedText as word, index (index)}
    {@const prevWord = splittedText[index - 1]}
    {@const prevWordCharCount = prevWord ? prevWord.length : 0}
    <Word
      content={word}
      separator=""
      {isIn}
      {immediateExit}
      {immediateEnter}
      delay={prevWordCharCount * 55}
    />
  {/each}
</svelte:element>
