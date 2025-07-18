import { currentWritable } from '@threlte/core'
import { getContext, setContext } from 'svelte'

import type { CurrentWritable } from '@threlte/core'
import type { PositionMesh } from './PositionMesh'
import type { Mesh } from './types'

const getContextId = (instancedMeshId: string) =>
  `threlte-instanced-mesh-${instancedMeshId}`

type InstancedMeshContext = {
  instancedMesh: CurrentWritable<Mesh>
  instances: CurrentWritable<PositionMesh[]>
  addInstance: (instance: PositionMesh) => void
  removeInstance: (instance: PositionMesh) => void
}

export const createApi = (instancedMesh: Mesh, instancedMeshId: string) => {
  const api: InstancedMeshContext = {
    instancedMesh: currentWritable(instancedMesh),
    addInstance(instance) {
      api.instances.update((arr) => {
        arr.push(instance)
        return arr
      })
    },
    removeInstance(instance) {
      api.instances.update((arr) => {
        const index = arr.indexOf(instance)
        if (index > -1) arr.splice(index, 1)
        return arr
      })
    },
    instances: currentWritable([]),
  }
  setContext<InstancedMeshContext>(getContextId(instancedMeshId), api)

  return api
}

export const useApi = (instancedMeshId: string) => {
  const context = getContext<InstancedMeshContext>(
    getContextId(instancedMeshId),
  )
  if (!context)
    throw new Error(
      `No <InstancedMesh> component found for id ${instancedMeshId}`,
    )
  return context
}
