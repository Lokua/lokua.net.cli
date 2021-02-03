import R from 'ramda'
import notes from './data/notes.mjs'
import midiChart from './midiChart.mjs'
import { findClosest, round2 } from './util.mjs'

export default function ringMod(c, m) {
  const s1 = c + m
  const s2 = Math.abs(c - m)
  const chart = midiChart()
  const freqs = R.map(R.prop('hz'), chart)
  const find = findClosest(freqs)
  const s1Closest = chart[find(s1)]
  const s2Closest = chart[find(s2)]
  const cClosest = chart[find(c)]
  const mClosest = chart[find(m)]
  const dist = R.compose(round2, distanceInCents)

  return {
    carrier: {
      ...cClosest,
      centsDifference: dist(c, cClosest.hz),
      actual: c,
    },
    modulator: {
      ...mClosest,
      centsDifference: dist(m, mClosest.hz),
      actual: m,
    },
    sideband1: {
      ...s1Closest,
      centsDifference: dist(s1, s1Closest.hz),
      actual: s1,
    },
    sideband2: {
      ...s2Closest,
      centsDifference: dist(s2, s2Closest.hz),
      actual: s2,
    },
  }
}

// c = 1200 × log2(f1/f0)
// https://music.stackexchange.com/a/17567
function distanceInCents(f0, f1) {
  return 1200 * Math.log2(f1 / f0)
}

// eslint-disable-next-line no-unused-vars
function isNote(string) {
  return new RegExp(notes.join('|')).test(string)
}
