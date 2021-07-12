module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    jquery: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    window: true,
    config: true,
    gsap: true
  },
  rules: {}
}
