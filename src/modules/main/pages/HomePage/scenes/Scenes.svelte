<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'

  import { windowState } from '@/lib/contexts/Window'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { AboutScene, AboutScenePerspective } from './About'
  import { ExperienceScene } from './Experience'
  import { GalleryScene } from './Gallery'
  // import { GalleryScene } from './Gallery'
  import { HeroScene } from './Hero'

  interface Props {
    container?: HTMLDivElement
  }

  let { container: _container }: Props = $props()

  const { mainStage, renderer, autoRender } = useThrelte()

  autoRender.current = false

  const effectStage = useStage('effect', { before: mainStage })
  useStage('gpgpu', { before: effectStage })

  $effect.pre(() => {
    const width = windowState.windowLVW
    const height = windowState.windowLVH

    renderer.setSize(width, height)

    if (homeState.orthographicCamera) {
      homeState.orthographicCamera.left = -width / 2
      homeState.orthographicCamera.right = width / 2
      homeState.orthographicCamera.top = height / 2
      homeState.orthographicCamera.bottom = -height / 2
    }
  })

  $effect.pre(() => {
    if (
      !homeState.perspectiveScene ||
      !homeState.perspectiveCamera ||
      !homeState.orthographicScene ||
      !homeState.orthographicCamera
    ) {
      return
    }

    renderer.compile(homeState.orthographicScene, homeState.orthographicCamera)
    renderer.compile(homeState.perspectiveScene, homeState.perspectiveCamera)
  })

  $effect.pre(() => {
    renderer.setClearColor(0xfdfdfd)
    renderer.setClearAlpha(0)
  })

  useTask(() => {
    if (
      !homeState.perspectiveScene ||
      !homeState.perspectiveCamera ||
      !homeState.orthographicScene ||
      !homeState.orthographicCamera
    ) {
      return
    }

    renderer.clear()
    renderer.autoClear = false
    renderer.render(homeState.orthographicScene, homeState.orthographicCamera)
    renderer.clearDepth()
    renderer.render(homeState.perspectiveScene, homeState.perspectiveCamera)
  })
</script>

<T.Scene bind:ref={homeState.perspectiveScene}>
  <T.PerspectiveCamera
    position={[0, 0, 6]}
    lookAt={[0, 0, 0]}
    fov={70}
    near={0.001}
    far={20}
    bind:ref={homeState.perspectiveCamera}
  />
  <T.Group>
    <T.AmbientLight intensity={4.5} color={0xffffff} />
    <HeroScene />
    <AboutScenePerspective />
    <GalleryScene />
  </T.Group>
</T.Scene>

<T.Scene bind:ref={homeState.orthographicScene}>
  <T.OrthographicCamera
    position.y={-windowState.scrollPosition}
    position.z={50}
    near={0}
    far={200}
    bind:ref={homeState.orthographicCamera}
  />
  <T.Group>
    <T.AmbientLight intensity={4.5} color={0xffffff} />
    <AboutScene />
    <ExperienceScene />
  </T.Group>
</T.Scene>
