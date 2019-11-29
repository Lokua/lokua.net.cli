export function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)))
}

export function prop(key) {
  return obj => obj[key]
}

export function last(array) {
  return array[array.length - 1]
}

export function times(n, fn = x => x) {
  return Array(n)
    .fill(null)
    .map((_, i) => fn(i))
}

export function round(n, numberOfDecimalPlaces) {
  const multiplier = Math.pow(10, numberOfDecimalPlaces)

  return Math.round(n * multiplier) / multiplier
}
