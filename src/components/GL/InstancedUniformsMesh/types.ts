import type { Props } from '@threlte/core'
import type { ColorRepresentation } from 'three'
import type { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'
import type { PositionMesh } from './PositionMesh'

export type Mesh = InstancedUniformsMesh<unknown>

export type InstanceProps = Props<PositionMesh> & {
  id?: string
  color?: ColorRepresentation
  ref?: PositionMesh
}

export type InstancedMeshProps = Props<Mesh> & {
  /**
   * @default 'default'
   */
  id?: string

  /**
   * @default 1000
   */
  limit?: number

  /**
   * @default 1000
   */
  range?: number

  /**
   * @default true
   */
  update?: boolean
  ref?: Mesh
}
