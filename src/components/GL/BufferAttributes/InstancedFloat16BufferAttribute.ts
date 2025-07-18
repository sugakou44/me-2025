import { InstancedBufferAttribute } from 'three'

export class InstancedFloat16BufferAttribute extends InstancedBufferAttribute {
  isFloat16BufferAttribute: boolean
  constructor(
    array: number[],
    itemSize: number,
    normalized: boolean = false,
    meshPerAttribute = 1,
  ) {
    super(new Uint16Array(array), itemSize, normalized, meshPerAttribute)

    this.isFloat16BufferAttribute = true
  }
}
