import R from 'ramda'
import midiUtil from '@lokua/midi-util'
import { round } from './util.mjs'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export default function midiChart() {
  return R.map(i => {
    const hz = midiUtil.mtof(i)

    return {
      midi: i,
      note: notes[i % 12],
      hz: round(hz, 2),
      ms: round(hzToMs(hz), 3),
    }
  }, R.times(R.identity, 128))
}

function hzToMs(hz) {
  return (1 / hz) * 1000
}
