import { animate as animejsAnimate } from 'animejs'

import type { AnimationParams, TargetsParam } from 'animejs'

export function animate(
  target: TargetsParam,
  {
    clamp,
    ...options
  }: AnimationParams & {
    clamp?: boolean
  },
) {
  const animation = animejsAnimate(target, {
    ...(clamp
      ? {
          modifier: clamp
            ? (value) => {
                if (value > 1) {
                  animation.complete()
                }

                return value
              }
            : (value) => value,
        }
      : {}),
    ...options,
  })

  return animation
}
