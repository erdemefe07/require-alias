# require-aliases

Require aliases loads aliases from `.aliasrc.json` or any file like `tsconfig.json` into import resolver. Also supports eslint import resolver.

## Install

```bash
# with npm
npm install require-aliases

# or with Yarn
yarn add require-aliases
```

## Usage

As early as possible in your application, import `require-aliases`.

```javascript
require('require-aliases');
```

Create a `.aliasrc.json` file in the root directory of your project.

> `.aliasrc.json`

```json
{
  "baseUrl": ".",
  "paths": {
    "@redis": ["connect/redis"]
  }
}
```

```javascript
const redis = require('@redis'); // that resolves ${baseSrc}/connect/redis
```

## For eslint

Add `require-aliases/eslint` before `node` in `eslintrc.js` settings import resolver property.

> `.eslintrc.js`

```javascript
module.exports = {
  settings: {
    'import/resolver': ['require-aliases/eslint', 'node'],
  },
};
```

## Configuring

Theese fields are defaults

```javascript
require("require-aliases")({
  src: '.aliasrc.json', // File that contains paths and baseUrl option
  from: 'paths', // Aliases place
  baseSrc: 'baseUrl' // BaseSrc place
})

/**
 * Above code means your config file is `.aliasrc.json`
 * And your aliases defined in config files `paths` property
 * And your baseSrc defined in config files `baseUrl` property
 */
```

You can use this for `tsconfig.json`

```javascript
require("require-aliases")({
 src: 'tsconfig.json', // File that contains paths and baseUrl option
 from: 'compilerOptions.paths', // Aliases place
 baseSrc: 'compilerOptions.baseUrl' // BaseSrc place
})
```

And for `.eslintrc.json`

```javascript
module.exports = {
  settings: {
    "import/resolver": {
      "require-aliases/eslint":{
         src: 'tsconfig.json',
         from: 'compilerOptions.paths',
         baseSrc: 'compilerOptions.baseUrl'
      },
      node: {}
    }
  },
};
```

You have to refresh the window whenever you make a change.

## Note

The `tsconfig.json` or `jsconfig.json` file is required for vscode to resolve imports.
## Why should i use this instead of module-alias

First of all module-alias does not support eslint.
And vscode doesnt resolves aliases at importing.
If you want to vscode recognize aliases you must define aliases twice.
But with this module you define aliases only once and vscode and eslint resolves aliases.

## License
Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
