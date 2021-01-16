import R from 'ramda'
import midiUtil from '@lokua/midi-util'
import { round2, round3 } from './util.mjs'
import notes from './data/notes.mjs'

export default function midiChart() {
  return R.map(convert, R.times(R.identity, 128))
}

function convert(midiNote) {
  const hz = midiUtil.mtof(midiNote)
  const note = notes[midiNote % 12]

  return {
    midi: midiNote,
    note,
    // TODO: validate me
    octave: Math.floor(midiNote / 12) - 2,
    hz: round2(hz),
    ms: round3(hzToMs(hz)),
  }
}

function hzToMs(hz) {
  return (1 / hz) * 1000
}
