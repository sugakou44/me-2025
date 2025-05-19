import type { Chunks } from '../types'

export function resetSavedChunks(chunks: Chunks): string {
  const { duplicatedChunks, dependentChunks } = chunks
  const chunk = chunks.recursiveChunk
  duplicatedChunks.clear()
  dependentChunks.clear()

  chunks.recursiveChunk = ''
  chunks.allChunks.clear()
  return chunk
}

export function matches(pattern: string | RegExp, importee: string) {
  if (pattern instanceof RegExp) {
    return pattern.test(importee)
  }
  if (importee.length < pattern.length) {
    return false
  }
  if (importee === pattern) {
    return true
  }
  // eslint-disable-next-line prefer-template
  return importee.startsWith(pattern + '/')
}
