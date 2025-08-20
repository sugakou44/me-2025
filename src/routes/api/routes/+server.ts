import { json, text } from '@sveltejs/kit'
import cvReadyPromise from '@techstark/opencv-js'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_NAME,
  DEFAULT_TITLE,
  THEME_COLOR,
} from '@/lib/constants/seo'

export const GET = async ({ request }) => {
  const cv = await cvReadyPromise
  console.log(cv)
  return json({
    name: DEFAULT_TITLE,
    short_name: DEFAULT_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })
}

export const fallback = async ({ request }) => {
  return text(`I caught your ${request.method} request!`)
}
