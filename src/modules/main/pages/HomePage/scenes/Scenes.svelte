<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'

  import { windowState } from '@/lib/contexts/Window'
  import { COLORS } from '@/modules/main/constants/colors'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { AboutScene, AboutScenePerspective } from './About'
  import { ExperienceScene } from './Experience'
  // import { GalleryScene } from './Gallery'
  import { HeroScene } from './Hero'

  import type { OrthographicCamera, PerspectiveCamera } from 'three'

  interface Props {
    container?: HTMLDivElement
  }

  let { container: _container }: Props = $props()

  let perspectiveCamera = $state<PerspectiveCamera | undefined>()

  let orthographicCamera = $state<OrthographicCamera | undefined>()
  let precompileCamera = $state<OrthographicCamera | undefined>()

  const { mainStage, renderer, autoRender } = useThrelte()

  autoRender.current = false
  let compiled = false

  const effectStage = useStage('effect', { before: mainStage })
  useStage('gpgpu', { before: effectStage })

  $effect.pre(() => {
    const width = windowState.windowWidth
    const height = windowState.windowHeight

    renderer.setSize(width, height)

    if (orthographicCamera) {
      orthographicCamera.left = -width / 2
      orthographicCamera.right = width / 2
      orthographicCamera.top = height / 2
      orthographicCamera.bottom = -height / 2
    }
  })

  $effect.pre(() => {
    renderer.setClearColor(
      COLORS.secondary.clone().addScalar(0.75).multiplyScalar(0.8),
    )
  })

  $effect(() => {
    if (compiled) {
      return
    }

    if (
      !homeState.perspectiveScene ||
      !homeState.orthographicScene ||
      !precompileCamera
    ) {
      return
    }

    precompileCamera.left = -windowState.windowWidth / 2
    precompileCamera.right = windowState.windowWidth / 2
    precompileCamera.top = windowState.windowHeight / 2
    precompileCamera.bottom = windowState.scrollHeight * 2
    renderer.compile(homeState.orthographicScene, precompileCamera)
    renderer.compile(homeState.perspectiveScene, precompileCamera)

    compiled = true
  })

  useTask(() => {
    if (
      !homeState.perspectiveScene ||
      !perspectiveCamera ||
      !homeState.orthographicScene ||
      !orthographicCamera
    ) {
      return
    }

    renderer.clear()
    renderer.autoClear = false
    renderer.render(homeState.orthographicScene, orthographicCamera)
    renderer.clearDepth()
    renderer.render(homeState.perspectiveScene, perspectiveCamera)
  })
</script>

<T.OrthographicCamera
  position.y={-windowState.scrollPosition}
  position.z={200}
  near={0}
  far={400}
  bind:ref={precompileCamera}
/>

<T.Scene bind:ref={homeState.perspectiveScene}>
  <T.PerspectiveCamera
    position={[0, 0, 6]}
    lookAt={[0, 0, 0]}
    fov={70}
    near={0.001}
    far={20}
    bind:ref={perspectiveCamera}
  />
  <T.Group>
    <HeroScene />
    <AboutScenePerspective />
    <!-- <GalleryScene /> -->
  </T.Group>
</T.Scene>

<T.Scene bind:ref={homeState.orthographicScene}>
  <T.OrthographicCamera
    position.y={-windowState.scrollPosition}
    position.z={50}
    near={0}
    far={200}
    bind:ref={orthographicCamera}
  />
  <T.Group>
    <T.AmbientLight intensity={4.5} color={0xffffff} />
    <AboutScene />
    <ExperienceScene />
  </T.Group>
</T.Scene>
