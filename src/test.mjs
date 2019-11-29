import colors from 'chalk'

export function test(name, fn) {
  try {
    fn()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

export function xtest(name) {
  console.info(colors.yellow(`${name} skipped`))
}
