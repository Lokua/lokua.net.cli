import randomInt from 'random-int'

import adjectives from './data/adjectives.mjs'
import nouns from './data/nouns.mjs'
import { titleCase } from './util.mjs'

export default function randomName() {
  const adjective = adjectives[randomInt(adjectives.length)]
  const noun = nouns[randomInt(nouns.length)]

  return titleCase(`${adjective} ${noun}`)
}
