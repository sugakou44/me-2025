<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'
  import { useFBO, useSuspense, useTexture } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import { asset } from '$app/paths'
  import { utils } from 'animejs'
  import {
    // devicePixelRatio,
    innerHeight,
    innerWidth,
  } from 'svelte/reactivity/window'
  import { SRGBColorSpace } from 'three'

  import { Interactivity } from '@/components/GL/Interactivity'
  import {
    vertexShader as QuadVertexShader,
    ScreenQuad,
  } from '@/components/GL/ScreenQuad'
  import { getTick } from '@/lib/three/frame'
  import { appState } from '@/modules/main/contexts/AppState'

  import { Chapter1Scene } from './Chapter1'
  import { Chapter2Scene } from './Chapter2'
  import { Chapter3Scene } from './Chapter3'
  import { Chapter4Scene } from './Chapter4'
  import { Chapter5Scene } from './Chapter5'
  import { EpilogueScene } from './Epilogue'
  import { HeroScene } from './Hero'
  import QuadFragmentShader from './shaders/effect.fragment.glsl'

  import type {
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    // Texture,
  } from 'three'

  interface Props {
    container?: HTMLDivElement
  }

  let { container }: Props = $props()
  // const dataTextures: Texture[] = new Array(8).fill(null)

  let mainScene = $state<Scene | undefined>()
  let mainCamera = $state<PerspectiveCamera | undefined>()
  const mainFBO = useFBO({
    colorSpace: SRGBColorSpace,
  })

  // colorSpace={SRGBColorSpace}
  // toneMapping={ACESFilmicToneMapping}
  // shadows={PCFSoftShadowMap}
  let epilogueScene = $state<Scene | undefined>()
  let epilogueCamera = $state<PerspectiveCamera | undefined>()
  const epilogueFBO = useFBO({
    colorSpace: SRGBColorSpace,
  })

  let effectScene = $state<Scene | undefined>()
  let effectCamera = $state<OrthographicCamera | undefined>()
  let effectMaterial = $state<ShaderMaterial | undefined>()

  const suspend = useSuspense()
  const fadeTexturePromise = suspend(
    useTexture(asset('/textures/fade-textures/fade_15.jpeg')),
  )

  const { mainStage, renderer, autoRender } = useThrelte()

  autoRender.current = false

  const effectStage = useStage('effect', { before: mainStage })
  useStage('gpgpu', { before: effectStage })

  $effect(() => {
    if (!innerWidth.current || !innerHeight.current) {
      return
    }

    // const dpr = devicePixelRatio.current ?? 1.0

    const width = innerWidth.current
    const height = innerHeight.current

    mainFBO.setSize(width, height)
    epilogueFBO.setSize(width, height)
    renderer.setSize(width, height)
  })

  useTask(() => {
    if (
      !mainScene ||
      !mainCamera ||
      !epilogueScene ||
      !epilogueCamera ||
      !effectScene ||
      !effectCamera ||
      !effectMaterial
    ) {
      return
    }

    const lastRenderTarget = renderer.getRenderTarget()

    const mixFactor = utils.clamp(appState.epilogueScrollProgress, 0, 0.98)

    renderer.setRenderTarget(mainFBO)
    renderer.render(mainScene, mainCamera)

    if (mixFactor >= 0.001) {
      renderer.setRenderTarget(epilogueFBO)
      renderer.render(epilogueScene, epilogueCamera)
    }

    // dataTextures.push(mainFBO.texture)

    // while (dataTextures.length > 8) {
    //   dataTextures.shift()
    // }

    effectMaterial.uniforms.mainTexture.value = mainFBO.texture
    effectMaterial.uniforms.epilogueTexture.value = epilogueFBO.texture
    effectMaterial.uniforms.fadeMixFactor.value = mixFactor
    effectMaterial.uniforms.tick.value = getTick()

    renderer.setRenderTarget(lastRenderTarget)
    renderer.render(effectScene, effectCamera)
  })

  const quadUniform = {
    tick: {
      value: 0,
    },
    mainTexture: {
      value: null,
    },
    epilogueTexture: {
      value: null,
    },
    fadeTexture: {
      value: null,
    },
    fadeMixFactor: {
      value: 0,
    },
  }
</script>

<T.Scene bind:ref={epilogueScene}>
  <T.PerspectiveCamera
    position={[0, 0, 5]}
    lookAt={[0, 0, 0]}
    fov={75}
    near={0.01}
    far={1000}
    frustumCulled={true}
    bind:ref={epilogueCamera}
  />
  <EpilogueScene />
</T.Scene>

<T.Scene bind:ref={mainScene}>
  <T.PerspectiveCamera
    position={[0, 0, 5]}
    lookAt={[0, 0, 0]}
    fov={75}
    near={0.01}
    far={1000}
    frustumCulled={true}
    bind:ref={mainCamera}
  />
  <Interactivity {container}>
    <HeroScene />
    <!-- <Chapter1Scene /> -->
    <!-- <Chapter2Scene /> -->
    <Chapter3Scene />
    <!-- <World>
      <Chapter4Scene />
    </World>
    <Chapter5Scene /> -->
  </Interactivity>
</T.Scene>

<!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
{#await fadeTexturePromise then fadeTexture}
  <T.Scene bind:ref={effectScene}>
    <T.OrthographicCamera
      bind:ref={effectCamera}
      position={[0, 0, 5]}
      lookAt={[0, 0, 0]}
      near={0.01}
      far={1000}
    />
    <ScreenQuad>
      <T.ShaderMaterial
        bind:ref={effectMaterial}
        vertexShader={QuadVertexShader}
        fragmentShader={QuadFragmentShader}
        uniforms={quadUniform}
        uniforms.fadeTexture.value={fadeTexture}
      />
    </ScreenQuad>
  </T.Scene>
{/await}
