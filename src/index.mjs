import yargs from 'yargs'
import colors from 'chalk'
import midiUtil from '@lokua/midi-util'
import { round } from './util.mjs'

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
  ['ftom', compose(logResult, midiUtil.ftom, prop('frequency'))],
  [
    'bpm2ms',
    async ({ bpm }) => {
      const result = (await getProgram('bpm2ms'))(parseFloat(bpm))
      console.info(roundBpmProgramValues(result))
    },
  ],
  [
    'bpm2hz',
    async ({ bpm }) => {
      const result = (await getProgram('bpm2hz'))(parseFloat(bpm))
      console.info(roundBpmProgramValues(result))
    },
  ],
])

const argv = yargs
  .command('gcd [numbers..]', 'greatest common denominator')
  .help()
  .command('lcm [numbers..]', 'greatest common denominator')
  .help()
  .command('mtof <midiNote>', 'convert midi note to frequency')
  .help()
  .command('ftom <frequency>', 'convert frequency to midi note')
  .help()
  .command(
    'bpm2ms <bpm> [round]',
    'print table of note values in ms for given tempo'
  )
  .help()
  .command(
    'bpm2hz <bpm> [round]',
    'print table of note values in Hz for given tempo'
  )
  .help()
  .usage('<command> [options]')

main()

function main() {
  const { program, args } = parseArgs(argv.argv)

  const fn = programs.get(program)

  if (fn) {
    fn(args)
  } else {
    argv.showHelp()
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

function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)))
}

function prop(key) {
  return obj => obj[key]
}

function notImplemented() {
  console.info(colors.red('not implemented'))
}

function roundBpmProgramValues(result) {
  return Object.entries(result).reduce(
    (o, [k, v]) => ({
      ...o,
      [k]: Object.entries(v).reduce(
        (o, [k, v]) => ({ ...o, [k]: round(v, 2) }),
        {}
      ),
    }),
    {}
  )
}
