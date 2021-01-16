#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import R from 'ramda'
import colors from 'chalk'
import midiUtil from '@lokua/midi-util'
import { round } from './util.mjs'

const logResult = R.compose(console.info, colors.green)
const roundBpmMap = R.map((o) => R.map((v) => round(v, 2), o))

yargs(hideBin(process.argv))
  .command(
    'gcd [numbers..]',
    'find greatest common denominator',
    R.identity,
    async ({ numbers }) => {
      const result = (await import('./gcd.mjs')).default(...numbers)
      logResult(result)
    },
  )
  .command(
    'lcm [numbers..]',
    'find least common multiple',
    R.identity,
    async ({ numbers }) => {
      const result = (await import('./lcm.mjs')).default(...numbers)
      logResult(result)
    },
  )
  .command(
    'mtof <midiNote>',
    'convert midi note to frequency',
    R.identity,
    R.compose(logResult, midiUtil.mtof, R.prop('midiNote')),
  )
  .command(
    'ftom <frequency>',
    'convert frequency to midi note',
    R.identity,
    R.compose(logResult, midiUtil.ftom, R.prop('frequency')),
  )
  .command(
    'midiChart',
    'print table of midi with various conversions',
    R.identity,
    async () => {
      const result = (await import('./midiChart.mjs')).default()
      console.table(R.map(R.omit(['midi']), result))
    },
  )
  .command(
    'bpm2ms <bpm>',
    'print table of note values in ms for given tempo',
    R.identity,
    async ({ bpm }) => {
      const result = (await import('./bpm2ms.mjs')).default(parseFloat(bpm))
      console.table(roundBpmMap(result))
    },
  )
  .command(
    'bpm2hz <bpm>',
    'print table of note values in Hz for given tempo',
    R.identity,
    async ({ bpm }) => {
      const result = (await import('./bpm2hz.mjs')).default(parseFloat(bpm))
      console.table(roundBpmMap(result))
    },
  )
  .command(
    'randomName',
    'generate a random <adjective> <noun>',
    R.identity,
    async () => {
      const result = (await import('./randomName.mjs')).default()
      logResult(result)
    },
  )
  .command('listScales', 'list scales', R.identity, async () => {
    const result = (await import('./scales.mjs')).list()
    logResult(result)
  })
  .command('scaleNames', 'list scale names', R.identity, async () => {
    const result = (await import('./scales.mjs')).names()
    logResult(result)
  })
  .command(
    'scale <root> <name>',
    'see scaleNames command for list of names',
    R.identity,
    async ({ root, name }) => {
      const scale = (await import('./scales.mjs')).scale(root, name)
      logResult(scale.name)
      console.table(
        scale.scale.map((degree, index) => ({
          degree,
          note: scale.notes[index],
        })),
      )
    },
  )
  .parse()
