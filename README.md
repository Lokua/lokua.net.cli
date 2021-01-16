# @lokua/cli

A cli of utilities I use for creative (usually musical) purposes. This project
was made first and foremost for my own needs, but the programs provided are
pretty generic so I've made it public.

## Help

```sh
cli [command]

Commands:
  cli gcd [numbers..]      find greatest common denominator
  cli lcm [numbers..]      find least common multiple
  cli mtof <midiNote>      convert midi note to frequency
  cli ftom <frequency>     convert frequency to midi note
  cli midiChart            print table of midi with various conversions
  cli bpm2ms <bpm>         print table of note values in ms for given tempo
  cli bpm2hz <bpm>         print table of note values in Hz for given tempo
  cli randomName           generate a random <adjective> <noun>
  cli listScales           list scales
  cli scaleNames           list scale names
  cli scale <root> <name>  see scaleNames command for list of names

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Install

I've used node.js v14 for this. This will not work with any version of node that
doesn't support es modules.

```js
npm i -g @lokua/cli
```

This will add a global `cli` command. If you don't want to use `cli` as the name
you can clone the repo and call it whatever you want under package.json "bin"
field, then run `sudo npm link` (because meh) in the project root to make it
available globally or run commands as `npm start <cmd> [...options]` instead.
