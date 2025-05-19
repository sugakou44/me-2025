import type { Config } from 'svgo'

export type SvgType = 'raw' | 'url' | 'component'

export type FilterPattern =
  | ReadonlyArray<string | RegExp>
  | string
  | RegExp
  | null

export interface PluginOptions {
  type?: SvgType
  root?: string
  include?: FilterPattern
  exclude?: FilterPattern
  svgo?: Config | boolean
}
