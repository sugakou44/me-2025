interface Params {
  isInView: boolean
  target: Element
  ratio: number
  entry: IntersectionObserverEntry
}

export function intersectionObserver(
  callback: (params: Params) => void,
  {
    once,
    ...options
  }: IntersectionObserverInit & {
    once?: boolean
  } = {},
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
      },
      {
        threshold: 0.0,
        ...options,
      },
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }
}
