import midiUtil from '@lokua/midi-util'
import { round, times } from './util.mjs'

// prettier-ignore
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export default function midiChart() {
  return times(128, i => {
    const hz = midiUtil.mtof(i)

    return {
      midi: i,
      note: notes[i % 12],
      hz: round(hz, 2),
      ms: round(hzToMs(hz), 3),
    }
  })
}

function hzToMs(hz) {
  return (1 / hz) * 1000
}