<script lang="ts">
  // import { MathParticles } from './effects/MathParticles'
  import { T } from '@threlte/core'
  import { eases } from 'animejs'
  import { Tween } from 'svelte/motion'

  import { DURATION_SLOW, DURATION_SLOWEST } from '@/lib/animations/constants'

  import { appState } from '../../contexts/AppState'
  import { Grass } from './objects/Grass'
  import { Terrain } from './objects/Terrain'
  import { Trees } from './objects/Trees'

  const terrainTween = new Tween({ opacity: 0 })
  const glassTween = new Tween({ opacity: 0 })
  const treesTween = new Tween({ opacity: 0 })

  $effect(() => {
    if (appState.scene === 'game') {
      terrainTween.set(
        { opacity: 1 },
        {
          duration: DURATION_SLOWEST,
          easing: eases.outQuad,
        },
      )
      glassTween.set(
        { opacity: 1 },
        {
          duration: DURATION_SLOWEST,
          delay: DURATION_SLOWEST,
          easing: eases.outQuad,
        },
      )
      treesTween.set(
        { opacity: 1 },
        {
          duration: DURATION_SLOWEST,
          delay: DURATION_SLOWEST * 1.5,
          easing: eases.outQuad,
        },
      )
    } else {
      terrainTween.set(
        { opacity: 0 },
        {
          duration: DURATION_SLOW,
          delay: DURATION_SLOWEST * 1.5,
          easing: eases.inQuad,
        },
      )
      glassTween.set(
        { opacity: 0 },
        {
          duration: DURATION_SLOWEST,
          delay: DURATION_SLOWEST,
          easing: eases.inQuad,
        },
      )
      treesTween.set(
        { opacity: 0 },
        {
          duration: DURATION_SLOWEST,
          easing: eases.inQuad,
        },
      )
    }
  })

  // const { camera } = useThrelte()

  // useTask(() => {
  //   console.log(camera.current)
  // })
</script>

<T.Group position={[0, -0.3, -3]} rotation={[-Math.PI / 2, 0, 0]}>
  <T.Group scale={[glassTween.current.opacity, 1, glassTween.current.opacity]}>
    <Grass opacity={glassTween.current.opacity} />
  </T.Group>
  <T.Group scale={[1, 1, treesTween.current.opacity]}>
    <Trees opacity={treesTween.current.opacity} />
  </T.Group>
  <T.Group scale={terrainTween.current.opacity}>
    <Terrain opacity={terrainTween.current.opacity} />
  </T.Group>
</T.Group>
<!-- <MathParticles /> -->
