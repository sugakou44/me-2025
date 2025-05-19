// use https://animejs.com/documentation/utilities/clamp
// export function clamp(value: number, min: number, max: number) {
//   return Math.min(Math.max(value, min), max)
// }

export function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min)
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

// use https://animejs.com/documentation/utilities/rad-to-deg
// export function radianToDegree(radian: number) {
//   return (radian * 180.0) / Math.PI
// }

// use https://animejs.com/documentation/utilities/deg-to-rad
// export function degreeToRadian(degree: number) {
//   return (degree * Math.PI) / 180.0
// }

export function centerPointOrigin(
  position: [number, number],
  bound: [number, number],
) {
  const [x, y] = position
  const [halfWidth, halfHeight] = bound

  return [halfWidth + x, halfHeight + y]
}

// use https://animejs.com/documentation/utilities/map-range
// export function mapRange(
//   value: number,
//   [inMin, inMax]: [number, number],
//   [outMin, outMax]: [number, number],
// ) {
//   return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
// }

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
