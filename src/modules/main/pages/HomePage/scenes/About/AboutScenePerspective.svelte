<script lang="ts">
  import { T } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { asset } from '$app/paths'
  import { eases } from 'animejs'
  import { Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_NORMAL,
  } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { prepareDataTextureArray } from '@/lib/three/textures'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import InnerCircle from './InnerCircle.svelte'
  import ScatterStack from './ScatterStack.svelte'

  const suspend = useSuspense()

  const promiseAll = Promise.all([
    suspend(useTexture(asset('/images/tech-stacks/brand-nextjs.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-react.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-css3.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-tailwind.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-typescript.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-svelte.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-threejs.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-javascript.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-figma.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-github.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-gitlab.png'))),
    // suspend(useTexture(asset('/images/tech-stacks/brand-headlessui.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-html5.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-nodejs.png'))),
    suspend(useTexture(asset('/images/tech-stacks/brand-react-native.png'))),
  ])

  const opacityTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  $effect(() => {
    opacityTween.set(homeState.aboutVisibility ? 1 : 0)
  })

  const positionTween = new Tween(0, {
    duration: DURATION_NORMAL,
    easing: eases.inOutSine,
  })

  const inIn = $derived(homeState.aboutScrollProgress < 1)

  $effect(() => {
    positionTween.set(inIn ? 0 : 1)
  })
</script>

{#await promiseAll then textures}
  {@const dataTextureArray = prepareDataTextureArray(textures)}

  <T.Group
    dispose={false}
    position.y={(windowState.scrollPosition - windowState.windowHeight * 0.95) *
      0.01}
    visible={opacityTween.current > DEFAULT_ALPHA_TEST}
  >
    <T.Group position.y={positionTween.current * 2}>
      <InnerCircle
        opacity={opacityTween.current}
        textures={dataTextureArray}
        count={7}
      />
      <ScatterStack
        opacity={opacityTween.current}
        textures={dataTextureArray}
        count={textures.length}
      />
      <!-- <Character
        position.z={2}
        position.y={-5 * (1 - positionTween.current)}
        scale={5}
      /> -->
    </T.Group>
  </T.Group>
{/await}
