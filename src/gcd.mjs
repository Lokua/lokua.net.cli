export default function gcd(...numbers) {
  return numbers.reduce((a, b) => (b === 0 ? a : gcd(b, a % b)))
}
