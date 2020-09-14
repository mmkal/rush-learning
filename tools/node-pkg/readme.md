# @mmkal/node-pkg

A preset/dev dependency bundle with jest, eslint and tsconfig presets/dependencies/configs/passthrough bin scripts exposed.

Usage:

```bash
pnpm install --save-dev @mmkal/node-pkg
```

## package.json

Use the passthrough bin script `run` in package.json to access `tsc` and `eslint`:

```json
{
  "scripts": {
    "build": "run tsc -p .",
    "lint": "run eslint ."
  }
}
```

## .eslintrc.js

```js
module.export = require('@mmkal/node-pkg').eslint
```

## tsconfig.json

```json
{
  "extends": "./node_modules/@mmkal/node-pkg/tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "tsBuildInfoFile": "dist/buildinfo.json",
    // convenient abstraction, however leaky: the helper package exposes node and jest types
    // but they're tucked away in a nested node_modules folder. This lets them be used
    "typeRoots": ["node_modules/@mmkal/node-pkg/node_modules/@types"]
  },
  "exclude": ["node_modules", "dist"]
}
```