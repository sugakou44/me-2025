import { readFileSync } from 'fs'
import { dirname, extname, posix, resolve, sep } from 'path'
import { cwd } from 'process'

import {
  checkRecursiveImports,
  getRecursionCaller,
  matches,
  minifyShader,
  removeSourceComments,
  resetSavedChunks,
} from './utils'

import type { ResolvedConfig } from 'vite'
import type { Chunk, Chunks, LoadingOptions, LoadingOutput } from './types'

function loadChunks(
  chunks: Chunks,
  source: string,
  path: string,
  options: Omit<LoadingOptions, 'minify'>,
  resolvedConfig: ResolvedConfig | null,
): string {
  const { warnDuplicatedImports, removeDuplicatedImports } = options
  const unixPath = path.split(sep).join(posix.sep)

  const aliasEntries = resolvedConfig?.resolve.alias

  const recursion = checkRecursiveImports(
    unixPath,
    warnDuplicatedImports,
    removeDuplicatedImports,
    chunks,
  )

  if (recursion) return chunks.recursiveChunk
  else if (recursion === null) return ''

  source = removeSourceComments(source, options.includePattern)
  let directory = dirname(unixPath)
  chunks.allChunks.add(unixPath)

  if (options.includePattern.test(source)) {
    chunks.dependentChunks.set(unixPath, [])
    const currentDirectory = directory
    const ext = options.defaultExtension

    source = source.replace(options.includePattern, (_, _chunkPath) => {
      let chunkPath = _chunkPath.trim().replace(/^(?:"|')?|(?:"|')?;?$/gi, '')
      let hasMatchedEntry = false

      if (aliasEntries) {
        const matchedEntry = aliasEntries.find((entry) =>
          matches(entry.find, chunkPath),
        )

        if (matchedEntry) {
          chunkPath = chunkPath.replace(
            matchedEntry.find,
            matchedEntry.replacement,
          )

          hasMatchedEntry = true
        }
      }

      if (!chunkPath.indexOf('/')) {
        const base = cwd().split(sep).join(posix.sep)
        chunkPath = base + options.root + chunkPath
      }

      const directoryIndex = chunkPath.lastIndexOf('/')
      directory = currentDirectory

      if (directoryIndex !== -1) {
        if (!hasMatchedEntry) {
          directory = resolve(directory, chunkPath.slice(0, directoryIndex + 1))
        }
        chunkPath = chunkPath.slice(directoryIndex + 1, chunkPath.length)
      }

      let shader = resolve(directory, chunkPath)
      if (!extname(shader)) shader = `${shader}.${ext}`

      const shaderPath = shader.split(sep).join(posix.sep)
      chunks.dependentChunks.get(unixPath)?.push(shaderPath)

      return loadChunks(
        chunks,
        readFileSync(shader, 'utf8'),
        shader,
        options,
        resolvedConfig,
      )
    })
  }

  if (chunks.recursiveChunk) {
    const caller = getRecursionCaller(chunks)
    const recursiveChunk = resetSavedChunks(chunks)

    throw new Error(
      `Recursion detected when importing '${recursiveChunk}' in '${caller}'.`,
    )
  }

  return source.trim().replace(/(\r\n|\r|\n){3,}/g, '$1\n')
}

export default async function (
  source: string,
  shader: string,
  options: LoadingOptions,
  resolvedConfig: ResolvedConfig | null,
): Promise<LoadingOutput> {
  const { minify, ...config } = options

  const dependentChunks: Chunk = new Map()
  const duplicatedChunks: Chunk = new Map()

  const chunks: Chunks = {
    dependentChunks,
    duplicatedChunks,
    recursiveChunk: '',
    allChunks: new Set(),
  }

  let output = loadChunks(chunks, source, shader, config, resolvedConfig)
  output = minify
    ? removeSourceComments(output, options.includePattern, true)
    : output

  return {
    dependentChunks,
    outputShader: minify
      ? typeof minify !== 'function'
        ? minifyShader(output)
        : await minify(output)
      : output,
  }
}
