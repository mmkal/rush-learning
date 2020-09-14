// var pkg = require('./package.json');
// var dependencies = Object.keys(pkg.dependencies || {});
// var pkgName = pkg.name;
// var path = require('path');

// // monkeypatch from hell makes eslint load all of a config's
// // dependencies.
// function patchRequire(original, filepath) {
//   return function (name) {
//     var idx = dependencies.indexOf(name);
//     if (idx > -1) {
//       name = path.join(__dirname, 'node_modules', name);
//       return original(name);
//     }
//     if (path.isAbsolute(name)) {
//       return original(name);
//     }
//     if (name === pkgName) {
//       return module.exports;
//     }
//     if (name.charAt(0) === '.') {
//       return original(path.join(path.dirname(filepath), name));
//     }
//     return original(path.join(path.dirname(filepath),
//       '..',
//       '..',
//       'node_modules',
//       name));
//   };
// }

// // TODO assertions that these are correct, or otherwise scan for the
// // files in question.
// var cliEngine = module.parent.parent.parent;
// var configFile = cliEngine.children[5].children[0];
// var configFileRequire = configFile.require;
// var cliEngineRequire = cliEngine.require;

// cliEngine.require = patchRequire(cliEngineRequire, cliEngine.filename);
// configFile.require = patchRequire(configFileRequire, configFile.filename);

module.exports = Object.assign(
  {
    extends: ['@rushstack/eslint-config'],
  },
  require('@mmkal/node-pkg').eslint
)
