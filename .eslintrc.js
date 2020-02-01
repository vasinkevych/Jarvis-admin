module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['koa', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  plugins: ['mocha', 'react'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'no-console': 'error'
  },
  env: {
    mocha: true,
    es6: true,
    browser: true
  }
};
