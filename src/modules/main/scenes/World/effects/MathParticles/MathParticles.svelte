<script lang="ts">
  import { T } from '@threlte/core'
  import { SphereGeometry } from 'three'

  const geometry = new SphereGeometry(3, 36, 36)
</script>

<T.Points {geometry}></T.Points>
