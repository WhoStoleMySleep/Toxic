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
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    // '@types/jquery',
  ],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': [
      'error', process.platform === 'win32' ? 'windows' : 'unix'
    ],
  },
};
