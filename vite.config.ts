import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { IS_DEV } from './src/lib/constants'
import glsl from './vite_plugins/glsl'
import svgr from './vite_plugins/svgr'

export default defineConfig({
  plugins: [
    enhancedImages(),
    svgr(),
    sveltekit(),
    glsl({
      include: ['**/*.glsl'],
      removeDuplicatedImports: true,
      defaultExtension: 'glsl',
      minify: !IS_DEV,
      watch: IS_DEV,
      root: '.',
    }),
  ],
})
