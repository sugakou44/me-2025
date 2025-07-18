<script lang="ts">
  // https://github.com/threlte/threlte/tree/main/packages/extras/src/lib/components/Instancing

  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'

  import { useApi } from './api'
  import { PositionMesh } from './PositionMesh'
  import { useInstanceId } from './useInstanceId'

  import type { InstanceProps } from './types'

  let {
    id = useInstanceId(),
    ref = $bindable(),
    children,
    ...props
  }: InstanceProps = $props()

  const { addInstance, removeInstance, instancedMesh, instances } = useApi(id)

  const mesh = new PositionMesh(instancedMesh, instances)

  addInstance(mesh)

  onDestroy(() => {
    removeInstance(mesh)
  })
</script>

<T is={mesh} bind:ref {...props}>
  {@render children?.({ ref: mesh })}
</T>
