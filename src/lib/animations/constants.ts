import type { SpringOptions } from './types'

export const DEFAULT_SPRING_CONFIG: SpringOptions = {
  stiffness: 0.2,
  damping: 40,
}
export const FAST_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 30,
  stiffness: 0.4,
}
export const FASTER_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 20,
  stiffness: 0.8,
}
export const FASTEST_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 10,
  stiffness: 20,
}
export const SLOW_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 80,
  stiffness: 0.1,
}
export const SLOWER_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 150,
  stiffness: 0.05,
}
export const SLOWEST_SPRING_CONFIG: SpringOptions = {
  ...DEFAULT_SPRING_CONFIG,
  damping: 200,
  stiffness: 0.03,
}

export const DEFUALT_STOP_MOTION_MS = 500
export const DURATION_NORMAL = 300
export const DURATION_FAST = 200
export const DURATION_FASTER = 100
export const DURATION_FASTEST = 50
export const DURATION_SLOW = 500
export const DURATION_SLOWER = 700
export const DURATION_SLOWEST = 1000
