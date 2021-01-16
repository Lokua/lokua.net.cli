import assert from 'assert'
import { test } from './test.mjs'
import { findClosest } from './util.mjs'

test('findClosest', () => {
  const array = [0, 1, 2, 3]
  assert.strictEqual(findClosest(array, 1.33), 1)
  assert.strictEqual(findClosest(array, 3), 3)
  assert.strictEqual(findClosest(array, 3), 3)
  assert.strictEqual(findClosest(array, 2.5), 3)
  assert.strictEqual(findClosest(array, 2.49), 2)
})
