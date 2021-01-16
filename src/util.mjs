import R from 'ramda'

export const round = R.curryN(2, (numberOfDecimalPlaces, n) => {
  const multiplier = Math.pow(10, numberOfDecimalPlaces)
  return Math.round(n * multiplier) / multiplier
})

export const round2 = round(2)
export const round3 = round(3)

export function capitalize(word = '') {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const titleCase = R.compose(
  R.join(' '),
  R.map(R.compose(capitalize, R.trim)),
  R.split(/\s+/),
)

export const rotate = (n, array) => [
  ...array.slice(array.length - n),
  ...array.slice(0, array.length - n),
]

export const findClosest = R.curryN(2, (numbers, number) => {
  const lastIndex = numbers.length - 1
  let foundIndex = -1

  for (const [index, value] of numbers.entries()) {
    if (number === value || number < value || index === lastIndex) {
      foundIndex = index
      break
    }
    if (number > value) {
      const nextIndex = index + 1
      const nextNumber = numbers[nextIndex]
      if (number < nextNumber) {
        const thisDiff = number - value
        const thatDiff = nextNumber - number
        foundIndex = thisDiff < thatDiff ? index : nextIndex
        break
      }
    }
  }

  return foundIndex
})

// https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj),
  ),
)
