// from https://github.com/pmndrs/react-three-fiber/blob/37afe372ea762003350f4633d9dddd12874d9b60/packages/fiber/src/core/utils.tsx#L193
//
import type { Material, Mesh, Object3D } from 'three'

export interface ObjectMap {
  nodes: { [name: string]: Object3D }
  materials: { [name: string]: Material }
  meshes: { [name: string]: Mesh }
}
// Collects nodes and materials from a THREE.Object3D
export function buildGraph(object: Object3D): ObjectMap {
  const data: ObjectMap = { nodes: {}, materials: {}, meshes: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name] = obj
      if (obj.material && !data.materials[obj.material.name])
        data.materials[obj.material.name] = obj.material
      if (obj.isMesh && !data.meshes[obj.name]) data.meshes[obj.name] = obj
    })
  }
  return data
}
