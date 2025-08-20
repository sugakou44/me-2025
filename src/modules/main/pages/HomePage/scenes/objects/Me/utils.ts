import { utils } from 'animejs'

import { distance } from '@/lib/utils/math'

export const MAX_STEP_DISTANCE = 0.8
export const MAX_LEVITATION = 0.7
export const MIN_SCALE = 0.5
export const MAX_SCALE = 1.2
export const PEAK_SCALE = 1

export const MIN_DURATION = 500
export const MAX_DURATION = 1111
export const SCALE_RECOIL_DURATION = 0.25 * MAX_DURATION
export const YAW_DURATION = 250
export const YAW_STANDSTILL_DURATION = 400

export const SCALE_DURATION_FACTOR = 0.23
export const SCALE_DELAY_FACTOR = 1 - SCALE_DURATION_FACTOR * 4
export const LEVITATION_DURATION_FACTOR = 0.48
export const LEVITATION_DELAY_FACTOR = 1 - LEVITATION_DURATION_FACTOR * 2
export const PITCH_DURATION_FACTOR = 0.05

export function getDistance(
  currentPosition: ArrayAsVector2,
  targetPosition: ArrayAsVector2,
) {
  let distanceValue = distance(currentPosition, targetPosition)

  distanceValue = utils.clamp(distanceValue, 0, MAX_STEP_DISTANCE)

  return distanceValue
}

export function getPitchAngle(distance: number) {
  return utils.mapRange(distance, 0, MAX_STEP_DISTANCE, 0, 40)
}

export function getScale(distance: number) {
  return utils.mapRange(distance, 0, MAX_STEP_DISTANCE, 1, MAX_SCALE)
}

export function getPeakScale(distance: number) {
  return utils.mapRange(distance, 0, MAX_STEP_DISTANCE, 1, PEAK_SCALE)
}

export function getLevitationLevel(distance: number) {
  return utils.mapRange(
    distance,
    0,
    MAX_STEP_DISTANCE,
    MAX_LEVITATION / 2,
    MAX_LEVITATION,
  )
}

export function getDuration(distance: number) {
  return utils.mapRange(
    distance,
    0,
    MAX_STEP_DISTANCE,
    MIN_DURATION,
    MAX_DURATION,
  )
}
