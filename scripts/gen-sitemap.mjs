import { createWriteStream, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { SitemapStream } from 'sitemap'

const HOSTNAME = `https://paan.dev`
const FILE_PATH = resolve('./static/sitemap.xml')

if (!existsSync(FILE_PATH)) {
  writeFileSync(FILE_PATH, '', { flag: 'w+' })
}

// Creates a sitemap object given the input configuration with URLs
const sitemap = new SitemapStream({ hostname: HOSTNAME })

const writeStream = createWriteStream(FILE_PATH)
sitemap.pipe(writeStream)
sitemap.write({ url: '/', priority: 1 })
sitemap.write({ url: '/archives/projects', priority: 0.5 })

sitemap.end()
