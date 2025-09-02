<script lang="ts">
  import { T } from '@threlte/core'
  import { utils } from 'animejs'

  import { windowState } from '@/lib/contexts/Window'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import { Particles } from './objects/Particles'

  // position.x={-homeState.experienceScrollProgress * windowState.windowWidth}
</script>

<T.Group
  position.y={-windowState.aspectRatio * 10}
  position.x={-homeState.experienceScrollProgress *
    windowState.aspectRatio *
    20}
  rotation={[utils.degToRad(-90), 0, 0]}
  scale={Math.max(windowState.aspectRatio, 1) * 10}
>
  <!-- <Particles isIn={true} /> -->

  <Particles
    isIn={homeState.experienceVisibility && homeState.hasClickedAllProject}
  />
</T.Group>
