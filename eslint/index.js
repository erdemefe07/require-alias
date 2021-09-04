const {
  configure,
  isAlias,
  getPaths,
  tryPaths,
  isConfigured,
} = require("../lib");

exports.interfaceVersion = 2;
exports.resolve = (request, requestFrom, options) => {
  if (!isConfigured()) {
    const moveOn = configure(options ? options : undefined);
    if (!moveOn) return { found: false };
  }
  if (!isAlias(request)) return { found: false };
  const paths = getPaths(request);
  const uri = tryPaths(paths);
  if (!uri) return { found: false };
  return { found: true, path: uri };
};
