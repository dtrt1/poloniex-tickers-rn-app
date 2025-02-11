module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'import/order': 'off',
    'sort-imports': 'off',
    'import/no-unresolved': 0,
    'no-unused-vars': 'warn',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: 'function' },
      { blankLine: 'always', prev: 'import', next: 'block' },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    curly: 'off',
  },
};
