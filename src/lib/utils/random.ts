import { utils } from 'animejs'

function randomColorChannel() {
  return utils.random(0, 255).toString(16).padStart(2, '0')
}

export function randomColor() {
  return `#${randomColorChannel()}${randomColorChannel()}${randomColorChannel()}`
}
