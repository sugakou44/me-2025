import { Clock } from 'three'

export const normalizeScreenHz = (
  value: number,
  dt: number,
  refreshRate: number = 60,
) => {
  return Math.pow(value, dt * refreshRate)
}

const clock = new Clock()

export function getTick() {
  return clock.getElapsedTime() * 0.2
}
