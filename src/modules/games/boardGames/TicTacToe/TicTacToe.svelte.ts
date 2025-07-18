import { processMouseEvent } from '@/lib/svelte/document.svelte'
import { getSlope, linearExtrapolation } from '@/lib/utils/math'
import { BoardGame } from '@/modules/games/prototypes/BoardGame.svelte'

import { getNotation } from './utils'

import type {
  GameOptions,
  State,
} from '@/modules/games/prototypes/BoardGame.svelte'

interface ComputationState {
  state: Map<number, State>
  history: string[]
}

type ComputationReturn = [number | null, ComputationState]

export class TicTacToe extends BoardGame {
  currentPlayer: Exclude<State, null> = $derived(
    this.history.length % 2 === 0 ? 'O' : 'X',
  )

  constructor(options?: Partial<GameOptions>) {
    super(options)
  }

  init(svg: SVGSVGElement) {
    super.init(svg)
    this.svg?.addEventListener('click', this.handleClick)

    this.drawGrid()
  }

  reset() {
    if (this.isComputing) {
      return
    }

    super.reset()
  }

  destroy() {
    super.destroy()
    this.svg?.removeEventListener('click', this.handleClick)
  }

  handleClick = (event: MouseEvent) => {
    if (this.isTerminated || this.isComputing) {
      return
    }

    const { percentage } = processMouseEvent(event)

    const cellPosition: Point2d = [
      Math.floor(percentage[0] * this.dimension[0]),
      Math.floor(percentage[1] * this.dimension[1]),
    ]
    this.move(cellPosition)
  }

  move(cellPosition: Point2d) {
    const [gridWidth, gridHeight] = this.cellSize
    const [halfWidth, halfHeight] = [
      Math.round(gridWidth / 2),
      Math.round(gridHeight / 2),
    ]
    const center: Point2d = [
      cellPosition[0] * gridWidth + halfWidth,
      cellPosition[1] * gridHeight + halfHeight,
    ]

    const statePosition = cellPosition[0] + this.dimension[0] * cellPosition[1]

    const currentPlayer = this.currentPlayer

    if (this.state.get(statePosition)) {
      return
    }

    if (currentPlayer === 'X') {
      this.drawX(center)
    } else {
      this.drawO(center)
    }

    this.history.push(getNotation(currentPlayer, cellPosition, this.dimension))
    this.state.set(statePosition, currentPlayer)

    const winningPositions = this.checkWinner(this.state)

    if (winningPositions) {
      this.winner = this.state.get(winningPositions[0])!
      this.drawWinner(winningPositions)

      return
    }

    if (this.cellCount === this.state.size) {
      this.isEnded = true
      return
    }

    this.computerMove()
    return
  }

  drawWinner(winner: number[]) {
    const [gridWidth, gridHeight] = this.cellSize
    const [halfWidth, halfHeight] = [
      Math.round(gridWidth / 2),
      Math.round(gridHeight / 2),
    ]

    const centers = winner.map((statePoint) => {
      const cellPosition: Point2d = [
        statePoint % this.dimension[0],
        Math.floor(statePoint / this.dimension[1]),
      ]

      const center: Point2d = [
        cellPosition[0] * gridWidth + halfWidth,
        cellPosition[1] * gridHeight + halfHeight,
      ]

      return center
    })

    const centerFirst = centers[0]
    const centerLast = centers.at(-1)!
    const slope = getSlope(centerFirst, centerLast)
    const xOffset =
      slope !== null
        ? slope < 0
          ? [halfWidth, -halfWidth]
          : [-halfWidth, halfWidth]
        : [0, 0]

    centerFirst[1] = linearExtrapolation(
      slope === null ? halfWidth : xOffset[0],
      centerLast,
      centerFirst,
    )
    centerFirst[0] = centerFirst[0] + xOffset[0]
    centerLast[1] = linearExtrapolation(
      slope === null ? halfWidth : xOffset[1],
      centerFirst,
      centerLast,
    )
    centerLast[0] = centerLast[0] + xOffset[1]

    const line2 = this.roughSvg!.line(
      centerFirst[0],
      centerFirst[1],
      centerLast[0],
      centerLast[1],
      this.winner === 'O' ? this.player1Options : this.player2Options,
    )
    this.svg?.appendChild(line2)
    this.animateLine(line2)
  }

  drawX(center: Point2d) {
    if (!this.isBoardReady) {
      return
    }

    const [centerX, centerY] = center
    const [gridWidth, gridHeight] = this.cellSize
    const [halfWidth, halfHeight] = [
      Math.round(gridWidth / 4),
      Math.round(gridHeight / 4),
    ]

    const line1 = this.roughSvg!.line(
      centerX - halfWidth,
      centerY - halfHeight,
      centerX + halfWidth,
      centerY + halfHeight,
      this.player2Options,
    )
    this.svg?.appendChild(line1)
    this.animateLine(line1)

    const line2 = this.roughSvg!.line(
      centerX - halfWidth,
      centerY + halfHeight,
      centerX + halfWidth,
      centerY - halfHeight,
      this.player2Options,
    )
    this.svg?.appendChild(line2)
    this.animateLine(line2)
  }

  drawO(center: Point2d) {
    if (!this.isBoardReady) {
      return
    }

    const [centerX, centerY] = center
    const [gridWidth, gridHeight] = this.cellSize
    const [halfWidth, halfHeight] = [
      Math.round(gridWidth / 2),
      Math.round(gridHeight / 2),
    ]

    const circle = this.roughSvg!.ellipse(
      centerX,
      centerY,
      halfWidth,
      halfHeight,
      this.player1Options,
    )
    this.svg?.appendChild(circle)
    this.animateLine(circle)
  }

  checkWinner(state: typeof this.state): number[] | null {
    const [colCount, rowCount] = this.dimension

    const diagonalCount = Math.min(colCount, rowCount)

    const diagonalRT: number[] = []
    const diagonalRB: number[] = []

    function pushState(array: number[], position: number) {
      if (!state.get(position)) {
        return
      }

      array.push(position)
    }

    for (let j = 0; j < rowCount; j++) {
      const col: number[] = []
      const row: number[] = []

      for (let i = 0; i < colCount; i++) {
        pushState(row, this.getIndex([i, j]))
        pushState(col, j + rowCount * i)
        if (i === j) {
          pushState(diagonalRT, this.getIndex([i, j]))
        }
        if (i === rowCount - 1 - j) {
          pushState(diagonalRB, this.getIndex([i, j]))
        }
      }

      if (
        col.length === colCount &&
        col.every((xo) => this.state.get(xo) === this.state.get(col[0]))
      ) {
        return col
      }
      if (
        row.length === rowCount &&
        row.every((xo) => this.state.get(xo) === this.state.get(row[0]))
      ) {
        return row
      }
      if (
        diagonalRT.length === diagonalCount &&
        diagonalRT.every(
          (xo) => this.state.get(xo) === this.state.get(diagonalRT[0]),
        )
      ) {
        return diagonalRT
      }
      if (
        diagonalRB.length === diagonalCount &&
        diagonalRB.every(
          (xo) => this.state.get(xo) === this.state.get(diagonalRB[0]),
        )
      ) {
        return diagonalRB
      }
    }

    return null
  }

  evaluate(state: typeof this.state): number {
    const winner = this.checkWinner(state)

    if (winner) {
      return this.state.get(winner[0]) === 'O' ? 1 : 0
    }

    return 0.5
  }

  computeMove(state: ComputationState, depth: number = 0): ComputationReturn {
    const maxDepth = this.computationDepth

    if (depth === maxDepth) {
      return [null, state]
    }

    const evaluation = this.evaluate(state.state)

    if (evaluation === 0 || evaluation === 1) {
      return [evaluation, state]
    }

    return [null, state]
  }

  async computerMove() {
    if (!this.isBoardReady) {
      return
    }

    this.isComputing = true

    // const nextMove = this.computeMove({
    //   state: this.state.slice(),
    //   history: this.history.slice(),
    // })

    // const currentHistoryIndex = this.history.length
    // const nextMoveNotation = nextMove[1].history[currentHistoryIndex]

    // // this.move([1, 1])
    // console.log(nextMoveNotation, nextMove, this.computationCount)

    this.isComputing = false
  }
}
