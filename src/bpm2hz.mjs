import bpm2ms from './bpm2ms.mjs'

export default function bpm2hz(bpm) {
  return Object.entries(bpm2ms(bpm)).reduce(
    (result, [key, values]) => ({
      ...result,
      [key]: Object.entries(values).reduce(
        (o, [k, v]) => ({
          ...o,
          [k]: msToHz(v),
        }),
        {},
      ),
    }),
    {},
  )
}

function msToHz(ms) {
  return 1000 / ms
}
