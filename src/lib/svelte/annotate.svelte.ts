import { annotate as roughAnnotate } from 'rough-notation'

import { explicitEffect } from './explicitEffect.svelte'

import type {
  RoughAnnotation,
  RoughAnnotationConfig,
} from 'rough-notation/lib/model'

type Params = Parameters<typeof roughAnnotate>
type Node = Params[0]
export interface Config extends RoughAnnotationConfig {
  visible?: boolean
}
type ConfigKey = keyof Config

function applyConfig(target: object, config: Config) {
  for (const _key in config) {
    const key = _key as ConfigKey
    if (
      key !== 'visible' &&
      (!config.hasOwnProperty ||
        Object.prototype.hasOwnProperty.call(config, key))
    ) {
      const value = config[key]
      if (value && (target as Config)[key] !== value) {
        ;(target as any)[key] = value
      }
    }
  }
}

export function annotate(config: Config = {} as Config) {
  let annotation = $state<RoughAnnotation>()

  const annotateConfig = {}

  return (node: Node) => {
    explicitEffect(
      () => {
        if (!node) {
          return
        }

        applyConfig(annotateConfig as Config, config)
        annotation = roughAnnotate(node, annotateConfig as Config)
      },
      () => [node, config],
    )

    explicitEffect(
      () => {
        if (!annotation) {
          return
        }

        if (config.visible) {
          annotation.show()
        } else {
          annotation.hide()
        }
      },
      () => [config.visible, annotation],
    )

    return () => {
      annotation?.remove()
    }
  }
}
