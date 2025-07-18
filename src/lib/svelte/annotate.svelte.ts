import { annotate as roughAnnotate } from 'rough-notation'

import type { RoughAnnotationConfig } from 'rough-notation/lib/model'

type Params = Parameters<typeof roughAnnotate>
type Node = Params[0]
type Config = RoughAnnotationConfig & {
  visible?: boolean
}
type ConfigKey = keyof Config

export function annotate(node: Node, config: Config = {} as Config) {
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

  function updateVisible(visible: boolean) {
    if (visible) {
      annotation.show()
    } else {
      annotation.hide()
    }
  }

  const annotateConfig = {}
  applyConfig(annotateConfig as Config, config)
  const annotation = roughAnnotate(node, annotateConfig as Config)
  updateVisible(!!config.visible)

  return {
    update(newConfig: Config) {
      applyConfig(annotation, newConfig)
      updateVisible(!!newConfig.visible)
    },
    destroy() {
      annotation.remove()
    },
  }
}
