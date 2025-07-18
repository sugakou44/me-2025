import { BackSide, DoubleSide, Vector3 } from 'three'

import { LEAF_TYPE, TREE_TYPE } from './constants'

import type {
  BarkOptions,
  BlobOptions,
  BranchOptions,
  LeaveOptions,
  TreeTypes,
} from './types'

export default class TreeOptions {
  seed: number
  type: TreeTypes

  bark: BarkOptions
  branch: BranchOptions
  leaves: LeaveOptions
  blob: BlobOptions

  constructor() {
    this.seed = 0
    this.type = TREE_TYPE.Deciduous

    // Bark parameters
    this.bark = {
      // Tint of the tree trunk
      tint: 0xffffff,

      // Use face normals for shading instead of vertex normals
      flatShading: false,

      // Apply texture to bark
      textured: true,

      // Scale for the texture
      textureScale: [1, 1],
    }

    // Branch parameters
    this.branch = {
      // Number of branch recursion levels. 0 = trunk only
      levels: 2,

      // Angle of the child branches relative to the parent branch (degrees)
      angle: {
        0: 90,
        1: 70,
        2: 60,
        3: 60,
      },

      // Number of children per branch level
      children: {
        0: 10,
        1: 8,
        2: 4,
      },

      // External force encouraging tree growth in a particular direction
      force: {
        direction: new Vector3(0, 0, 1),
        strength: 0.01,
      },

      // Amount of curling/twisting at each branch level
      gnarliness: {
        0: 0.15,
        1: 0.1,
        2: 0.1,
      },

      // Length of each branch level
      length: {
        0: 10,
        1: 4,
        2: 2,
      },

      // Radius of each branch level
      radius: {
        0: 0.8,
        1: 0.4,
        2: 0.3,
      },

      // Number of sections per branch level
      sections: {
        0: 12,
        1: 8,
        2: 2,
      },

      // Number of radial segments per branch level
      segments: {
        0: 18,
        1: 4,
        2: 2,
      },

      // Defines where child branches start forming on the parent branch
      start: {
        1: 0.4,
        2: 0.3,
        3: 0.2,
      },

      // Taper at each branch level
      taper: {
        0: 0.7,
        1: 0.7,
        2: 0.7,
        3: 0.7,
      },

      // Amount of twist at each branch level
      twist: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      },
    }

    // Leaf parameters
    this.leaves = {
      // Leaf texture to use
      type: LEAF_TYPE.Quad,

      side: DoubleSide,

      // Angle of leaves relative to parent branch (degrees)
      angle: 10,

      // Number of leaves
      count: 20,

      // Where leaves start to grow on the length of the branch (0 to 1)
      start: 0.2,

      // Size of the leaves
      size: 0.5,

      // Variance in leaf size between each instance
      sizeVariance: 0.5,

      // Tint color for the leaves
      tint: 0xffffff,

      // Controls transparency of leaf texture
      alphaTest: 0.5,
    }

    this.blob = {
      side: BackSide,
      segmentCount: 18,
      sizeOffest: 0.1,
      sizeVariance: 0.2,
      tint: 0xffffff,
    }
  }

  copy(source: any, target = this as any) {
    for (const key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key) && target.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          this.copy(source[key], target[key])
        } else {
          target[key] = source[key]
        }
      }
    }
  }
}
