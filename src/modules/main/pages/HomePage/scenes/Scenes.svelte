<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'

  // import { useFBO } from '@threlte/extras'
  // import { asset } from '$app/paths'
  // import {
  // devicePixelRatio,
  // innerHeight,
  // innerWidth,
  // } from 'svelte/reactivity/window'
  // import { SRGBColorSpace } from 'three'

  // import { Interactivity } from '@/components/GL/Interactivity'
  // import {
  //   vertexShader as QuadVertexShader,
  //   ScreenQuad,
  // } from '@/components/GL/ScreenQuad'
  import { windowState } from '@/lib/contexts/Window'
  // import { getTick } from '@/lib/three/frame'
  import { COLORS } from '@/modules/main/constants/colors'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { AboutScene, AboutScenePerspective } from './About'
  import { ExperienceScene } from './Experience'
  import { HeroScene } from './Hero'

  // import QuadFragmentShader from './shaders/effect.fragment.glsl'

  import type { OrthographicCamera, PerspectiveCamera } from 'three'

  interface Props {
    container?: HTMLDivElement
  }

  let { container: _container }: Props = $props()

  let perspectiveCamera = $state<PerspectiveCamera | undefined>()
  // const perspectiveFBO = useFBO({
  //   colorSpace: SRGBColorSpace,
  // })

  let orthographicCamera = $state<OrthographicCamera | undefined>()
  // const orthographicFBO = useFBO({
  //   colorSpace: SRGBColorSpace,
  // })

  // let effectScene = $state<Scene | undefined>()
  // let effectCamera = $state<OrthographicCamera | undefined>()

  const { mainStage, renderer, autoRender } = useThrelte()

  autoRender.current = false

  const effectStage = useStage('effect', { before: mainStage })
  useStage('gpgpu', { before: effectStage })

  $effect(() => {
    // const dpr = devicePixelRatio.current ?? 1.0

    const width = windowState.windowWidth
    const height = windowState.windowHeight

    // perspectiveFBO.setSize(width, height)
    // orthographicFBO.setSize(width, height)
    renderer.setSize(width, height)

    if (orthographicCamera) {
      orthographicCamera.left = -width / 2
      orthographicCamera.right = width / 2
      orthographicCamera.top = height / 2
      orthographicCamera.bottom = -height / 2
    }
  })

  $effect(() => {
    renderer.setClearColor(
      COLORS.secondary.clone().addScalar(0.75).multiplyScalar(0.8),
    )
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

    // renderer.setRenderTarget(perspectiveFBO)
    // renderer.render(homeState.perspectiveScene, perspectiveCamera)
    // renderer.setRenderTarget(orthographicFBO)
    // renderer.render(homeState.orthographicScene, orthographicCamera)

    // effectQuadUniform.perspectiveTexture.value = perspectiveFBO.texture
    // effectQuadUniform.orthographicTexture.value = orthographicFBO.texture
    // effectQuadUniform.tick.value = getTick()

    // renderer.setRenderTarget(lastRenderTarget)
    // renderer.render(effectScene, effectCamera)
  })

  // const effectQuadUniform = {
  //   tick: {
  //     value: 0,
  //   },
  //   perspectiveTexture: {
  //     value: null as unknown as Texture,
  //   },
  //   orthographicTexture: {
  //     value: null as unknown as Texture,
  //   },
  //   fadeTexture: {
  //     value: null,
  //   },
  //   fadeMixFactor: {
  //     value: 0,
  //   },
  //   diffuse: {
  //     value: COLORS.secondary.clone().addScalar(0.75).multiplyScalar(0.8),
  //   },
  // }
</script>

<T.Scene bind:ref={homeState.perspectiveScene}>
  <T.PerspectiveCamera
    position={[0, 0, 6]}
    lookAt={[0, 0, 0]}
    fov={70}
    near={0.001}
    far={20}
    frustumCulled={true}
    bind:ref={perspectiveCamera}
  />
  <T.Group>
    <HeroScene />
    <AboutScenePerspective />
  </T.Group>
</T.Scene>

<T.Scene bind:ref={homeState.orthographicScene}>
  <T.OrthographicCamera
    position.y={-windowState.scrollPosition}
    position.z={200}
    near={0}
    far={400}
    frustumCulled={false}
    bind:ref={orthographicCamera}
  />
  <T.Group>
    <AboutScene />
    <ExperienceScene />
  </T.Group>
</T.Scene>

<!-- <T.Scene bind:ref={effectScene}>
    <T.OrthographicCamera
      bind:ref={effectCamera}
      position={[0, 0, 5]}
      lookAt={[0, 0, 0]}
      near={0}
      far={10}
    />
    <ScreenQuad>
      <T.ShaderMaterial
        vertexShader={QuadVertexShader}
        fragmentShader={QuadFragmentShader}
        uniforms={effectQuadUniform}
        uniforms.fadeTexture.value={fadeTexture}
      />
    </ScreenQuad>
  </T.Scene> -->
