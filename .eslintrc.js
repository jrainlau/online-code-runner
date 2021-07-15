const _ = require('lodash');

const offRules = [
  'radix',
  'no-param-reassign',
  'operator-linebreak',
  'function-paren-newline',
  'newline-per-chained-call',
  'implicit-arrow-linebreak',
  'no-confusing-arrow',
];

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {},
  globals: {},
};
