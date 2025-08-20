<script lang="ts">
  import { T } from '@threlte/core'
  import { eases } from 'animejs'
  import { Tween } from 'svelte/motion'

  import { DURATION_SLOW } from '@/lib/animations/constants'
  import { appState } from '@/modules/main/contexts/AppState'

  import { Grass } from './objects/Grass'
  import { LOW_BLADE_COUNT } from './objects/Grass/constants'
  // import { Terrain } from './objects/Terrain'
  import { Trees } from './objects/Trees'

  const VISIBILITY_THRESHOLD = 0.01

  const groupTween = new Tween({ opacity: 1 })

  $effect(() => {
    if (appState.hasVisittedEpilogue) {
      return
    }

    if (appState.isInEpilogue) {
      appState.hasVisittedEpilogue = true
    }
  })

  $effect(() => {
    if (appState.hasVisittedEpilogue) {
      groupTween.set(
        { opacity: 1 },
        {
          duration: DURATION_SLOW,
          easing: eases.inOutCubic,
        },
      )
    } else {
      groupTween.set(
        { opacity: 0 },
        {
          duration: DURATION_SLOW,
          easing: eases.inOutCubic,
        },
      )
    }
  })
</script>

<T.Group
  position={[0, -0.98, -3]}
  rotation={[-Math.PI / 2 - 0.1, 0, 0]}
  visible={groupTween.current.opacity > VISIBILITY_THRESHOLD}
>
  <T.Group>
    {#each { length: 2 } as _, j (j)}
      {#each { length: 4 } as _, i (i)}
        <Grass
          opacity={groupTween.current.opacity}
          segments={1}
          grassCount={LOW_BLADE_COUNT}
          position={[-2 + i * 2, -6 + j * 2, 0]}
        />
      {/each}
    {/each}
    {#each { length: 3 } as _, i (i)}
      <Grass
        opacity={groupTween.current.opacity}
        position={[-2 + i * 2, -8, 0]}
      />
    {/each}
  </T.Group>
  <T.Group>
    <Trees opacity={groupTween.current.opacity} />
  </T.Group>
  <!-- <T.Group>
    <Terrain opacity={groupTween.current.opacity} />
  </T.Group> -->
</T.Group>
<!-- <MathParticles /> -->
