import { utils } from 'animejs'
import { BufferAttribute, BufferGeometry } from 'three'

import { COLORS_AS_ARRAY } from '@/modules/main/constants/colors'

const _COLORS = COLORS_AS_ARRAY

export class ParticleGeometry extends BufferGeometry {
  count = 0
  constructor(count: number, size: number) {
    super()

    this.count = count
    const colors = new Float32Array(this.count * 3)
    const particleUvs = new Float32Array(this.count * 2)
    const pointSizes = new Float32Array(this.count)
    const indices = new Float32Array(this.count)

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x
        const i2 = i * 2
        const i3 = i * 3

        // UV
        const uvX = (x + 0.5) / size
        const uvY = (y + 0.5) / size

        particleUvs[i2 + 0] = uvX
        particleUvs[i2 + 1] = uvY

        // Size
        pointSizes[i] = Math.random()
        const color = _COLORS[utils.random(0, 2)]
        colors[i3 + 0] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b
        indices[i] = i
      }
    }

    this.setDrawRange(0, this.count)
    this.setAttribute('index', new BufferAttribute(indices, 1))
    this.setAttribute('color', new BufferAttribute(colors, 3))
    this.setAttribute('particlesUv', new BufferAttribute(particleUvs, 2))
    this.setAttribute('pointSize', new BufferAttribute(pointSizes, 1))
  }
}
