import gcd from './gcd.mjs'

export default function lcm(...numbers) {
  return numbers.reduce((a, b) => Math.abs(a * b) / gcd(a, b))
}
