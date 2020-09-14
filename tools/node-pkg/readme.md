vscode support requires this:
common\temp\node_modules\.pnpm\registry.npmjs.org\eslint\7.9.0\node_modules\eslint\lib\cli-engine\config-array-factory.js
catch (resolveError) {...
                filePath = require.resolve(`${process.cwd()}/tools/node-pkg/node_modules/${request}`)
                (in a try catch)

todo: when https://github.com/eslint/rfcs/pull/9 is in, none of this nonsense will be necessary. plugins/configs can be loaded as objects then. but it's kinda far off I guess
