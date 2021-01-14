import midiUtil from '@lokua/midi-util'
import { round } from './util.mjs'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export default function midiChart() {
  return times(i => {
    const hz = midiUtil.mtof(i)

    return {
      midi: i,
      note: notes[i % 12],
      hz: round(hz, 2),
      ms: round(hzToMs(hz), 3),
    }
  }, 128)
}

function hzToMs(hz) {
  return (1 / hz) * 1000
}
