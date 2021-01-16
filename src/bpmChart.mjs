import { renameKeys } from './util.mjs'
import bpm2hz from './bpm2hz.mjs'
import bpm2ms from './bpm2ms.mjs'

export default function bpmChart(bpm) {
  const bpmMs = bpm2ms(bpm)
  const bpmHz = bpm2hz(bpm)

  return {
    ...renameKeys(
      {
        binary: 'binary ms',
        ternary: 'ternary ms',
        dotted: 'dotted ms',
      },
      bpmMs,
    ),
    ...renameKeys(
      {
        binary: 'binary hz',
        ternary: 'ternary hz',
        dotted: 'dotted hz',
      },
      bpmHz,
    ),
  }
}
