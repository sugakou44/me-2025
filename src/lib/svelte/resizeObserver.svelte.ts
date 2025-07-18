interface Params {
  clientBoundingRect: DOMRect
  entry: ResizeObserverEntry
}

export function resizeObserver(
  callback: (params: Params) => void,
  options: ResizeObserverOptions = {},
) {
  return (node: Element) => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      const clientBoundingRect = entry.target.getBoundingClientRect()
      callback({ clientBoundingRect, entry })
    })

    resizeObserver.observe(node, options)

    return () => {
      resizeObserver.unobserve(node)
      resizeObserver.disconnect()
    }
  }
}
