const [fn, ...numbers] = process.argv.slice(2)

const result = { gcd, lcm }[fn](...numbers)

console.log(result)

function gcd(...numbers) {
  return numbers.reduce((a, b) => b === 0 ? a : gcd(b, a % b));
}

function lcm(...numbers) {
  return numbers.reduce((a, b) => Math.abs(a * b) / gcd(a, b));
}