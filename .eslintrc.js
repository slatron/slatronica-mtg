module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended'
    // Uncomment next line to lint harder
    // ,'@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/camelcase': 'off',
    'vue/no-v-html': 'off',
    'no-tabs': 'off',
    'camelcase': 'off',
    'no-return-assign': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
