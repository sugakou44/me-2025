import rough from 'roughjs'

import type { Config } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'

interface ExtendedRoughSVG extends RoughSVG {
  _path: RoughSVG['path']
  _linearPath: RoughSVG['linearPath']
  _polygon: RoughSVG['polygon']
  _curve: RoughSVG['curve']
  _arc: RoughSVG['arc']
  _line: RoughSVG['line']
  _rectangle: RoughSVG['rectangle']
  _circle: RoughSVG['circle']
  _ellipse: RoughSVG['ellipse']
}

function filterPath(current: SVGGElement) {
  for (const child of current.children) {
    const stroke = child.getAttribute('stroke')
    const strokeWidth = child.getAttribute('stroke-width') ?? '0'
    const fill = child.getAttribute('fill')

    if (
      (fill === 'none' && stroke === 'none') ||
      (fill === 'none' && parseFloat(strokeWidth) <= 0.1)
    ) {
      current.removeChild(child)
    }
  }

  if (current.children.length === 1) {
    return current.children[0] as SVGGElement
  }

  return current
}

export function roughSvg(svg: SVGSVGElement, config?: Config) {
  const roughInstance = rough.svg(svg, {
    ...config,
    options: {
      disableMultiStroke: true,
      disableMultiStrokeFill: true,
      ...config?.options,
    },
  }) as ExtendedRoughSVG

  roughInstance._path = roughInstance.path
  roughInstance.path = (...args) => {
    const paths = roughInstance._path(...args)

    return filterPath(paths)
  }

  roughInstance._curve = roughInstance.curve
  roughInstance.curve = (...args) => {
    const paths = roughInstance._curve(...args)

    return filterPath(paths)
  }

  roughInstance._linearPath = roughInstance.linearPath
  roughInstance.linearPath = (...args) => {
    const paths = roughInstance._linearPath(...args)

    return filterPath(paths)
  }

  roughInstance._polygon = roughInstance.polygon
  roughInstance.polygon = (...args) => {
    const paths = roughInstance._polygon(...args)

    return filterPath(paths)
  }

  roughInstance._arc = roughInstance.arc
  roughInstance.arc = (...args) => {
    const paths = roughInstance._arc(...args)

    return filterPath(paths)
  }

  roughInstance._rectangle = roughInstance.rectangle
  roughInstance.rectangle = (...args) => {
    const paths = roughInstance._rectangle(...args)

    return filterPath(paths)
  }

  roughInstance._circle = roughInstance.circle
  roughInstance.circle = (...args) => {
    const paths = roughInstance._circle(...args)

    return filterPath(paths)
  }

  roughInstance._ellipse = roughInstance.ellipse
  roughInstance.ellipse = (...args) => {
    const paths = roughInstance._ellipse(...args)

    return filterPath(paths)
  }

  roughInstance._line = roughInstance.line
  roughInstance.line = (...args) => {
    const paths = roughInstance._line(...args)

    return filterPath(paths)
  }

  return roughInstance
}
