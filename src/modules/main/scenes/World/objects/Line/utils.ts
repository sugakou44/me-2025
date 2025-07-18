import { Vector3 } from 'three'

export function prepareDataPoints(dataPoints: number[], newData: Vector3[]) {
  newData.forEach((v) => {
    dataPoints.push(v.x, v.y, v.z, 0)
  })
}
