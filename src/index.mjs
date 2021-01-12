import yargs from 'yargs'
import colors from 'chalk'
import midiUtil from '@lokua/midi-util'
import { compose, prop, round } from './util.mjs'

const logResult = compose(console.info, colors.green)

const programs = new Map([
  [
    'gcd',
    async ({ numbers }) => {
      const result = (await getProgram('gcd'))(...numbers)
      logResult(result)
    },
  ],
  [
    'lcm',
    async ({ numbers }) => {
      const result = (await getProgram('lcm'))(...numbers)
      logResult(result)
    },
  ],
  ['mtof', compose(logResult, midiUtil.mtof, prop('midiNote'))],
  [
    'midi-chart',
    async () => {
      const result = (await getProgram('midiChart'))()
      logResult(result.map(x => Object.values(x).join(' ')).join('\n'))
    },
  ],
  ['ftom', compose(logResult, midiUtil.ftom, prop('frequency'))],
  [
    'bpm2ms',
    async ({ bpm, round }) => {
      const result = (await getProgram('bpm2ms'))(parseFloat(bpm))
      console.info(roundBpmProgramValues(result, round))
    },
  ],
  [
    'bpm2hz',
    async ({ bpm, round }) => {
      const result = (await getProgram('bpm2hz'))(parseFloat(bpm))
      console.info(roundBpmProgramValues(result, round))
    },
  ],
  [
    'randomName',
    async () => {
      const result = (await getProgram('randomName'))()
      console.info(result)
    },
  ],
])

const argv = yargs
  .command('gcd [numbers..]', 'greatest common denominator')
  .command('lcm [numbers..]', 'greatest common denominator')
  .command('mtof <midiNote>', 'convert midi note to frequency')
  .command(
    'midi-chart',
    'display full chart of midi notes, frequencies, and milliseconds'
  )
  .command('ftom <frequency>', 'convert frequency to midi note')
  .command(
    'bpm2ms <bpm> [round]',
    'print table of note values in ms for given tempo'
  )
  .command(
    'bpm2hz <bpm> [round]',
    'print table of note values in Hz for given tempo'
  )
  .command('randomName', 'generate a random <adjective> <noun>')
  .usage('<command> [options]')

main()

function main() {
  try {
    const { program, args } = parseArgs(argv.argv)
    const fn = programs.get(program)

    if (fn) {
      fn(args)
    } else {
      argv.showHelp()
    }
  } catch (error) {
    console.error('caught', error)
  }
}

function parseArgs(argv) {
  const { _, $0, ...args } = argv

  return {
    program: _[0],
    args,
  }
}

async function getProgram(name) {
  return (await import(`./${name}.mjs`)).default
}

function notImplemented() {
  console.info(colors.red('not implemented'))
}

function roundBpmProgramValues(result, nDecimals = -1) {
  return Object.entries(result).reduce(
    (o, [k, v]) => ({
      ...o,
      [k]: Object.entries(v).reduce(
        (o, [k, v]) => ({
          ...o,
          [k]: nDecimals === -1 ? v : round(v, 2),
        }),
        {}
      ),
    }),
    {}
  )
}
