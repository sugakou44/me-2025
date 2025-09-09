import { json, text } from '@sveltejs/kit'
import { asset } from '$app/paths'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITENAME,
  THEME_COLOR,
} from '@/lib/constants/seo'

export const GET = async () => {
  return json({
    name: DEFAULT_SITENAME,
    short_name: DEFAULT_SITENAME,
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: asset('/icons/favicon_512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: asset('/icons/favicon_192x192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  })
}

export const fallback = async ({ request }) => {
  return text(`I caught your ${request.method} request!`)
}
