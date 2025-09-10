<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
  } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { WobblyPlane } from './objects/WobblyPlane'

  const size = $derived(
    Math.max(windowState.windowWidth, windowState.windowHeight) * 2,
  )

  const opacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const isVisible = $derived(homeState.aboutScrollProgress < 1)

  $effect.pre(() => {
    opacityTween.set(isVisible ? 1 : 0)
  })

  const posY = $derived.by(() => {
    if (!homeState.aboutContainer) {
      return 0
    }

    const rect = homeState.aboutContainer.getBoundingClientRect()
    return (
      rect.bottom +
      windowState.scrollPosition -
      size / Math.sqrt(2) -
      windowState.windowHeight * 0.6
    )
  })
</script>

<T.Group
  scale.x={opacityTween.current}
  visible={opacityTween.current >= DEFAULT_ALPHA_TEST}
>
  <T.Mesh position.y={windowState.windowHeight / 8}>
    <T.PlaneGeometry
      args={[windowState.windowWidth, windowState.windowHeight * 1.25, 1, 1]}
    />
    <T.MeshBasicMaterial color="white" opacity={opacityTween.current} />sc
  </T.Mesh>
  <T.Group position.y={-posY}>
    <WobblyPlane {size} rotationRad={utils.degToRad(45)} />
  </T.Group>
</T.Group>
