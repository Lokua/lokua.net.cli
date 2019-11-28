import yargs from 'yargs'
import colors from 'chalk'
import midiUtil from '@lokua/midi-util'

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
  .usage('<command> [options]')

main()

function main() {
  const { program, args } = parseYargsResult(argv.argv)

  const fn = programs.get(program)

  if (fn) {
    fn(args)
  } else {
    argv.showHelp()
  }
}

function parseYargsResult(argv) {
  const { _, $0, ...args } = argv

  return {
    program: _[0],
    args,
  }
}

async function getProgram(name) {
  return (await import(`./programs/${name}.mjs`)).default
}

function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)))
}

function prop(key) {
  return obj => obj[key]
}

// eslint-disable-next-line no-unused-vars
function notImplemented() {
  console.info(colors.red('not implemented'))
}
