import { utils } from 'animejs'
import { CatmullRomCurve3, Vector3 } from 'three'

import { windowState } from '@/lib/contexts/Window'

class Track {
  #POINTS: ArrayAsVector3[] = [
    [-1.521, 0.94, 0],
    [-0.288, 0.634, 0],
    [-0.218, 0.357, 0],
    [-0.427, 0.211, 0],
    [-0.594, 0.307, 0],
    [-0.556, 0.542, 0],
    [-0.385, 0.658, 0],

    [0.028, 0.664, 0],
    [0.701, 0.13, 0],
    [0.48, -1.014, 0],
    [-0.734, -1.311, 0],
    [-1.123, -1.99, 0],
    [-0.608, -2.675, 0],
    [0.79, -2.437, 0],
    [1.824, -2.49, 0],
    [2.089, -1.692, 0],
    [3.128, -1.672, 0],
    [3.271, -0.804, 0],
    [4.091, -0.244, 0],
  ]

  #CAMERA_POINTS: ArrayAsVector3[] = [
    [-1.521, 0.94, 0],
    [-0.288, 0.634, 0],
  ]

  mapPoint = (point: ArrayAsVector3) => {
    const aspectRatio = windowState.aspectRatio
    const newPoint = new Vector3(point[0], point[1], point[2])
    newPoint.x *= aspectRatio
    newPoint.y *= aspectRatio

    newPoint.x *= 10
    newPoint.y *= 10

    const tmpZ = newPoint.z
    newPoint.z = newPoint.y
    newPoint.y = tmpZ

    return newPoint
  }

  points = $derived.by(() => {
    const rawPoints = this.#POINTS.map(this.mapPoint)

    return rawPoints
  })

  cameraPoints = $derived.by(() => {
    const rawPoints = this.#CAMERA_POINTS.map(this.mapPoint)

    return rawPoints
  })

  curve = $derived.by(() => {
    const curve = new CatmullRomCurve3(this.points)

    return curve
  })

  cameraCurve = $derived.by(() => {
    const curve = new CatmullRomCurve3(this.cameraPoints)

    return curve
  })

  getCameraProgress = (progress: number) => {
    return utils.mapRange(Math.max(progress, 0.2), -0.3, 1, 0, 1)
  }

  get cameraPosition() {
    const position = this.cameraCurve.getPoint(
      this.getCameraProgress(windowState.scrollPercent),
    )
    return [position.x, position.z, 10] as ArrayAsVector3
  }

  get cameraInitialPosition() {
    const position = this.cameraCurve.getPoint(this.getCameraProgress(0))
    return [position.x, position.z, 10] as ArrayAsVector3
  }
}

export const track = new Track()
