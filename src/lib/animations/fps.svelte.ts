interface Options {
  historyLength?: number
}

export function fps(shouldRun = true, { historyLength = 10 }: Options = {}) {
  let prevTimestamp: number | null = null
  const fpsHistory = $state<number[]>([])
  let currentFPS = $state(0)

  $effect(() => {
    if (!shouldRun) {
      return
    }

    let isRunning = true

    const onFrame = (timestamp: number) => {
      if (!isRunning) return

      if (prevTimestamp === null) {
        prevTimestamp = timestamp

        requestAnimationFrame(onFrame)

        return
      }

      const delta = timestamp - prevTimestamp
      currentFPS = Math.floor(1000 / delta)
      fpsHistory.push(currentFPS)
      if (fpsHistory.length > historyLength) {
        fpsHistory.shift()
      }

      prevTimestamp = timestamp

      requestAnimationFrame(onFrame)
    }

    requestAnimationFrame(onFrame)

    return () => {
      isRunning = false
    }
  })

  return () => {
    // average fps
    if (fpsHistory.length === 0) {
      return currentFPS
    }

    return Math.round(
      fpsHistory.reduce((acc, cur) => {
        return cur + acc
      }, 0) / fpsHistory.length,
    )
  }
}
