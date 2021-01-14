import R from 'ramda'

export function round(n, numberOfDecimalPlaces) {
  const multiplier = Math.pow(10, numberOfDecimalPlaces)
  return Math.round(n * multiplier) / multiplier
}

export function capitalize(word = '') {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const titleCase = R.compose(
  R.join(' '),
  R.map(R.compose(R.capitalize, R.trim)),
  R.split(/\s+/)
)

export const rotate = (n, array) => [
  ...array.slice(array.length - n),
  ...array.slice(0, array.length - n),
]
