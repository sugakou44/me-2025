<script lang="ts">
  import { T } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { asset } from '$app/paths'
  import { eases, utils } from 'animejs'
  import { Spring, Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
    FAST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { prepareDataTextureArray } from '@/lib/three/textures'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Character } from './objects/Character'
  // import { Particles } from './objects/Particles'
  import InnerCircle from './objects/Particles/InnerCircle.svelte'
  import OuterCircle from './objects/Particles/OuterCircle.svelte'

  const suspend = useSuspense()

  const promiseAll = suspend(
    Promise.all([
      useTexture(asset('/images/tech-stacks/brand-nextjs.png')),
      useTexture(asset('/images/tech-stacks/brand-react.png')),
      useTexture(asset('/images/tech-stacks/brand-css3.png')),
      useTexture(asset('/images/tech-stacks/brand-tailwind.png')),
      useTexture(asset('/images/tech-stacks/brand-typescript.png')),
      useTexture(asset('/images/tech-stacks/brand-svelte.png')),
      useTexture(asset('/images/tech-stacks/brand-threejs.png')),
      useTexture(asset('/images/tech-stacks/brand-javascript.png')),
      useTexture(asset('/images/tech-stacks/brand-figma.png')),
      useTexture(asset('/images/tech-stacks/brand-github.png')),
      useTexture(asset('/images/tech-stacks/brand-gitlab.png')),
      // useTexture(asset('/images/tech-stacks/brand-headlessui.png')),
      useTexture(asset('/images/tech-stacks/brand-html5.png')),
      useTexture(asset('/images/tech-stacks/brand-nodejs.png')),
      useTexture(asset('/images/tech-stacks/brand-react-native.png')),
    ]),
  )

  const lookAt = new Spring(0, FAST_SPRING_CONFIG)

  const opacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const isVisible = $derived(
    homeState.aboutVisibility && homeState.aboutScrollProgress > 0.5,
  )

  $effect.pre(() => {
    opacityTween.set(isVisible ? 1 : 0)
  })

  const frustumHeight = $derived.by(() => {
    if (!homeState.perspectiveCamera) {
      return 0
    }

    const fov = homeState.perspectiveCamera.fov
    const distance = homeState.perspectiveCamera.position.z

    return 2 * distance * Math.tan(utils.degToRad(fov * 0.5))
  })
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ percentage: [x] }) => {
      lookAt.set(x * 2.0 - 1.0)
    },
  })}
/>
<T.Group visible={opacityTween.current >= DEFAULT_ALPHA_TEST}>
  {#await promiseAll then textures}
    {@const dataTextureArray = prepareDataTextureArray(textures)}
    <T.Group dispose={false} position.y={-frustumHeight / 2}>
      <T.Group
        position.y={-(1 - homeState.aboutScrollProgress) * frustumHeight +
          frustumHeight / 1.5}
      >
        <InnerCircle
          opacity={opacityTween.current}
          textures={dataTextureArray}
          count={7}
        />
      </T.Group>
      <T.Group
        position.y={-(1 - homeState.aboutScrollProgress) * frustumHeight +
          frustumHeight / 2}
      >
        <OuterCircle
          opacity={opacityTween.current}
          textures={dataTextureArray}
          count={textures.length}
        />
      </T.Group>
    </T.Group>
  {/await}

  <Character
    opacity={opacityTween.current}
    lookAt={lookAt.current}
    scale={frustumHeight}
    position.y={-frustumHeight * 2.1 + opacityTween.current * frustumHeight}
    rotation.x={utils.degToRad(-30)}
  />
</T.Group>
