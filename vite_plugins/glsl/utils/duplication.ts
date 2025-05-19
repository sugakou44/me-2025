import { emitWarning } from 'process'

import type { Chunks } from '../types'

export function getRecursionCaller(chunks: Chunks): string {
  const dependencies = [...chunks.dependentChunks.keys()]
  return dependencies[dependencies.length - 1]
}

export function checkDuplicatedImports(path: string, chunks: Chunks) {
  const caller = getRecursionCaller(chunks)

  const callerChunks = chunks.duplicatedChunks.get(caller) ?? []
  if (callerChunks.includes(path)) return

  callerChunks.push(path)
  chunks.duplicatedChunks.set(caller, callerChunks)

  emitWarning(`'${path}' was included multiple times.`, {
    code: 'vite-plugin-glsl',
    detail:
      'Please avoid multiple imports of the same chunk in order to avoid' +
      ` recursions and optimize your shader length.\nDuplicated import found in file '${caller}'.`,
  })
}

export function checkRecursiveImports(
  path: string,
  warn: boolean,
  ignore: boolean,
  chunks: Chunks,
): boolean | null {
  if (chunks.allChunks.has(path)) {
    if (ignore) return null
    if (warn) {
      checkDuplicatedImports(path, chunks)
    }
  }

  return checkIncludedDependencies(path, path, chunks)
}

export function checkIncludedDependencies(
  path: string,
  root: string,
  chunks: Chunks,
): boolean {
  const dependencies = chunks.dependentChunks.get(path)
  let recursiveDependency = false

  if (dependencies?.includes(root)) {
    chunks.recursiveChunk = root
    return true
  }

  dependencies?.forEach(
    (dependency) =>
      (recursiveDependency ||= checkIncludedDependencies(
        dependency,
        root,
        chunks,
      )),
  )

  return recursiveDependency
}
