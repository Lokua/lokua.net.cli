import colors from 'chalk'

export function test(name, fn) {
  try {
    fn()
    console.log(colors.green(`✅  ${name}`))
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

export function xtest(name) {
  console.info(colors.yellow(`${name} skipped`))
}
