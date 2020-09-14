require('@rushstack/eslint-config/patch/modern-module-resolution')

// todo: when https://github.com/eslint/rfcs/pull/9 is implemented, none of this nonsense will be necessary. plugins/configs can be loaded as objects then. but it's kinda far off I guess
const ModuleResolver = require('eslint/lib/shared/relative-module-resolver')
if (!ModuleResolver.originalResolve) {
  ModuleResolver.originalResolve = ModuleResolver.resolve
  ModuleResolver.resolve = (req, relTo) => {
    try {
      return ModuleResolver.originalResolve(req, relTo)
    } catch (e) {
      if (module.exports.plugins.includes(req.replace('eslint-plugin-', ''))) {
        return require.resolve(req)
      }
      throw e
    }
  }
}

module.exports = {
  extends: ['@rushstack/eslint-config'],
  plugins: ['codegen', 'prettier'],
  ignorePatterns: [
    'dist',
    'node_modules',
    'coverage',
    '!.github', // https://github.com/eslint/eslint/issues/8429#issuecomment-355967308
  ],
  parserOptions: {
    // project: './tsconfig.eslint.json', // https://github.com/typescript-eslint/typescript-eslint/issues/967#issuecomment-530907956
    ecmaVersion: 2018,
    sourceType: 'module',
    extraFileExtensions: ['.md', '.yml'],
  },
  // parserOptions: { tsconfigRootDir: __dirname }
  rules: {
    'prettier/prettier': ['warn', require('./.prettierrc')],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/typedef': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      parserOptions: {sourceType: 'script'},
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.md'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
}
