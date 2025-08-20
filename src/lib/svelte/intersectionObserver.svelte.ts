interface Params {
  isInView: boolean
  target: Element
  ratio: number
  entry: IntersectionObserverEntry
}

interface Options extends IntersectionObserverInit {
  once?: boolean
}

export function intersectionObserver(
  callback: (params: Params) => void,
  { once, threshold = 0, ...options }: Options = {},
) {
  let hasTriggered = false

  return (node: Element) => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (hasTriggered && once) {
          return
        }

        hasTriggered = true

        callback({
          isInView: entry.isIntersecting,
          target: entry.target,
          ratio: entry.intersectionRatio,
          entry,
        })

        if (once) {
          return clear()
        }
      },
      {
        threshold,
        ...options,
      },
    )

    const clear = () => {
      observer.unobserve(node)
      observer.disconnect()
    }

    observer.observe(node)

    return () => {
      clear()
    }
  }
}

export function useInView({
  once,
  initialInView = false,
  threshold = 0,
  ...options
}: Options & {
  initialInView?: boolean
} = {}) {
  let node = $state<HTMLElement>()
  let isInView = $state(initialInView)
  let hasTriggered = false

  $effect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (hasTriggered && once) {
          return
        }

        hasTriggered = true

        isInView = entry.isIntersecting

        if (once) {
          return clear()
        }
      },
      {
        threshold,
        ...options,
      },
    )

    const clear = () => {
      if (!node) return

      observer.unobserve(node)
      observer.disconnect()
    }

    observer.observe(node)

    return () => {
      clear()
    }
  })

  return [
    {
      get current() {
        return node
      },
      set current(newNode: HTMLElement | undefined) {
        node = newNode
      },
    },
    () => isInView,
  ] as const
}
