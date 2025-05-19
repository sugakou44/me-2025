export interface RobotsInfo {
  index?: boolean | undefined
  follow?: boolean | undefined
  noindex?: never | undefined
  nofollow?: never | undefined
  noarchive?: boolean | undefined
  nosnippet?: boolean | undefined
  noimageindex?: boolean | undefined
  nocache?: boolean | undefined
  notranslate?: boolean | undefined
  indexifembedded?: boolean | undefined
  nositelinkssearchbox?: boolean | undefined
  unavailable_after?: string | undefined
  'max-video-preview'?: number | string | undefined
  'max-image-preview'?: 'none' | 'standard' | 'large' | undefined
  'max-snippet'?: number | undefined
}

export function getRobotContent(robotsInfo: RobotsInfo) {
  return Object.entries(robotsInfo)
    .filter(([_, value]) => !!value)
    .map(([key]) => key)
    .join(', ')
}
