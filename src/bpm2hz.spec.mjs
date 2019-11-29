import assert from 'assert'
import bpm2hz from './bpm2hz.mjs'
import { round } from './util.mjs'
import { test, xtest } from './test.mjs'

const fixValues = o =>
  Object.entries(o).reduce(
    (o, [key, value]) => ({
      ...o,
      [key]: round(value, 2),
    }),
    {}
  )

test('bpm2hz: binary', () => {
  const binary = fixValues(bpm2hz(127).binary)

  assert.deepEqual(binary, {
    1: 0.53,
    2: 1.06,
    4: 2.12,
    8: 4.23,
    16: 8.47,
    32: 16.93,
    64: 33.87,
    128: 67.73,
  })
})
