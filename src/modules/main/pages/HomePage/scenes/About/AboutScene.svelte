<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Spring, Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
    FAST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { useAspectRatio } from '@/lib/svelte/aspectRatio.svelte'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import Character from './Character.svelte'
  import WobblyPlane from './WobblyPlane.svelte'

  const aspectRatio = useAspectRatio()
  const size = $derived(
    Math.max(windowState.windowWidth, windowState.windowHeight) * 2.0,
  )
  const minSize = $derived(
    windowState.windowHeight * Math.max(aspectRatio(), 1) * 0.5,
  )

  const rotationRad = utils.degToRad(45)

  const tween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const lookAt = new Spring(0, FAST_SPRING_CONFIG)

  const inIn = $derived(homeState.aboutScrollProgress < 1)

  $effect(() => {
    tween.set(inIn ? 1 : 0)
  })
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ percentage: [x] }) => {
      lookAt.set(x * 2.0 - 1.0)
    },
  })}
/>
<T.Group
  position.y={-(windowState.windowHeight * 1.4) + size * Math.cos(rotationRad)}
  visible={tween.current > DEFAULT_ALPHA_TEST}
>
  <T.Group scale.x={tween.current}>
    <WobblyPlane {size} {rotationRad} />
  </T.Group>
  <T.Group position.y={(1 - tween.current) * -size * 0.5}>
    <Character
      position={[0, -minSize * 3.4, 2]}
      scale={[minSize, minSize, 1]}
      opacity={tween.current}
      lookAt={lookAt.current}
    />
  </T.Group>
</T.Group>
