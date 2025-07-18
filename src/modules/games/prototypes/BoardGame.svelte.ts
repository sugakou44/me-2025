import { svg as animeSVG, eases, stagger, utils } from 'animejs'
import { untrack } from 'svelte'
import { SvelteMap } from 'svelte/reactivity'

import { animate } from '@/lib/animations/animejs'
import { DURATION_NORMAL } from '@/lib/animations/constants'
import { cn, toggleClass } from '@/lib/utils/className'
import { roughSvg } from '@/lib/utils/rough'

import type { BoardDimension } from '@/modules/games/types'
import type { AnimationParams } from 'animejs'
import type { Options as RoughOptions } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'

export type State = 'X' | 'O'

export interface GameOptions {
  dimension: BoardDimension
  player1Options: RoughOptions
  player2Options: RoughOptions
  gridOptions: RoughOptions
}

export const DEFUALT_ROUGH_OPTIONS: RoughOptions = {
  strokeWidth: 4,
  roughness: 0.8,
  disableMultiStroke: true,
  disableMultiStrokeFill: true,
  simplification: 1,
  bowing: 0,
}

export class BoardGame<T = State> {
  svg: SVGSVGElement | null = null
  roughSvg: RoughSVG | null = null
  dimension: BoardDimension = [3, 3]
  gridOptions: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    strokeWidth: 2,
    stroke: 'var(--color-gray-800)',
  }
  cellOptions: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    strokeWidth: 0,
    fillStyle: 'solid',
    fill: 'var(--color-gray-200)',
    roughness: 0,
    bowing: 0,
    disableMultiStroke: true,
    disableMultiStrokeFill: true,
  }
  player1Options: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    stroke: 'var(--primary-foreground)',
  }
  player2Options: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    stroke: 'var(--secondary-foreground)',
  }

  computationDepth: number = 9
  _computationCount: number = 0

  state = $state<Map<number, T | null>>(new SvelteMap())
  history = $state<string[]>([])
  isComputing = $state<boolean>(false)
  isEnded = $state<boolean>(false)
  winner = $state<T | boolean | null>(null)
  player1 = $state<string | null>(null)
  player2 = $state<string | null>(null)

  get cellSize(): ArrayAsVector2 {
    const { width, height } = this.size!

    const [col, row] = this.dimension

    return [width / col, height / row]
  }

  get isTerminated() {
    return !!this.winner || this.isEnded
  }

  get isBoardReady() {
    return Boolean(this.svg && this.roughSvg)
  }

  get size(): Pick<DOMRect, 'width' | 'height'> {
    if (!this.svg) return { width: 0, height: 0 }

    return this.svg.getBoundingClientRect()
  }

  get cellCount() {
    return this.dimension[0] * this.dimension[1]
  }

  constructor(options?: Partial<GameOptions>) {
    if (!options) {
      return
    }

    const { dimension, player1Options, player2Options, gridOptions } = options

    this.player1Options = {
      ...this.player1Options,
      ...player1Options,
    }

    this.player2Options = {
      ...this.player2Options,
      ...player2Options,
    }

    this.gridOptions = {
      ...this.gridOptions,
      ...gridOptions,
    }

    if (dimension) {
      this.dimension = dimension
    }
  }

  init(svg: SVGSVGElement, _options?: unknown) {
    this.svg = svg
    this.roughSvg = roughSvg(this.svg)

    untrack(() => this.reset())
  }

  reset() {
    if (this.isComputing) {
      return
    }

    this.history.length = 0
    this.state.clear()
    this.isComputing = false
    this.winner = null
    this.isEnded = false
    this.player1 = null
    this.player2 = null

    if (this.svg) {
      this.clear(this.svg)
    }
  }

  fillCell(cell: Point2d, skipAnimation?: boolean) {
    const className = this.getClassName('cell', cell)

    if (this.hasDrawBefore(className)) {
      return
    }

    const [cellWidth, cellHeight] = this.cellSize

    const [x, y] = [cell[0] * cellWidth, cell[1] * cellHeight]
    const path = this.roughSvg!.rectangle(
      x + cellWidth * 0.1,
      y + cellHeight * 0.1,
      cellWidth * 0.8,
      cellHeight * 0.8,
      this.cellOptions,
    )

    toggleClass(path, cn('origin-top-left transform-fill', className), true)

    this.svg?.appendChild(path)

    if (!skipAnimation) {
      this.animateCell(path)
    }

    return path
  }

  fillAllCell(
    filter: (i: number, j: number) => boolean = () => true,
    skipAnimation: boolean = false,
  ) {
    if (!this.isBoardReady) {
      return
    }

    const [col, row] = this.dimension!

    const cells: SVGElement[] = []

    for (let j = 0; j <= row; j++) {
      for (let i = 0; i <= col; i++) {
        if (!filter(i, j)) {
          continue
        }

        const cell: Point2d = [i, j]
        const node = this.fillCell(cell, true)

        if (!node) {
          continue
        }

        cells.push(node)
      }
    }

    if (!skipAnimation) {
      animate(cells, {
        scale: [0, 1.25, 1],
        ease: 'linear',
        delay: stagger(100, {
          grid: [row, col],
          from: 'center',
        }),
      })
    }
  }

  drawFrame(skipAnimation: boolean = false) {
    if (!this.isBoardReady) {
      return
    }

    const { width, height } = this.size!

    const frame = this.roughSvg!.rectangle(
      0,
      0,
      width,
      height,
      this.gridOptions,
    )

    this.svg?.appendChild(frame)

    if (!skipAnimation) {
      this.animateLine(frame)
    }
  }

  drawGrid(skipAnimation: boolean = false) {
    if (!this.isBoardReady) {
      return
    }

    const [col, row] = this.dimension

    const { width, height } = this.size!

    for (let i = 1; i < col; i++) {
      const x = Math.round((width * i) / col)

      const line = this.roughSvg!.line(x, 0, x, height, this.gridOptions)

      this.svg?.appendChild(line)

      if (!skipAnimation) {
        this.animateLine(line, { delay: i * 44 })
      }
    }

    for (let j = 1; j < row; j++) {
      const y = Math.round((height * j) / row)
      const line = this.roughSvg!.line(0, y, width, y, this.gridOptions)

      this.svg?.appendChild(line)

      if (!skipAnimation) {
        this.animateLine(line, { delay: j * 44 })
      }
    }
  }

  animateLine(line: SVGElement, options?: Partial<AnimationParams>) {
    animate(animeSVG.createDrawable(line), {
      draw: ['0 0', '0 1'],
      ease: eases.inOutCirc,
      duration: DURATION_NORMAL,
      ...options,
    })
  }

  animateCell(node: SVGElement, options?: Partial<AnimationParams>) {
    animate(node, {
      scale: [0, 1],
      ease: eases.outElastic(1.1, 0.8),
      duration: DURATION_NORMAL,
      ...options,
    })
  }

  destroy() {
    if (this.svg) {
      this.clear(this.svg)
    }

    this.state.clear()
  }

  clear(svg: SVGSVGElement | HTMLElement) {
    while (svg.firstChild) {
      utils.remove(svg.lastChild!)
      svg.removeChild(svg.lastChild!)
    }
  }

  removeChild(child: SVGElement) {
    utils.remove(child)
    this.svg?.removeChild(child)
  }

  getIndex(cell: Point2d) {
    return cell[0] + this.dimension[0] * cell[1]
  }

  getClassName(topic: string, cell: Point2d) {
    return `${topic}-${cell[0]}-${cell[1]}`
  }

  hasDrawBefore(className: string) {
    const nodes = document.getElementsByClassName(className)

    return !!nodes.length
  }
}
