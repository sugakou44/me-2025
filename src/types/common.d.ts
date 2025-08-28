type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

type ValueOf<T> = T[keyof T]

type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends Dict ? PartialDeep<T[K]> : T[K]
}

type Dict<T = any, K = string> = Record<K, T>

type Maybe<T = any> = T | null | undefined
