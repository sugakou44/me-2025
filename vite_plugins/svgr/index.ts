import { promises } from 'fs'
import { createFilter } from '@rollup/pluginutils'
import { compile } from 'svelte/compiler'
import { optimize } from 'svgo'

import type { Config } from 'svgo'
import type { Plugin } from 'vite'
import type { PluginOptions, SvgType } from './types'

const { readFile } = promises

const SVG_PARTS_EXP = /(<svg.*?)(>.*)/s
const SVG_SUFFIX_EXP = /\.svg(\?.*)$/
const SVG_MATCH_EXP = /\.svg(?:\?(raw|url|component))?$/
const DEFAULTS: PluginOptions = {
  type: 'component',
}
const SVGO_DEFAULTS: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
}

const cache = new Map()

/**
 * Extends SVG with props.
 *
 * @param data the data to be extended with prop.
 */
function extendWithProps(data: string): string {
  const parts = SVG_PARTS_EXP.exec(data)

  if (!parts) throw new Error('Data is not a valid SVG element.')

  const [, head, body] = parts
  return `${head} {...$$props}${body}`
}

/**
 * Initializes the plugin instance.
 *
 * @param options vite plugin svelte svgr global options.
 */
function initPlugin(opts: PluginOptions = { type: 'component' }): Plugin {
  opts = {
    ...DEFAULTS,
    ...opts,
  }

  const shouldOptimize = !!opts.svgo || typeof opts.svgo === 'undefined'
  let svgoOptions = (opts.svgo || {}) as Config | boolean
  svgoOptions = svgoOptions === true ? { ...SVGO_DEFAULTS } : svgoOptions

  let filter: ReturnType<typeof createFilter> | undefined

  if (opts.include || opts.exclude)
    filter = createFilter(opts.include, opts.exclude, { resolve: opts.root })

  return {
    name: 'svelte-svgr',

    async transform(src: string, id: string, options) {
      const match = id.match(SVG_MATCH_EXP)

      // Not a match nothing to do.
      if (!(match || []).length || (filter && !filter(id))) return null

      const isSSR = options?.ssr

      if (match) {
        // Defer to param type, fallback to type defined in options if any.
        const type = (match[1] || opts.type) as SvgType

        // Return the url of the SVG.
        if (type && type === 'url') return src

        try {
          const cacheid = `${id}:${isSSR}`
          const cached = cache.get(cacheid)

          if (cached) return cached

          const filename = id.replace(SVG_SUFFIX_EXP, '.svg')

          let data = (await readFile(filename)).toString('utf-8')

          const optimized = shouldOptimize
            ? optimize(data, { ...svgoOptions, path: filename })
            : { data }

          // Return raw optimized SVG.
          if (type === 'raw') {
            data = `\nexport default \`${optimized.data}\`;`
          }

          // Default to componentized SVG.
          else {
            optimized.data = extendWithProps(optimized.data)

            const { js } = compile(optimized.data, {
              filename: id,
              namespace: 'svg',
              generate: isSSR ? 'server' : 'client',
            })

            data = js.code
          }

          // Cache the optimized transformed SVG.
          cache.set(cacheid, data)

          return data
        } catch (err: unknown) {
          const { stack } = err as Error
          const message = `SVG at ${id} could NOT be resolved. See stack below.`
          console.error(`${message}\n${stack}`)
        }
      }

      return null
    },
  }
}

export * from './types'

export default initPlugin
