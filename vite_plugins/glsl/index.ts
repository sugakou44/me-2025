/**
 * @module vite-plugin-glsl
 * @author Ustym Ukhman <ustym.ukhman@gmail.com>
 * @description Import, inline (and minify) GLSL/WGSL shader files
 * @version 1.4.1
 * @license MIT
 */

import { createFilter } from '@rollup/pluginutils'
import { transformWithEsbuild } from 'vite'

import loadShader from './loadShader'

import type { Plugin, ResolvedConfig } from 'vite'
import type { GlobPattern, PluginOptions } from './types'

const DEFAULT_EXTENSION: string = 'glsl'
const DEFAULT_INCLUDE_PATTERN: RegExp = /#include "(.+)"/gi

const DEFAULT_SHADERS: GlobPattern = [
  '**/*.glsl',
  '**/*.wgsl',
  '**/*.vert',
  '**/*.frag',
  '**/*.vs',
  '**/*.fs',
]

/**
 * @function
 * @name glsl
 * @description Plugin entry point to import,
 * inline, (and minify) GLSL/WGSL shader files
 *
 * @see {@link https://vitejs.dev/guide/api-plugin.html}
 * @link https://github.com/UstymUkhman/vite-plugin-glsl
 *
 * @param options Plugin config object
 *
 * @returns Vite plugin that converts shader code
 */
export default function glsl({
  include = DEFAULT_SHADERS,
  exclude = undefined,
  warnDuplicatedImports = true,
  removeDuplicatedImports = false,
  defaultExtension = DEFAULT_EXTENSION,
  minify = false,
  watch = true,
  root = '/',
  includePattern = DEFAULT_INCLUDE_PATTERN,
}: PluginOptions = {}): Plugin {
  let resolvedConfig: ResolvedConfig | null = null
  const filter = createFilter(include, exclude)
  const prod = process.env.NODE_ENV === 'production'

  return {
    enforce: 'pre',
    name: 'vite-plugin-glsl',

    configResolved(_resolvedConfig) {
      resolvedConfig = _resolvedConfig
    },

    async transform(source, shader) {
      if (!filter(shader)) return

      const { dependentChunks, outputShader } = await loadShader(
        source,
        shader,
        {
          removeDuplicatedImports,
          warnDuplicatedImports,
          defaultExtension,
          minify,
          root,
          includePattern,
        },
        resolvedConfig,
      )

      if (watch && !prod) {
        Array.from(dependentChunks.values())
          .flat()
          .forEach((chunk) => this.addWatchFile(chunk))
      }

      return await transformWithEsbuild(outputShader, shader, {
        sourcemap: !!resolvedConfig?.build.sourcemap && 'external',
        loader: 'text',
        format: 'esm',
        minifyWhitespace: prod,
      })
    },
  }
}
