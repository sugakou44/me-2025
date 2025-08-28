import { InstancedBufferGeometry, Sphere, Vector3 } from 'three'

interface Options {
  patchSize?: number
  grassCount?: number
  segments?: number
}

export default class GrassGeometry extends InstancedBufferGeometry {
  patchSize: number
  segments: number
  vertices: number

  constructor({ patchSize = 1, grassCount = 1, segments = 6 }: Options = {}) {
    super()

    this.patchSize = patchSize
    this.segments = segments
    this.instanceCount = grassCount
    this.vertices = (this.segments + 1) * 2

    const indices = []

    for (let i = 0; i < this.segments; ++i) {
      // front
      const vi = i * 2
      indices[i * 12 + 0] = vi + 0
      indices[i * 12 + 1] = vi + 1
      indices[i * 12 + 2] = vi + 2

      indices[i * 12 + 3] = vi + 2
      indices[i * 12 + 4] = vi + 1
      indices[i * 12 + 5] = vi + 3

      // back
      const fi = this.vertices + vi
      indices[i * 12 + 6] = fi + 2
      indices[i * 12 + 7] = fi + 1
      indices[i * 12 + 8] = fi + 0

      indices[i * 12 + 9] = fi + 3
      indices[i * 12 + 10] = fi + 1
      indices[i * 12 + 11] = fi + 2
    }

    this.setIndex(indices)
    this.boundingSphere = new Sphere(
      new Vector3(0, 0, 0),
      1 + this.patchSize * 2,
    )
  }
}
