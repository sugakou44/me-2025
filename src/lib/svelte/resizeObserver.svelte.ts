interface Params {
  clientBoundingRect: DOMRect
  entry: ResizeObserverEntry
}

export function resizeObserver(
  callback: (params: Params) => void,
  options: ResizeObserverOptions = {},
) {
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    const clientBoundingRect = entry.target.getBoundingClientRect()
    callback({ clientBoundingRect, entry })
  })

  return (node: Element) => {
    resizeObserver.observe(node, options)

    return () => {
      resizeObserver.unobserve(node)
      resizeObserver.disconnect()
    }
  }
}
