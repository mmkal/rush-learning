require('@rushstack/eslint-config/patch/modern-module-resolution')
var pkg = require('./package.json')
var dependencies = Object.keys(pkg.dependencies || {})
var pkgName = pkg.name
var path = require('path')

// todo: this doesn't do the trick when trying to use vscode
// so use code patch in readme somehow instead
// or do a monkeypatch along those lines instead

// monkeypatch from hell makes eslint load all of a config's
// dependencies.
function patchRequire(original, filepath) {
  return function (name) {
    var idx = dependencies.indexOf(name)
    if (idx > -1) {
      name = path.join(__dirname, 'node_modules', name)
      return original(name)
    }
    if (path.isAbsolute(name)) {
      return original(name)
    }
    if (name === pkgName) {
      return module.exports
    }
    if (name.charAt(0) === '.') {
      return original(path.join(path.dirname(filepath), name))
    }
    return original(path.join(path.dirname(filepath), '..', '..', 'node_modules', name))
  }
}

// TODO assertions that these are correct, or otherwise scan for the
// files in question.
var cliEngine = module.parent.parent.parent
var configFile = cliEngine.children[5].children[0]
var configFileRequire = configFile.require
var cliEngineRequire = cliEngine.require

cliEngine.require = patchRequire(cliEngineRequire, cliEngine.filename)
configFile.require = patchRequire(configFileRequire, configFile.filename)

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

// exports.eslint = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     // project: './tsconfig.eslint.json', // https://github.com/typescript-eslint/typescript-eslint/issues/967#issuecomment-530907956
//     ecmaVersion: 2018,
//     sourceType: 'module',
//     extraFileExtensions: ['.md', '.yml'],
//   },
//   plugins: [
//     '@typescript-eslint/eslint-plugin',
//     // 'prettier',
//     // 'codegen',
//     // 'unicorn',
//     // 'jest',
//     // 'import',
//   ],
//   env: {
//     // 'jest/globals': true,
//     node: true,
//   },
//   extends: [
//     'eslint:recommended',
//     // 'plugin:@typescript-eslint/eslint-recommended',
//     // 'plugin:@typescript-eslint/recommended',
//     // 'plugin:unicorn/recommended',
//     // 'plugin:import/typescript',
//     // 'plugin:jest/recommended',
//     // 'xo',
//     // 'xo-typescript',
//   ],
//   ignorePatterns: [
//     'dist',
//     'node_modules',
//     'coverage',
//     '!.github', // https://github.com/eslint/eslint/issues/8429#issuecomment-355967308
//   ],
//   rules: {}
// }
