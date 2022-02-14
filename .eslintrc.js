module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    '@types/jquery',
  ],
  rules: {
    'prettier/prettier': 'error',
    'prettier/plugin-pug': "error',
  },
};
