<script lang="ts">
  import { animate, stagger, utils } from 'animejs'

  import { DURATION_NORMAL } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'

  import { ALL_CHARACTERS } from '../constants'

  import type { AnimatedTextProps } from '../types'

  export interface WordProps
    extends Pick<
      AnimatedTextProps<'span'>,
      | 'isIn'
      | 'separator'
      | 'immediateExit'
      | 'immediateEnter'
      | 'content'
      | 'class'
    > {
    delay?: number
    duration?: number
  }

  const {
    content,
    class: className,
    isIn,
    separator = ' ',
    immediateExit = false,
    immediateEnter = false,
    delay = 0,
    duration = DURATION_NORMAL,
  }: WordProps = $props()

  const [chars, indice] = $derived.by(() => {
    const chars = content.split(separator)
    const indice = chars.map((char) => {
      const index = ALL_CHARACTERS.findIndex((c) => c === char)

      return {
        original: index,
        target: utils.random(ALL_CHARACTERS.length, ALL_CHARACTERS.length * 3),
      }
    })
    return [chars, indice]
  })

  function attachAnimation(node: HTMLSpanElement) {
    const immediate = isIn ? immediateEnter : immediateExit

    const animationNode = animate(node.children, {
      opacity: isIn ? 1 : 0,
      duration: 0,
      delay: (...args) => (stagger(55)(...args) as number) + delay,
    })

    const animationIndice = animate(indice, {
      target: isIn ? 0 : () => utils.random(0, ALL_CHARACTERS.length * 3),
      duration: immediate ? 0 : duration,
      delay: (...args) => (stagger(55)(...args) as number) + delay,
      onUpdate: () => {
        indice.forEach(({ original, target }, index) => {
          const roundedOffset = Math.floor(target)
          const currentIndex =
            (original + roundedOffset) % ALL_CHARACTERS.length
          node.children[index].textContent = ALL_CHARACTERS[currentIndex]
        })
      },
    })

    return () => {
      utils.remove(node.children)
      utils.remove(indice)
      animationNode.cancel()
      animationIndice.cancel()
    }
  }
</script>

<span
  {@attach attachAnimation}
  class={cn('flex flex-wrap font-mono', className)}
>
  {#each chars as char, index (index)}
    <span class="opacity-0">
      {char}
    </span>
  {/each}
</span>
