export default function bpm2ms(bpm) {
  const notes = [1, 2, 4, 8, 16, 32, 64, 128]

  const makeNext = (object, bpm, multiplier, note) => ({
    ...object,
    [note]: noteValueToMs(bpm, multiplier, note),
  })

  return notes.reduce(
    ({ binary, ternary, dotted }, note) => ({
      binary: makeNext(binary, bpm, 1, note),
      ternary: makeNext(ternary, bpm, 2 / 3, note),
      dotted: makeNext(dotted, bpm, 1.5, note),
    }),
    {
      binary: {},
      ternary: {},
      dotted: {},
    },
  )
}

export function noteValueToMs(bpm, multiplier, noteValue) {
  const bar = (60000 * 4) / bpm
  return (bar * multiplier) / noteValue
}
