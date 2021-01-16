# @lokua/cli

A cli of utilities I use for creative (usually musical) purposes. This project
was made first and foremost for my own needs, but the programs provided are
pretty generic so I've made it public.

## Install

I've used node.js v14 for this. This will not work with any version of node that
doesn't support es modules.

```js
npm i -g @lokua/cli
```

This will add a global `cli` command. Don't want to use `cli` as the name? Clone
the repo and call it whatever you want under package.json "bin" field, then run
`sudo npm link in the project root. Why`sudo`? Because
https://github.com/rustwasm/wasm_game_of_life/issues/35
