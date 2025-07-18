import { BufferAttribute, BufferGeometry } from 'three'

export class TriangleGeometry extends BufferGeometry {
  constructor(points: [Point2d, Point2d, Point2d]) {
    super()

    const vertices = new Float32Array(points.flat())
    this.setAttribute('position', new BufferAttribute(vertices, 2))
  }
}
