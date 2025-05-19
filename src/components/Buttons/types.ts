import type { ButtonRootProps } from 'bits-ui'
import type { Size, Variant } from './constants'

export type Props = ButtonRootProps & {
  variant?: Variant
  size?: Size
  isExternal?: boolean
  isLoading?: boolean
}
