const supportedFormats = ['em', 'rem', 'px', '%']

export function add(...args) {
  const finalFormat = getFormat(args)
  const numResult = args.reduce((a, b) => (
    a + extractNumericVal(b)
  ), 0)
  return numResult + finalFormat
}

export function substract(...args) {
  const finalFormat = getFormat(args)
  const numResult = args.reduce((a, b) => (
    a - extractNumericVal(b)
  ), 0)
  return numResult + finalFormat
}

export function multiply(...args) {
  const finalFormat = getFormat(args)
  const numResult = args.reduce((a, b) => {
    const numB = extractNumericVal(b)

    if (a === null) {
      return numB
    }

    return a * numB
  }, null)
  return numResult + finalFormat
}

export function devide(...args) {
  const finalFormat = getFormat(args)
  const numResult = args.reduce((a, b) => {
    a * extractNumericVal(b)
  }, 0)
  return numResult + finalFormat
}

function extractNumericVal(val, format) {
  const formatIndex = val.indexOf(format)
  const numString = val.slice(0, formatIndex - 2)
  return Number(numString)
}

function getFormat(vals) {
  const finalFormat =  vals.reduce((format, val) => {
    const currFormat = supportedFormats.reduce((format, suppFormat) =>
      val.indexOf(suppFormat) === -1 ? format : suppFormat
    , '')

    if (format && currFormat !== format) {
      throw Error(`All values need to be the same format, got ${currFormat} & ${format}}`)
    }

    return currFormat
  }, '')

  if(!finalFormat) {
    console.warning('No need for using the style helper when the value has no format, use regular numbers instead.')
  }

  return finalFormat
}
