module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019
  },
  extends: ['koa', 'plugin:prettier/recommended'],
  plugins: ['mocha'],
  // settings: {},
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }]
  },
  env: {
    mocha: true,
    es6: true,
    browser: true
  }
};
