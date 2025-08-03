export const DEFAULT_TITLE = 'PAAN'
export const DEFAULT_DESCRIPTION = 'Developer based in Bangkok, Thailand'

export function getTitle(title: string) {
  return `${title} | ${DEFAULT_TITLE}`
}
