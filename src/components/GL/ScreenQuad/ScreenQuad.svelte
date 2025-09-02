<script lang="ts" module>
  export const geometry = new TriangleGeometry([
    [-1, -1],
    [3, -1],
    [-1, 3],
  ])
  geometry.boundingSphere = new Sphere()
  geometry.boundingSphere.set(new Vector3(), Infinity)
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Sphere, Vector3 } from 'three'

  import { TriangleGeometry } from '@/lib/three/geometries/TriangleGeometry'

  import type { ComponentProps, Snippet } from 'svelte'

  let {
    ref = $bindable(),
    children,
    ...props
  }: ComponentProps<typeof T.Mesh> & {
    children?: Snippet
  } = $props()
</script>

<T.Mesh bind:ref {geometry} {...props}>
  {@render children?.()}
</T.Mesh>
