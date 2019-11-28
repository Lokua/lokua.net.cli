import lcm from './programs/lcm.mjs'
import gcd from './programs/gcd.mjs'

const [program, ...args] = process.argv.slice(2)

const exec = { lcm, gcd }[program]

const result = exec(...args)

console.info(result)
