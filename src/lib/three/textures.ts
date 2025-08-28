import { DataArrayTexture } from 'three'

import type { Texture } from 'three'

export function prepareDataTextureArray(textures: Texture[]) {
  if (!textures.length) {
    throw 'Texture array is empty'
  }

  const width = textures[0].width
  const height = textures[0].height
  const textureSize = width * height
  const data = new Uint8Array(4 * textureSize * textures.length)

  textures.forEach((texture, index) => {
    const h = texture.height
    const w = texture.width

    if (w !== width || h !== height) {
      throw 'Texture dimensions do not match'
    }

    const offset = index * (4 * w * h)

    const imageData = getImageData(texture)

    if (!imageData) {
      return
    }

    data.set(imageData.data, offset)
  })

  const dataTextureArray = new DataArrayTexture(
    data,
    width,
    height,
    textures.length,
  )
  dataTextureArray.needsUpdate = true

  return dataTextureArray
}

// Taken from https://github.com/mrdoob/three.js/issues/758
export function getImageData(texture: Texture) {
  const canvas = document.createElement('canvas')
  canvas.width = texture.width
  canvas.height = texture.height

  const image = texture.source.data

  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  context.translate(0, texture.height)
  context.scale(1, -1)
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, texture.width, texture.height)
}
