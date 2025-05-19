export const BREAK_POINTS = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

const SORTED_BREAK_POINTS = Object.entries(BREAK_POINTS)
  .map(([key, value]) => {
    return { key, value }
  })
  .sort(({ value: valueA }, { value: valueB }) => valueB - valueA)

export type BreakPointKey = keyof typeof BREAK_POINTS

export function getCurrentBreakPoint(
  windowWidth: number,
  allowedKeys?: BreakPointKey[],
): BreakPointKey | null {
  const breakPoints = allowedKeys
    ? SORTED_BREAK_POINTS.filter(({ key }) =>
        allowedKeys.includes(key as BreakPointKey),
      )
    : SORTED_BREAK_POINTS

  const currentBreakPoint = breakPoints.find(({ value }) => {
    return windowWidth >= value
  })

  return (
    currentBreakPoint
      ? currentBreakPoint.key
      : breakPoints[0]
        ? breakPoints[0].key
        : null
  ) as BreakPointKey
}
