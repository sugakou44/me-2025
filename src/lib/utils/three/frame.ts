export const normalizeScreenHz = (
  value: number,
  dt: number,
  refreshRate: number = 60,
) => {
  return Math.pow(value, dt * refreshRate)
}
