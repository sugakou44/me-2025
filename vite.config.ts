import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import glsl from './vite_plugins/glsl'
import svgr from './vite_plugins/svgr'

const IS_DEV = process.env.NODE_ENV !== 'production'

export default defineConfig({
  build: {
    minify: true,
    cssMinify: true,
    sourcemap: 'hidden',
  },
  plugins: [
    enhancedImages(),
    svgr(),
    glsl({
      include: ['**/*.glsl'],
      removeDuplicatedImports: true,
      defaultExtension: 'glsl',
      minify: !IS_DEV,
      watch: IS_DEV,
      root: '.',
    }),
    sveltekit(),
  ],
})
