export function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min)
}

export function normalizeArray(value: number[]) {
  const max = Math.max(...value)

  return value.map((val) => {
    return val / max
  })
}

export function boundNormalizedNumber(
  normalizedNumber: number,
  bounding: number,
) {
  return normalizedNumber * 2 * bounding - bounding
}

export function roundToStep(value: number, step: number, fn = Math.floor) {
  return fn(value / step) * step
}

export function centerPointOrigin(
  position: [number, number],
  bound: [number, number],
) {
  const [x, y] = position
  const [halfWidth, halfHeight] = bound

  return [halfWidth + x, halfHeight + y]
}

export function getSlope(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
) {
  if (x2 - x1 > -0.001 && x2 - x1 <= 0.001) {
    return null
  }

  return (y2 - y1) / (x2 - x1)
}

export function linearExtrapolation(
  x: number,
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
) {
  const slope = getSlope([x1, y1], [x2, y2])

  if (slope === null) {
    if (y2 >= y1) {
      return y2 + x
    }
    return y2 - x
  }

  return y2 + x * slope
}

export function mod(n: number, m: number) {
  // handle negative numbers
  return ((n % m) + m) % m
}

export function distance(from: ArrayAsVector2, to: ArrayAsVector2) {
  const diffX = to[0] - from[0]
  const diffY = to[1] - from[1]

  return Math.sqrt(diffX * diffX + diffY * diffY)
}

export function yaw(from: ArrayAsVector2, to: ArrayAsVector2) {
  const diffX = to[0] - from[0]
  const diffY = to[1] - from[1]

  return Math.atan2(diffY, diffX)
}

export function isEqualFloat(in1: number, in2: number) {
  return Math.abs(in1 - in2) < 0.0001
}

export function isEqualVector2(in1: ArrayAsVector2, in2: ArrayAsVector2) {
  return isEqualFloat(in1[0], in2[0]) && isEqualFloat(in1[1], in2[1])
}

export class RNG {
  m_w = 123456789
  m_z = 987654321
  mask = 0xffffffff

  constructor(seed: number) {
    this.setSeed(seed)
  }

  setSeed(seed: number) {
    this.m_w = (123456789 + seed) & this.mask
    this.m_z = (987654321 - seed) & this.mask
  }

  random(max = 1, min = 0) {
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask
    let result = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0
    result /= 4294967296

    return (max - min) * result + min
  }
}

export const random = new RNG(0)
