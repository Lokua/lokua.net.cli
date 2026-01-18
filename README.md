# @lokua/cli

A cli of utilities I use for creative (usually musical) purposes. This project
was made first and foremost for my own needs, but the programs provided are
pretty generic so I've made it public.

## Help

```
index.mjs [command]

Commands:
  index.mjs gcd <numbers..>                 find greatest common denominator
  index.mjs lcm <numbers..>                 find least common multiple
  index.mjs mtof <midiNote>                 convert midi note to frequency
  index.mjs ftom <frequency>                convert frequency to midi note
  index.mjs midi                            print table of midi with various con
                                            versions
  index.mjs bpm <bpm>                       print table of note values in hz and
                                             ms for a given tempo
  index.mjs randomName                      generate a random <adjective> <noun>
  index.mjs listScales                      list scales
  index.mjs scaleNames                      list scale names
  index.mjs scale <root> <name>             see scaleNames command for list of n
                                            ames
  index.mjs ringMod <f0> <f1>               view various analysis of ring modula
                                            tion
  index.mjs ar                              print note map for Analog Rytm's "to
                                            n" values
  index.mjs barsToTime <bpm> <bars>         print duration of <bars> bars for gi
                                            ven <bpm> in hh:mm:ss format
  index.mjs frameCount <framerate> <durati  calculates the number of frames need
  on> [cycles]                              ed for an animation
  index.mjs frameCountBars <framerate> <bp  calculates the number of frames need
  m> [bars]                                 ed to represent a number of bars
  index.mjs prepSample                      prepare audio sample by trimming sil
                                            ence and normalizing
  index.mjs prepSamples                     prepare all WAV files in a folder by
                                             trimming silence and normalizing

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Install

```js
npm i -g @lokua/cli
```

This will add a global `cli` command. If you don't want to use `cli` as the name
you can clone the repo and call it whatever you want under package.json "bin"
field, then run `sudo npm link` (because meh) in the project root to make it
available globally or run commands as `npm start -- <cmd> [...options]` instead.

### License MIT
