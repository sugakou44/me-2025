import { BARK_TYPE, BILLBOARD, LEAF_TYPE, TREE_TYPE } from './constants'

import type { Color, Euler, Side, Vector3 } from 'three'

export type BarkType = ValueOf<typeof BARK_TYPE>
export type Billboard = ValueOf<typeof BILLBOARD>
export type LeafType = ValueOf<typeof LEAF_TYPE>
export type TreeTypes = ValueOf<typeof TREE_TYPE>

export interface Section {
  origin: Vector3
  orientation: Euler
  radius: number
}

export interface Branch {
  verts: number[]
  normals: number[]
  indices: number[]
  uvs: number[]
  sectionOrigin: number[]
}

export interface Leave {
  verts: number[]
  normals: number[]
  indices: number[]
  uvs: number[]
  leaveOrigin: number[]
}

export interface Blob {
  verts: number[]
  normals: number[]
  indices: number[]
  uvs: number[]
  sectionOrigin: number[]
  sections: Section[]
}

export interface BarkOptions {
  // The bark texture
  type?: BarkType
  // Tint of the tree trunk
  tint: Color
  // Use face normals for shading instead of vertex normals
  flatShading: boolean
  // Apply texture to bark
  textured: boolean
  // Scale for the texture
  textureScale: Point2d
}

export interface BranchOptions {
  // Number of branch recursion levels. 0 = trunk only
  levels: number

  // Angle of the child branches relative to the parent branch (degrees)
  angle: Dict<number, number>

  // Number of children per branch level
  children: Dict<number, number>

  // External force encouraging tree growth in a particular direction
  force: {
    direction: Vector3
    strength: 0.01
  }

  // Amount of curling/twisting at each branch level
  gnarliness: Dict<number, number>

  // Length of each branch level
  length: Dict<number, number>

  // Radius of each branch level
  radius: Dict<number, number>

  // Number of sections per branch level
  sections: Dict<number, number>

  // Number of radial segments per branch level
  segments: Dict<number, number>

  // Defines where child branches start forming on the parent branch
  start: Dict<number, number>

  // Taper at each branch level
  taper: Dict<number, number>

  // Amount of twist at each branch level
  twist: Dict<number, number>
}

export interface LeaveOptions {
  // Leaf texture to use
  type?: LeafType

  // Whether to use single or double/perpendicular billboards
  side?: Side

  // Angle of leaves relative to parent branch (degrees)
  angle: number

  // Number of leaves
  count: number

  // Where leaves start to grow on the length of the branch (0 to 1)
  start: number

  // Size of the leaves
  size: number

  // Variance in leaf size between each instance
  sizeVariance: number

  // Tint color for the leaves
  tint: Color

  // Controls transparency of leaf texture
  alphaTest: number
}

export interface BlobOptions {
  tint: Color
  tip: Color
  side?: Side
  sizeVariance: number
  sizeOffest: number
  segmentCount: number
}
