export interface Footprint {
  id: string
  angle: number
  isLeftSide: boolean
  position: [number, number]
  timestamp: number
  isAtStop?: boolean
}
