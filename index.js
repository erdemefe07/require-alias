const BuiltinModule = require("module");
const path = require("path");

const aliasrc = path.join(process.cwd(), ".aliasrc.json");
const aliases = require(aliasrc);

// Guard against poorly mocked module constructors
const Module =
  module.constructor.length > 1 ? module.constructor : BuiltinModule;
const realResolveFilename = Module._resolveFilename;

Module._resolveFilename = (request, ...args) => {
  if (Object.keys(aliases).includes(request)) {
    return realResolveFilename.call(
      this,
      path.join(process.cwd(), aliases[request]),
      ...args
    );
  }
  return realResolveFilename.call(this, request, ...args);
};
