export type GlobPattern = string | string[]

type Callback = (shader: string) => string

type Minify = boolean | Callback | Promise<Callback>

export interface LoadingOptions {
  warnDuplicatedImports: boolean
  removeDuplicatedImports: boolean
  defaultExtension: string
  minify: Minify
  root: string
  includePattern: RegExp
}

export interface PluginOptions extends Partial<LoadingOptions> {
  include?: GlobPattern
  exclude?: GlobPattern
  watch?: boolean
}

export interface LoadingOutput {
  dependentChunks: Map<string, string[]>
  outputShader: string
}

export type Chunk = Map<string, string[]>

export type AllChunk = Set<string>

export interface Chunks {
  dependentChunks: Chunk
  duplicatedChunks: Chunk
  allChunks: AllChunk
  recursiveChunk: string
}
