<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Tween } from 'svelte/motion'

  import { DEFAULT_ALPHA_TEST, DURATION_SLOW } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Character } from './objects/Character'
  import { Grass } from './objects/Grass'
  import { Trees } from './objects/Trees'

  const opacityTween = new Tween(0, {
    duration: DURATION_SLOW,
    easing: eases.inOutCubic,
  })
  const rotationTween = new Tween(0, {
    duration: DURATION_SLOW,
    easing: eases.inOutCubic,
  })

  $effect(() => {
    opacityTween.set(homeState.experienceVisibility ? 1 : 0)
  })
  $effect(() => {
    rotationTween.set(windowState.scrollDirection > 0 ? 0 : 1, {
      duration: !homeState.experienceVisibility ? 0 : DURATION_SLOW,
    })
  })

  const size = $derived(windowState.windowHeight / 3.0)
</script>

<T.Group
  position.y={-windowState.windowHeight * 0.5 - windowState.scrollPosition}
  visible={opacityTween.current > DEFAULT_ALPHA_TEST}
>
  <T.Group
    position.x={-homeState.experienceScrollProgress * windowState.windowWidth}
    scale.y={size}
    scale.x={size}
  >
    <T.Group rotation={[utils.degToRad(-90), 0, 0]}>
      <!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
      <Trees opacity={opacityTween.current} />
      <Grass opacity={opacityTween.current} position={[0, 0, -0.05]} />
    </T.Group>
  </T.Group>

  <T.Group
    position.x={-1 * Math.min(800, windowState.windowWidth / 3)}
    scale.y={size * 1.2}
    scale.x={size * 1.2}
  >
    <Character
      opacity={opacityTween.current}
      position={[0, 0, 2]}
      rotation={[0, utils.degToRad(90) + rotationTween.current * Math.PI, 0]}
    />
  </T.Group>
</T.Group>
