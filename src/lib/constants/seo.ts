export const DEFAULT_TITLE = 'PAAN'
export const DEFAULT_DESCRIPTION =
  'Front-end developer based in Bangkok, Thailand'

export function getTitle(title: string) {
  return `${title} | ${DEFAULT_TITLE}`
}
