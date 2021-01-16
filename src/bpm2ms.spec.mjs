import assert from 'assert'
import bpm2ms from './bpm2ms.mjs'
import { round2 } from './util.mjs'
import { test, xtest } from './test.mjs'

const fixValues = (o) =>
  Object.entries(o).reduce(
    (o, [key, value]) => ({
      ...o,
      [key]: round2(value),
    }),
    {},
  )

test('bpm2ms: binary', () => {
  const binary = fixValues(bpm2ms(127).binary)

  assert.deepEqual(binary, {
    1: 1889.76,
    2: 944.88,
    4: 472.44,
    8: 236.22,
    16: 118.11,
    32: 59.06,
    64: 29.53,
    128: 14.76,
  })
})

test('bpm2ms: ternary', () => {
  const ternary = fixValues(bpm2ms(127).ternary)

  assert.deepEqual(ternary, {
    1: 1259.84,
    2: 629.92,
    4: 314.96,
    8: 157.48,
    16: 78.74,
    32: 39.37,
    64: 19.69,
    128: 9.84,
  })
})

test('bpm2ms: dotted', () => {
  const dotted = fixValues(bpm2ms(127).dotted)

  assert.deepEqual(dotted, {
    1: 2834.65,
    2: 1417.32,
    4: 708.66,
    8: 354.33,
    16: 177.17,
    32: 88.58,
    64: 44.29,
    128: 22.15,
  })
})
