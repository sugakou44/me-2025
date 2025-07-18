<script lang="ts">
  // https://github.com/threlte/threlte/tree/main/packages/extras/src/lib/components/Instancing

  import { T } from '@threlte/core'
  import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'

  import Api from './Api.svelte'

  import type { InstancedMeshProps, Mesh } from './types'

  let {
    id = 'default',
    limit = 1000,
    range = 1000,
    update = true,
    ref = $bindable(),
    children,
    count = 0,
    ...props
  }: InstancedMeshProps = $props()

  const mesh = new InstancedUniformsMesh<unknown>(undefined!, undefined, count)

  const useInstancedMesh = (callback: (instancedMesh: Mesh) => void) => {
    callback(mesh)
  }
</script>

//
https://github.com/threlte/threlte/tree/main/packages/extras/src/lib/components/Instancing

<T
  is={mesh}
  bind:ref
  raycast={() => null}
  matrixAutoUpdate={false}
  {count}
  {...props}
>
  <Api instancedMesh={mesh} {id} {limit} {range} {update} {useInstancedMesh}>
    {@render children?.({ ref: mesh })}
  </Api>
</T>
