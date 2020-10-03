module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['standard', "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  rules: {}
}
