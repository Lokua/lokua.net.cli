import R from 'ramda'
import midiUtil from '@lokua/midi-util'
import { round } from './util.mjs'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

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
    hz: round(hz, 2),
    ms: round(hzToMs(hz), 3),
  }
}

function hzToMs(hz) {
  return (1 / hz) * 1000
}
