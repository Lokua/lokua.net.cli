import R from 'ramda'
import notes from './data/notes.mjs'

export default function ar() {
  return new Map(
    R.map(
      (n) => [n, notes[(notes.length + (n % 12)) % 12]],
      R.times((n) => n - 24, 49),
    ),
  )
}
