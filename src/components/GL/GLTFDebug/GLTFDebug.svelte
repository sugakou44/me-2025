<script lang="ts">
  import { SkeletonUtils } from 'three/examples/jsm/Addons.js'

  import type { Snippet } from 'svelte'

  interface Props {
    gltf: any
    children: Snippet
  }

  let { gltf, children }: Props = $props()

  $inspect(gltf, SkeletonUtils.clone(gltf.scene))
</script>

{@render children()}
