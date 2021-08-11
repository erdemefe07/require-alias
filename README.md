# require-aliases

Require alias is zero dependency that loads paths from `.aliasrc.json` into require resolver. Also supports eslint import resolver.

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
require("require-aliases")
```

Create a `.aliasrc.json` file in the root directory of your project.

> `.aliasrc.json`

```json
{
  "@redis": "./bin/connect/redis/client"
}
```

```javascript
const redis = require("@redis"); // that resolves ${rootPath}/bin/connect/redis/client
```

## For eslint

Add `require-aliases/eslint` before `node` in `eslintrc.js` settings import resolver property. 

> `.eslintrc.js`

```javascript
module.exports = {
  settings: {
    "import/resolver": ["require-aliases/eslint", "node"],
  },
};
```

## Why should i use this instead of module-alias

First of all module-alias does not support eslint.
The second is when you using module alias, vscode does not resolves aliases. I will make a plugin for vscode that syncs aliases.