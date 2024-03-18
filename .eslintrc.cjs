module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
        project: ['tsconfig.node.json']
      }
    },
    {
      files: ['./**/*.ts'],
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.app.json']
      }
    },
    {
      parser: 'vue-typescript-parser',
      files: ['./src/**/*.vue'],
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.app.json']
      }
    },
    {
      files: ['./mock/**/*', './*', './src/**/__tests__/*'],
      parserOptions: {
        sourceType: 'module',
        project: ['tsconfig.node.json']
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
