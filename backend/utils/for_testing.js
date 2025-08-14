const reverse = (string) => {
  if (typeof string !== 'string') return undefined

  return string.split('').reverse().join('')
}

const average = (array) => {
  if (array.length === 0) return 0

  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}
