// @ts-nocheck
/** @type {string[]} */
const argv = process.argv
const command = argv.splice(2, 1)
const commands = {
  tsc: 'typescript/bin/tsc',
  eslint: 'eslint/bin/eslint',
}
require(commands[command])
