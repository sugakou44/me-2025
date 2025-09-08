<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Tween } from 'svelte/motion'

  import { DURATION_FAST, DURATION_SLOW } from '@/lib/animations/constants'
  import { FEATURE_PROJECTS } from '@/lib/constants/content'
  import { windowState } from '@/lib/contexts/Window'
  import { useBreakPointValue } from '@/lib/svelte/breakpointValues.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Image } from './objects/Image'

  // import { Particles } from './objects/Particles'

  const positionXMultiplier = useBreakPointValue({
    base: 0,
    md: 1,
  })

  const tween = new Tween(0, {
    duration: DURATION_SLOW,
    easing: eases.outBounce,
  })
  let targetTween = 0

  $effect.pre(() => {
    const index = homeState.worksIndex + 1

    if (targetTween !== index) {
      tween.set(index, {
        duration: targetTween < index ? DURATION_SLOW : DURATION_FAST,
        easing: targetTween < index ? eases.outExpo : eases.linear(),
      })
      targetTween = index
    }
  })

  const frustumHeight = $derived.by(() => {
    if (!homeState.perspectiveCamera) {
      return 0
    }

    const fov = homeState.perspectiveCamera.fov
    const distance = homeState.perspectiveCamera.position.z

    return 2 * distance * Math.tan(utils.degToRad(fov * 0.5))
  })

  const frustumWidth = $derived(frustumHeight * windowState.aspectRatio)
  const positionMultipler = $derived.by(() => {
    const x = positionXMultiplier() ?? 10

    return [x, 1 - x]
  })
</script>

<T.Group>
  <!-- <Particles isIn /> -->
  {#each FEATURE_PROJECTS as { image }, index (index)}
    {@const scale =
      (0.88 *
        Math.min(frustumWidth / (positionMultipler[0] + 1), frustumHeight)) /
      Math.max(image!.width, image!.height)}
    {@const opacity = utils.clamp(
      utils.mapRange(tween.current, index, index + 1, 0, 1),
      0,
      1,
    )}
    <Image
      {...image}
      {opacity}
      {scale}
      position.y={(positionMultipler[1] * frustumHeight) / 4}
      position.x={(-positionMultipler[0] * frustumWidth) / 4}
      position.z={(1 - opacity) * 7 + index * 0.01}
      rotation.z={utils.random(-Math.PI / 6, Math.PI / 6, 4)}
    />
  {/each}
</T.Group>
