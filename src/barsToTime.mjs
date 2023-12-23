export default function barsToTime(bpm, bars) {
  // bars - 1, since DAWS and gear typically start at 1,
  // not 0 like time does
  const seconds = ((bars - 1) * 4 * 60) / bpm

  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    Math.floor(seconds % 60),
  ]
    .map((x) => String(x).padStart(2, '0'))
    .join(':')
}
