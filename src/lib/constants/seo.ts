export const DEFAULT_NAME = 'PAAN'
export const DEFAULT_TITLE = `Saran「${DEFAULT_NAME}」Angsuwan`
export const DEFAULT_DESCRIPTION =
  'Front-end developer based in Bangkok, Thailand'

export function getTitle(title: string) {
  return `${title} | ${DEFAULT_NAME}`
}

export const THEME_COLOR = '#fafafa'
