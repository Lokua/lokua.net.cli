module.exports = {
  extends: ['lokua'],
  rules: {
    'no-unused-vars': [
      1,
      { ignoreRestSiblings: true, varsIgnorePattern: 'xtest|notImplemented' },
    ],
  },
}
