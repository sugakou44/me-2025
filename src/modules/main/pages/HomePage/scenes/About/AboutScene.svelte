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
    Math.max(windowState.windowWidth, windowState.windowHeight) * 3,
  )
  const minSize = $derived(
    windowState.windowHeight * Math.max(aspectRatio(), 1) * 0.75,
  )

  const rotationRad = utils.degToRad(45)

  const opacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const lookAt = new Spring(0, FAST_SPRING_CONFIG)

  const isVisible = $derived(homeState.aboutScrollProgress < 1)

  $effect(() => {
    opacityTween.set(isVisible ? 1 : 0)
  })
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ percentage: [x] }) => {
      lookAt.set(x * 2.0 - 1.0)
    },
  })}
/>
<T.AmbientLight intensity={4.5} color={0xffffff} />
<T.Group
  position.y={-(windowState.windowHeight * 1.4) + size * Math.cos(rotationRad)}
  visible={opacityTween.current > DEFAULT_ALPHA_TEST}
>
  <T.Group scale.x={opacityTween.current}>
    <WobblyPlane {size} {rotationRad} />
  </T.Group>
  <T.Group position.y={(1 - opacityTween.current) * -size * 0.5}>
    <Character
      position.y={-minSize * 3.25}
      position.z={2}
      scale.x={minSize * 0.75}
      scale.y={minSize * 0.75}
      opacity={opacityTween.current}
      lookAt={lookAt.current}
    />
  </T.Group>
</T.Group>
