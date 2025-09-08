<script lang="ts">
  import { T } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { asset } from '$app/paths'
  import { utils } from 'animejs'

  import { appState } from '@/lib/contexts/AppState'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Particles } from './objects/Particles'

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

  const inIn = $derived(
    homeState.aboutVisibility &&
      homeState.aboutScrollProgress > 0.75 &&
      !appState.forceOpenHero,
  )

  const frustumHeight = $derived.by(() => {
    if (!homeState.perspectiveCamera) {
      return 0
    }

    const fov = homeState.perspectiveCamera.fov
    const distance = homeState.perspectiveCamera.position.z

    return 2 * distance * Math.tan(utils.degToRad(fov * 0.5))
  })
</script>

{#await promiseAll then textures}
  <T.Group
    dispose={false}
    rotation.x={-Math.PI / 2}
    position.y={-frustumHeight / 2}
  >
    <Particles isIn={inIn} {textures} />
  </T.Group>
{/await}
