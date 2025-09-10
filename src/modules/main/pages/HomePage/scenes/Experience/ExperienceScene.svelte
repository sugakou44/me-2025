<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { untrack } from 'svelte'
  import { Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
    DURATION_SLOWER,
  } from '@/lib/animations/constants'
  import { appState } from '@/lib/contexts/AppState'
  import { windowState } from '@/lib/contexts/Window'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Character } from './objects/Character'
  import { Grass } from './objects/Grass'
  import { Sky } from './objects/Sky'
  import { Trees } from './objects/Trees'

  const opacityTween = new Tween(2, {
    duration: DURATION_SLOWER,
    easing: eases.outSine,
  })

  const environmentOpacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.outSine,
  })

  const rotationTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.outSine,
  })

  $effect.pre(() => {
    environmentOpacityTween.set(
      homeState.experienceScrollProgress > 0 &&
        homeState.experienceScrollProgress < 1
        ? 1
        : 0,
    )
  })

  $effect(() => {
    const target = utils.clamp(
      Math.ceil(homeState.experienceScrollProgress),
      0,
      2,
    )
    const current = untrack(() => opacityTween.current)
    opacityTween.set(target, {
      duration: target > 1 || current > 1 ? DURATION_NORMAL : DURATION_SLOWER,
    })
  })

  $effect.pre(() => {
    rotationTween.set(
      homeState.experienceScrollProgress > 1
        ? windowState.scrollDirection > 0
          ? 0.5
          : 1.5
        : windowState.scrollDirection > 0
          ? 0
          : 1,
      {
        duration: homeState.experienceScrollProgress <= 0 ? 0 : DURATION_NORMAL,
      },
    )
  })

  const size = $derived(windowState.windowHeight / 3.0)
  const characterSize = $derived(
    size * (homeState.epilogueScrollProgress + 1.2),
  )
  const positionY = $derived.by(() => {
    if (!appState.creditContainer) {
      return 0
    }

    const { height } = appState.creditContainer.getBoundingClientRect()

    return height * appState.creditScrollProgress * 5
  })
</script>

<T.Group
  visible={opacityTween.current >= DEFAULT_ALPHA_TEST}
  position.y={-windowState.windowHeight * 0.5 - windowState.scrollPosition}
  dispose={false}
>
  <Sky
    position.z={-101}
    opacity={utils.mapRange(opacityTween.current, 0, 1, 0.9, 1)}
    scale={2 *
      Math.max(windowState.windowHeight / 1.3, windowState.windowWidth / 2)}
  />

  <T.Group
    position.x={-homeState.experienceScrollProgress * windowState.windowWidth}
    scale.y={size}
    scale.x={size}
    visible={environmentOpacityTween.current >= DEFAULT_ALPHA_TEST}
  >
    <T.Group rotation.x={utils.degToRad(-90)}>
      <Trees opacity={environmentOpacityTween.current} />
      <Grass
        opacity={environmentOpacityTween.current}
        position={[0, 0, -0.05]}
      />
    </T.Group>
  </T.Group>

  <T.Group
    position.x={-1 *
      Math.min(800, windowState.windowWidth / 3) *
      (1 - homeState.epilogueScrollProgress)}
    position.y={positionY}
    scale.y={characterSize}
    scale.x={characterSize}
  >
    <T.Mesh
      position.z={-100}
      scale={(Math.max(windowState.windowHeight, windowState.windowWidth) *
        utils.clamp(opacityTween.current - 1, 0, 1)) /
        characterSize}
    >
      <T.CircleGeometry args={[1]} />
      <T.MeshBasicMaterial
        transparent
        opacity={opacityTween.current}
        color="white"
      />
    </T.Mesh>
    <Character
      opacity={opacityTween.current}
      position.z={2}
      rotation.y={utils.degToRad(90) + rotationTween.current * -Math.PI}
    />
  </T.Group>
</T.Group>
