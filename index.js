const BuiltinModule = require("module");
const { configure, isAlias, getPaths, tryPaths } = require("./lib");

function config({
  src = ".aliasrc.json",
  from = "paths",
  baseSrc = "baseUrl",
} = {}) {
  const moveOn = configure({ src, from, baseSrc });
  if (moveOn) register();
}

function register() {
  // Guard against poorly mocked module constructors
  const Module =
    module.constructor.length > 1 ? module.constructor : BuiltinModule;
  const realResolveFilename = Module._resolveFilename;

  Module._resolveFilename = (request, ...args) => {
    if (isAlias(request)) {
      const paths = getPaths(request);
      const uri = tryPaths(paths);
      if (!uri) {
        return realResolveFilename.call(this, request, ...args);
      }
      return realResolveFilename.call(this, uri, ...args);
    }
    return realResolveFilename.call(this, request, ...args);
  };
}

module.exports = config;
