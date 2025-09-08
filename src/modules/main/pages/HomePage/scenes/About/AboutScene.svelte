<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { untrack } from 'svelte'
  import { Spring, Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
    FAST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  // import { Character } from './objects/Character'
  import { WobblyPlane } from './objects/WobblyPlane'

  let rect = $state.raw<DOMRect>({
    width: 0,
    height: 0,
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    x: 0,
    y: 0,
  } as DOMRect)

  const size = $derived(
    Math.max(windowState.windowWidth, windowState.windowHeight) * 2,
  )
  // const minSize = $derived(
  //   windowState.windowHeight * Math.max(windowState.aspectRatio, 1) * 0.75,
  // )

  const rotationRad = utils.degToRad(45)

  const opacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const lookAt = new Spring(0, FAST_SPRING_CONFIG)

  const isVisible = $derived(homeState.aboutScrollProgress < 1)

  $effect.pre(() => {
    opacityTween.set(isVisible ? 1 : 0)
  })

  $effect(() => {
    if (!homeState.aboutContainer) {
      return
    }

    rect = homeState.aboutContainer.getBoundingClientRect()
  })

  const posY = $derived(
    rect.bottom + untrack(() => Math.floor(windowState.scrollPosition / 2) * 2),
  )
</script>

<svelte:window
  onresize={() => {
    if (!homeState.aboutContainer) {
      return
    }

    rect = homeState.aboutContainer.getBoundingClientRect()
  }}
  {@attach gestures({
    onMove: ({ percentage: [x] }) => {
      lookAt.set(x * 2.0 - 1.0)
    },
  })}
/>
<T.Group scale.x={opacityTween.current}>
  <T.Mesh>
    <T.PlaneGeometry
      args={[windowState.windowWidth, windowState.windowHeight, 1, 1]}
    />
    <T.MeshBasicMaterial color="white" opacity={opacityTween.current} />sc
  </T.Mesh>
  <T.Group
    position.y={-posY + size * 0.75}
    visible={opacityTween.current >= DEFAULT_ALPHA_TEST}
  >
    <WobblyPlane {size} {rotationRad} />
    <!-- <T.Group position.y={(1 - opacityTween.current) * -size * 0.25}>
    <Character
      position.y={-size * 0.85}
      position.z={2}
      scale.x={minSize * 0.7}
      scale.y={minSize * 0.7}
      opacity={opacityTween.current}
      lookAt={lookAt.current}
    />
  </T.Group> -->
  </T.Group>
</T.Group>
