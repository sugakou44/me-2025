import { utils } from 'animejs'

import { processMouseEvent } from '@/lib/svelte/document.svelte'
import { sleep } from '@/lib/utils/promise'
import {
  BoardGame,
  DEFUALT_ROUGH_OPTIONS,
} from '@/modules/games/prototypes/BoardGame.svelte'

import {
  BOMB_PATH,
  BOOM_PATH,
  COLORS,
  FLAG_PATHS,
  NUMBER_PATHS,
} from './constants'

import type { GameOptions } from '@/modules/games/prototypes/BoardGame.svelte'
import type { Options as RoughOptions } from 'roughjs/bin/core'
import type { BoardDimension } from '../../types'

export class MinesSweeper extends BoardGame {
  dimension: BoardDimension = [24, 24]
  hasStarted = $state<boolean>(false)
  isLost = $state<boolean>(false)
  isRevealed = $state<boolean>(false)
  bombCount = 99
  bombState: Map<number, boolean> = new Map()
  bombMap: Map<number, number> = new Map()
  bombLeft = $derived.by(() => {
    return (
      this.bombCount -
      Array.from(this.state.values()).reduce((acc, cell) => {
        if (cell === 'X') {
          return acc + 1
        }

        return acc
      }, 0)
    )
  })

  winner = $derived.by(() => {
    if (this.state.size < this.cellCount - this.bombCount) {
      return false
    }

    const [colCount, rowCount] = this.dimension

    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]
        const cellIndex = this.getIndex(cell)
        const cellState = this.state.get(cellIndex)
        const cellHasBomb = this.hasBomb(cell)

        if (!cellState && !cellHasBomb) {
          return false
        } else if (cellState === 'O' && cellHasBomb) {
          return false
        } else if (cellState === 'X' && !cellHasBomb) {
          return false
        }
      }
    }

    return true
  })

  gridOptions: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    roughness: 0,
    strokeWidth: 0.5,
    stroke: 'var(--color-gray-800)',
  }

  player1Options: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    roughness: 0,
    strokeWidth: 0,
    fill: 'var(--primary-foreground)',
    fillStyle: 'solid',
  }

  player2Options: RoughOptions = {
    ...DEFUALT_ROUGH_OPTIONS,
    roughness: 0,
    strokeWidth: 0,
    fill: 'var(--secondary-foreground)',
    fillStyle: 'solid',
  }

  constructor(options?: Partial<GameOptions>) {
    super(options)
  }

  get isTerminated() {
    return !!this.winner || this.isEnded || this.isLost
  }

  init(
    svg: SVGSVGElement,
    options?: {
      bombCount?: number
    },
  ) {
    super.init(svg)

    this.bombCount = Math.min(
      options?.bombCount ?? this.bombCount,
      Math.floor(this.cellCount / 2),
    )

    // this.fillCell((i, j) => (i + j * this.dimension[0]) % 2 !== j % 2)

    this.svg?.addEventListener('click', this.handleClick)
    this.svg?.addEventListener('contextmenu', this.handleClick)
  }

  reset(shouldSkipAnimation = false) {
    if (this.isComputing) {
      return
    }

    super.reset()
    this.hasStarted = false
    this.isLost = false
    this.isRevealed = false
    this.bombState.clear()
    this.bombMap.clear()
    this.drawGrid(shouldSkipAnimation)
    this.drawFrame(shouldSkipAnimation)
    this.generateBomb()
    // this.generateBombMap()
    // this.debug_revealAllCell()
  }

  destroy() {
    super.destroy()
    this.svg?.removeEventListener('click', this.handleClick)
    this.svg?.removeEventListener('contextmenu', this.handleClick)
  }

  handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (this.isTerminated || this.isComputing) {
      return
    }

    const { percentage, button } = processMouseEvent(event)

    const cell: Point2d = [
      Math.floor(percentage[0] * this.dimension[0]),
      Math.floor(percentage[1] * this.dimension[1]),
    ]

    switch (button) {
      case 0:
        if (!this.hasStarted) {
          this.hasStarted = true
          this.isComputing = true

          while (!this.isBombStateValid(cell)) {
            this.adjustBombMap(cell)
          }

          this.isComputing = false
        }

        this.revealCell(cell)
        break
      case 2:
        if (!this.hasStarted) {
          break
        }
        this.toggleFlag(cell)
        break
      default:
        break
    }
  }

  debug_revealAllCell() {
    const [colCount, rowCount] = this.dimension

    this.generateBombMap()
    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]
        if (this.hasBomb(cell)) {
          this.drawBomb(cell)
        }
        this.drawBombMap(cell)
      }
    }
  }

  drawBombMap(cell: Point2d, skipAnimation?: boolean) {
    const cellIndex = this.getIndex(cell)

    const bombId = this.bombMap.get(cellIndex)

    if (!bombId) return

    const paths = NUMBER_PATHS[(bombId % 9) + 1]
    const color = COLORS[bombId % 9]

    this.addPaths(cell, paths, {
      skipAnimation,
      ...this.player1Options,
      fill: color,
    })

    return bombId
  }

  drawNumber(cell: Point2d, skipAnimation?: boolean) {
    const bombCount = this.getAdjacentBombCount(cell)
    const className = `number-${cell[0]}-${cell[1]}`

    if (this.hasDrawBefore(className)) {
      return bombCount
    }

    if (bombCount === 0) return bombCount

    const paths = NUMBER_PATHS[bombCount]
    const color = COLORS[bombCount - 1]

    this.addPaths(cell, paths, {
      className,
      skipAnimation,
      ...this.player1Options,
      fill: color,
    })

    return bombCount
  }

  toggleFlag(cell: Point2d, value?: boolean, skipAnimation?: boolean) {
    const cellIndex = this.getIndex(cell)

    const className = this.getClassName('flag', cell)

    const currentState = this.state.get(cellIndex)

    if (currentState === 'O') {
      return
    }

    if ((currentState === 'X' && value !== true) || value === false) {
      const nodes = document.getElementsByClassName(className)

      for (const node of nodes) {
        this.removeChild(node as SVGElement)
      }

      this.state.delete(cellIndex)

      return
    }

    this.state.set(cellIndex, 'X')

    if (this.hasDrawBefore(className)) {
      return
    }

    this.addPaths(cell, FLAG_PATHS, {
      skipAnimation,
      className,
      ...this.player2Options,
    })
  }

  drawBomb(cell: Point2d, skipAnimation?: boolean) {
    const className = this.getClassName('bomb', cell)

    if (this.hasDrawBefore(className)) {
      return
    }

    this.addPaths(cell, BOMB_PATH, {
      skipAnimation,
      className,
      ...this.player1Options,
    })
  }

  drawBoom(cell: Point2d) {
    const className = this.getClassName('boom', cell)

    if (this.hasDrawBefore(className)) {
      return
    }

    this.addPaths(cell, BOOM_PATH, {
      className,
      ...this.player2Options,
    })
  }

  revealCell(cell: Point2d) {
    const cellIndex = this.getIndex(cell)
    const currentState = this.state.get(cellIndex)

    if (currentState) {
      return
    }

    if (this.hasBomb(cell)) {
      this.state.set(this.getIndex(cell), 'O')
      this.drawBoom(cell)
      this.drawBomb(cell)

      this.isLost = true

      return
    }

    const visitedCell = new Map<number, boolean>()

    const traverseSafeCell = (cell: Point2d) => {
      const cellIndex = this.getIndex(cell)

      if (visitedCell.get(cellIndex)) {
        return
      }

      this.fillCell(cell)
      const bombCount = this.drawNumber(cell)
      this.state.set(cellIndex, 'O')

      visitedCell.set(cellIndex, true)

      if (bombCount === 0) {
        this.traverseAllAdjacentCell(cell, traverseSafeCell)
      }
    }

    traverseSafeCell(cell)
  }

  async revealAllCell() {
    const [colCount, rowCount] = this.dimension

    this.isComputing = true

    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]
        const cellIndex = this.getIndex(cell)

        const currentState = this.state.get(cellIndex)

        if (currentState === 'O') {
          continue
        }

        if (this.hasBomb(cell)) {
          this.drawBomb(cell)

          continue
        }

        if (currentState === 'X') {
          continue
        }

        this.fillCell(cell, true)
        this.drawNumber(cell)
      }
      await sleep(30)
    }

    this.isComputing = false

    this.isRevealed = true
  }

  generateBomb() {
    this.bombState.clear()
    const cellCount = this.cellCount

    const bombs = new Array(this.bombCount)
      .fill(true)
      .concat(new Array(cellCount - this.bombCount).fill(false))

    utils.shuffle(bombs).forEach((hasBomb, index) => {
      if (hasBomb) {
        this.bombState.set(index, hasBomb)
      }
    })
  }

  generateBombMap() {
    this.bombMap.clear()

    const [colCount, rowCount] = this.dimension

    let pathId = 1
    let idUsed = false

    const traverseCellCallback = (cell: Point2d) => {
      const cellIndex = this.getIndex(cell)

      if (this.bombMap.get(cellIndex) || !this.hasBomb(cell)) {
        return
      }

      this.bombMap.set(cellIndex, pathId)
      idUsed = true

      this.traverseAdjacentCell(cell, traverseCellCallback)
    }

    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]

        const cellIndex = this.getIndex(cell)

        if (this.bombMap.get(cellIndex)) {
          continue
        }

        if (!this.hasBomb(cell)) {
          if (idUsed) {
            pathId++
            idUsed = false
          }

          continue
        }

        traverseCellCallback(cell)
        this.traverseAdjacentCell(cell, traverseCellCallback)
      }
    }
  }

  isBombStateValid(firstCell: Point2d) {
    const [colCount, rowCount] = this.dimension

    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]
        const bombCount = this.getAdjacentBombCount(cell)

        if (bombCount >= 8 && this.hasBomb(cell)) {
          return false
        }
      }
    }

    let firstCellEmpty = true
    this.traverseAllAdjacentCell(firstCell, (cell) => {
      if (this.hasBomb(cell)) {
        firstCellEmpty = false
      }

      if (this.getAdjacentBombCount(cell) !== 0) {
        firstCellEmpty = false
      }
    })
    return firstCellEmpty
  }

  adjustBombMap(firstCell: Point2d) {
    const [colCount, rowCount] = this.dimension

    for (let j = 0; j < rowCount; j++) {
      for (let i = 0; i < colCount; i++) {
        const cell: Point2d = [i, j]
        const bombCount = this.getAdjacentBombCount(cell)

        if (bombCount >= 8 && this.hasBomb(cell)) {
          this.randomlyMoveBomb(cell)
        }
      }
    }

    this.traverseAllAdjacentCell(firstCell, (cell) => {
      if (this.hasBomb(cell)) {
        this.randomlyMoveBomb(cell)

        return
      }

      if (this.getAdjacentBombCount(cell) !== 0) {
        this.traverseAllAdjacentCell(cell, (cell) => {
          if (this.hasBomb(cell)) {
            this.randomlyMoveBomb(cell)
          }
        })

        return
      }
    })

    return true
  }

  randomlyMoveBomb(from: Point2d) {
    let pass = false

    while (!pass) {
      const newCell: Point2d = [
        utils.random(0, this.dimension[0]),
        utils.random(0, this.dimension[1]),
      ]
      pass = this.moveBomb(from, newCell)
    }
  }

  moveBomb(from: Point2d, to: Point2d) {
    if (!this.hasBomb(from) || this.hasBomb(to)) {
      return false
    }

    this.bombState.delete(this.getIndex(from))
    this.bombState.set(this.getIndex(to), true)

    return true
  }

  getCellTransform(cell: Point2d) {
    const [cellWidth, cellHeight] = this.cellSize

    return `translateX(${cellWidth * cell[0]}px) translateY(${cellHeight * cell[1]}px) scale(${cellWidth / 24})`
  }

  hasBomb(cell: Point2d) {
    const index = utils.clamp(this.getIndex(cell), 0, this.cellCount)

    return !!this.bombState.get(index)
  }

  getAdjacentBombCount(cell: Point2d) {
    let adjacentBombCount = 0

    this.traverseAllAdjacentCell(cell, (cell) => {
      if (this.hasBomb(cell)) {
        adjacentBombCount++
      }
    })

    return adjacentBombCount
  }

  traverseAllAdjacentCell(cell: Point2d, callback: (cell: Point2d) => unknown) {
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        if (i === 0 && j === 0) {
          continue
        }

        const x = utils.clamp(cell[0] + i, 0, this.dimension[0] - 1)
        const y = utils.clamp(cell[1] + j, 0, this.dimension[1] - 1)

        if (x !== cell[0] + i || y !== cell[1] + j) {
          continue
        }

        callback([x, y])
      }
    }
  }

  traverseAdjacentCell(cell: Point2d, callback: (cell: Point2d) => unknown) {
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        if (Math.abs(i) === Math.abs(j)) {
          continue
        }

        const x = utils.clamp(cell[0] + i, 0, this.dimension[0] - 1)
        const y = utils.clamp(cell[1] + j, 0, this.dimension[1] - 1)

        if (x !== cell[0] + i || y !== cell[1] + j) {
          continue
        }

        callback([x, y])
      }
    }
  }

  addPaths(
    cell: Point2d,
    paths: string[],
    options: RoughOptions & {
      className?: string
      skipAnimation?: boolean
    } = {},
  ) {
    const transform = this.getCellTransform(cell)

    paths.forEach((path) => {
      const roughPath = this.roughSvg!.path(path, options)

      this.svg?.appendChild(roughPath)
      roughPath.style.transform = transform

      if (options.className) {
        roughPath.classList.toggle(options.className, true)
      }
      roughPath.classList.toggle('transform-fill', true)

      if (!options.skipAnimation) {
        this.animateCell(roughPath, {
          scale: [0, this.cellSize[0] / 24],
        })
      }
    })
  }
}
