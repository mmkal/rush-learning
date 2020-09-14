const {execSync} = require('child_process')

const exec = cmd => {
  console.log('[running]', cmd)
  execSync(cmd, {stdio: 'inherit'})
}

Object
  .entries(require('./package.json').dependencies)
  .filter(([key]) => key.includes('eslint'))
  .forEach(([key, value]) => exec(`pnpm install -g ${key}@${value}`))
