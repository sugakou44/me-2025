export interface AnimatedTextProps<T extends keyof HTMLElementTagNameMap> {
  as?: T
  class?: string
  isIn?: boolean
  separator?: string
  immediateExit?: boolean
  immediateEnter?: boolean
  content: string
}

export interface CharProps
  extends Pick<
    AnimatedTextProps<'span'>,
    'isIn' | 'separator' | 'immediateExit' | 'immediateEnter' | 'content'
  > {
  delayOffset?: number
}
