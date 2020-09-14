const path = require('path')

exports.rushVersionrc = () => {
  const rushJson = require('../../rush.json') // todo: find-up?

  return {
    packageFiles: rushJson.projects.map(p => ({
      filename: path.join(p.projectFolder, 'package.json'),
      updater: {
        readVersion: contents => JSON.parse(contents).version,
        writeVersion: (contents, version) => {
          const pkg = JSON.parse(contents)
          // todo: write to `common/changes/${pkg.name}/somechange.json` as a side-effect
          console.log({name: pkg.name, version})
          return contents
        }
      }
    }))
  }
}