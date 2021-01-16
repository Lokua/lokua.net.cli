module.exports = {
  extends: ['lokua'],
  globals: {
    globalThis: false,
  },
  rules: {
    'no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: 'xtest|notImplemented',
      },
    ],
  },
}
