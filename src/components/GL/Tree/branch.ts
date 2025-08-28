import { Euler, Vector3 } from 'three'

export class Branch {
  origin: Vector3
  orientation: Euler
  length = 0
  radius = 0
  level = 0
  sectionCount = 0
  segmentCount = 0
  isTrunk = false

  constructor(
    origin = new Vector3(),
    orientation = new Euler(),
    length = 0,
    radius = 0,
    level = 0,
    sectionCount = 0,
    segmentCount = 0,
    isTrunk = false,
  ) {
    this.origin = origin.clone()
    this.orientation = orientation.clone()
    this.length = length
    this.radius = radius
    this.level = level
    this.sectionCount = sectionCount
    this.segmentCount = segmentCount
    this.isTrunk = isTrunk
  }
}
