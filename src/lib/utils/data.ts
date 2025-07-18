import { DataUtils } from 'three'

export function float32ToFloat16(data: Float32Array) {
  const data16 = new Uint16Array(data.length)

  for (let i = 0; i < data.length; i++) {
    data16[i] = DataUtils.toHalfFloat(data[i])
  }

  return data16
}

export function float(int: number) {
  return int + 0.000001
}
