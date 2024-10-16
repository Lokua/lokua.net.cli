#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import R from 'ramda'
import colors from 'chalk'
import midiUtil from '@lokua/midi-util'
import { round2 } from './util.mjs'

const logResult = R.compose(console.info, R.concat(R.__, '\n'), colors.green)
const roundBpmMap = R.map((o) => R.map(round2, o))
const toListOfNumbers = (ns) =>
  ns
    .split(',')
    .filter((x) => x !== '')
    .map((x) => parseInt(x, 10))

yargs(hideBin(process.argv))
  .command(
    'gcd <numbers..>',
    'find greatest common denominator',
    R.identity,
    async ({ numbers }) => {
      const result = (await import('./gcd.mjs')).default(
        ...toListOfNumbers(numbers[0]),
      )
      logResult(result)
    },
  )
  .command(
    'lcm <numbers..>',
    'find least common multiple',
    R.identity,
    async ({ numbers }) => {
      const result = (await import('./lcm.mjs')).default(
        ...toListOfNumbers(numbers[0]),
      )
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
    'midi',
    'print table of midi with various conversions',
    R.identity,
    async () => {
      const result = (await import('./midiChart.mjs')).default()
      console.table(R.map(R.omit(['midi']), result))
    },
  )
  .command(
    'bpm <bpm>',
    'print table of note values in hz and ms for a given tempo',
    R.identity,
    async ({ bpm }) => {
      const result = (await import('./bpmChart.mjs')).default(parseFloat(bpm))
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
  .command(
    'ringMod <f0> <f1>',
    'view various analysis of ring modulation',
    R.identity,
    async ({ f0, f1 }) => {
      const result = (await import('./ringMod.mjs')).default(f0, f1)
      console.table(result)
    },
  )
  .command(
    'ar',
    'print note map for Analog Rytm\'s "ton" values',
    R.identity,
    async () => {
      const result = (await import('./ar.mjs')).default()
      console.table(result)
    },
  )
  .command(
    'barsToTime <bpm> <bars>',
    'print duration of <bars> bars for given <bpm> in hh:mm:ss format',
    R.identity,
    async ({ bpm, bars }) => {
      const result = (await import('./barsToTime.mjs')).default(bpm, bars)
      logResult(result)
    },
  )
  .command(
    'frameCount <framerate> <duration> [cycles]',
    'calculates the number of frames needed for an animation',
    {
      framerate: {
        alias: 'f',
        describe: 'Frame rate of the animation',
        type: 'number',
        demandOption: true,
      },
      duration: {
        alias: 'd',
        describe: 'Duration of the animation in seconds',
        type: 'number',
        default: 60,
      },
      cycles: {
        alias: 'c',
        describe: 'Number of cycles in the animation',
        type: 'number',
        default: 1,
      },
    },
    ({ framerate, duration = 60, cycles = 1 }) => {
      const totalFrames = framerate * duration
      const frameCount = totalFrames / cycles
      logResult(frameCount)
    },
  )
  .command(
    'frameCountBars <framerate> <bpm> [bars]',
    'calculates the number of frames needed to represent a number of bars.',
    {
      framerate: {
        alias: 'f',
        describe: 'Frame rate of the animation',
        type: 'number',
        demandOption: true,
      },
      bpm: {
        alias: 'b',
        describe: 'Beats per minute',
        type: 'number',
        demandOption: true,
      },
      bars: {
        alias: 'r',
        describe: 'Number of bars',
        type: 'number',
        default: 1,
      },
    },
    ({ framerate, bpm, bars = 1 }) => {
      const frameCount = (bars * 4 * ((framerate * 60) / bpm)).toFixed(2)
      logResult(frameCount)
    },
  )
  .recommendCommands()
  .parse()
