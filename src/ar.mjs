import notes from './data/notes.mjs'

export default function ar() {
  return new Array(49)
    .fill(0)
    .map((_, n) => n - 24)
    .reduce(
      (acc, n) =>
        acc.concat({
          value: n,
          note: notes[(notes.length + (n % 12)) % 12],
        }),
      [],
    )
}
