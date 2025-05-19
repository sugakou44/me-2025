import { processMouseEvent } from '@/lib/svelte/document.svelte'
import { BoardGame } from '@/modules/games/prototypes/BoardGame.svelte'

import type { GameOptions } from '@/modules/games/prototypes/BoardGame.svelte'
import type { BoardDimension } from '../../types'

export class Chess extends BoardGame {
  dimension: BoardDimension = [8, 8]
  computationCount: number = 0
  isEnd = $state<boolean>(false)

  constructor(options?: Partial<GameOptions>) {
    super(options)
  }

  init(svg: SVGSVGElement) {
    super.init(svg)
    this.drawGrid(true)
    this.drawFrame(true)
    this.fillCell((i, j) => (i + j * this.dimension[0]) % 2 !== j % 2)

    this.canvas?.addEventListener('click', this.handleClick)
  }

  destroy() {
    super.destroy()
    this.canvas?.removeEventListener('click', this.handleClick)
  }

  handleClick = (event: MouseEvent) => {
    if (this.isTerminated || this.isComputing) {
      return
    }

    const { percentage } = processMouseEvent(event)

    const gridPosition: Point2d = [
      Math.floor(percentage[0] * this.dimension[0]),
      Math.floor(percentage[1] * this.dimension[1]),
    ]
  }
}
