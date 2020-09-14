const standardVersion = require('standard-version')

// Options are the same as command line, except camelCase
// standardVersion returns a Promise
standardVersion({
  noVerify: true,
  // infile: 'docs/CHANGELOG.md',
  silent: false
}).then(() => {
  // standard-version is done
}).catch(err => {
    console.error(`standard-version failed with message: ${err.message}`)
})