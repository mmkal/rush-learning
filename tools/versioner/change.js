const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const doit = () => {
  try {
    childProcess.execSync('rush change -v', {stdio: 'inherit'})
  } catch {
    console.warn('change failed, generating change files')
    const bumpType = 'minor'
    const message = 'abc'
    const x = childProcess.execSync(`rush change --overwrite --bulk --bump-type ${bumpType} --message "${message}"`).toString()

    const lines = x.split(/\r?\n/)
    const foundDirs = lines
      .map(l => l.split('Found change file: ')[1])
      .filter(Boolean)
      .map(l => l.trim())

    const duplicateFiles = foundDirs
      .map(file => ({
        file,
        content: fs.readFileSync(file),
        dir: path.dirname(file),
      }))
      .filter((f, i, arr) => i !== arr.findIndex(other => other.content === f.content && other.dir === f.dir))
      .map(f => f.file)

    duplicateFiles.length && console.warn('duplicate files, will be deleted:', duplicateFiles)
    
    // duplicateFiles.forEach(file => fs.unlinkSync(file))
  }

  childProcess.execSync('rush change -v', {stdio: 'inherit'})
}

doit()
