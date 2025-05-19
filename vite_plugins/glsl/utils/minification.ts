export function minifyShader(shader: string, newLine = false): string {
  return shader
    .replace(
      /\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g,
      '',
    )
    .split(/\n+/)
    .reduce((result, line) => {
      line = line.trim().replace(/\s{2,}|\t/, ' ')

      if (/@(vertex|fragment|compute)/.test(line) || line.endsWith('return'))
        line += ' '

      if (line[0] === '#') {
        if (newLine) result.push('\n')
        result.push(line, '\n')
        newLine = false
      } else {
        if (
          !line.startsWith('{') &&
          result.length &&
          result[result.length - 1].endsWith('else')
        ) {
          result.push(' ')
        }
        result.push(
          line.replace(
            /\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|-|!|;)\s*/g,
            '$1',
          ),
        )
        newLine = true
      }

      return result
    }, [] as string[])
    .join('')
    .replace(/\n+/g, '\n')
}

export function removeSourceComments(
  source: string,
  includePattern: RegExp,
  triple = false,
): string {
  if (source.includes('/*') && source.includes('*/')) {
    source =
      source.slice(0, source.indexOf('/*')) +
      source.slice(source.indexOf('*/') + 2, source.length)
  }

  const lines = source.split('\n')

  for (let l = lines.length; l--; ) {
    const index = lines[l].indexOf('//')

    if (index > -1) {
      if (
        lines[l][index + 2] === '/' &&
        !includePattern.test(lines[l]) &&
        !triple
      )
        continue
      lines[l] = lines[l].slice(0, lines[l].indexOf('//'))
    }
  }

  return lines.join('\n')
}
