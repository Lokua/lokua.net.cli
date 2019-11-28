import yargs from 'yargs'
import colors from 'chalk'

const programs = new Map([
  [
    'gcd',
    async ({ numbers }) => {
      const result = (await getProgram('gcd'))(...numbers)
      console.info(colors.green(result))
    },
  ],
  [
    'lcm',
    async ({ numbers }) => {
      const result = (await getProgram('lcm'))(...numbers)
      console.info(colors.green(result))
    },
  ],
  ['mtof', notImplemented],
  ['ftom', notImplemented],
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

function notImplemented() {
  console.info(colors.red('not implemented'))
}
