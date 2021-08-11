const path = require("path");

const aliasrc = path.join(process.cwd(), ".aliasrc.json");
const aliases = require(aliasrc);

exports.interfaceVersion = 2;
exports.resolve = (source) =>
  Object.keys(aliases).includes(source) ? resolve(source) : reject();

function resolve(source) {
  return { found: true, path: path.join(process.cwd(), aliases[source]) };
}

function reject() {
  return { found: false };
}
