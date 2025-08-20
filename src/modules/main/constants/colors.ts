import { Color } from 'three'

export const COLOR_VALUES = {
  primary: 0xff696c,
  secondary: 0x83aeff,
  tertiary: 0x91e0ce,
  quaternary: 0xc5a761,
} as const

export const COLORS = Object.fromEntries(
  Object.entries(COLOR_VALUES).map(([key, value]) => [key, new Color(value)]),
)
