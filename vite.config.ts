import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'

import glsl from './vite_plugins/glsl'
import svgr from './vite_plugins/svgr'

export default ({ mode }: { mode: string }) => {
  const envVars = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const IS_DEV = envVars.NODE_ENV !== 'production'
  const ANALYZE_BUNDLE = envVars.VITE_ANALYZE_DEBUG === 'true'

  return defineConfig({
    build: {
      minify: !ANALYZE_BUNDLE,
      cssMinify: !ANALYZE_BUNDLE,
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
      ...(ANALYZE_BUNDLE
        ? [
            visualizer({
              open: true,
            }),
          ]
        : []),
    ],
  })
}
