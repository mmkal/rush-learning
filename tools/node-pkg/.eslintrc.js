require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [ "@rushstack/eslint-config" ],
  // parserOptions: { tsconfigRootDir: __dirname }
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/typedef': 'off',
  },
};

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
