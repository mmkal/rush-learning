// const standardVersion = require('standard-version')

// // Options are the same as command line, except camelCase
// // standardVersion returns a Promise
// standardVersion({
//   noVerify: true,
//   // infile: 'docs/CHANGELOG.md',
//   silent: false
// }).then(() => {
//   // standard-version is done
// }).catch(err => {
//     console.error(`standard-version failed with message: ${err.message}`)
// })
const gitRawCommits = require('git-raw-commits')
const conventionalCommitsParser = require('conventional-commits-parser')
const concat = require('concat-stream')

gitRawCommits({
  format: '%B%n-hash-%n%H',
  from: 'origin/main' || '',
  // path: options.path
})
  .pipe(conventionalCommitsParser())
  .pipe(concat(data => {
    console.log({data})
  }))
  