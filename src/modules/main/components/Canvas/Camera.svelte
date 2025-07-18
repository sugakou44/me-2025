<script lang="ts">
  import { T } from '@threlte/core'

  import { cameraTrack } from '../../contexts/AppState'
</script>

<T.PerspectiveCamera makeDefault position={cameraTrack.cameraPosition} />
