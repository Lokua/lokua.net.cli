import R from 'ramda'
import unsortedScales from './data/scales.mjs'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const joinByComma = R.join(', ')

const scales = R.compose(
  R.sortWith([
    R.descend(R.compose(R.length, R.prop('scale'))),
    R.ascend(R.prop('name')),
  ]),
  R.map(scale => ({
    ...scale,
    notes: R.map(i => notes[i], scale.scale),
  }))
)(unsortedScales)

const prettyPrint = scale =>
  R.join('\n', [
    `name: ${scale.name}`,
    `indexes: ${joinByComma(scale.scale)}`,
    `notes: ${joinByComma(scale.notes)}`,
  ])

export default program =>
  ({
    names: () => R.join('\n', R.map(R.prop('name'), scales)),
    list: () => R.join('\n\n', R.map(prettyPrint, scales)),
    scale: (root, name) => {
      const scale = R.find(R.compose(R.equals(name), R.prop('name')), scales)

      if (scale) {
        const offset = notes.indexOf(root)

        return R.set(
          R.lensProp('notes'),
          R.map(i => notes[(i + offset) % notes.length], scale.scale),
          scale
        )
      }
    },
  }[program])
