export const DEFAULT_NAME = 'PAAN'
export const DEFAULT_SITENAME = 'PAAN.dev'
export const DEFAULT_DESCRIPTION =
  'Front-end developer based in Bangkok, Thailand'

export function getTitle(title: string) {
  return `${title} | ${DEFAULT_SITENAME}`
}

export const DEFAULT_TITLE = getTitle(`Saran Angsuwan`)

export const THEME_COLOR = '#fafafa'
