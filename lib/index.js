const debug = require("debug")("require-aliases");
const fs = require("fs");
const path = require("path");
const get = require("lodash.get");
const json5 = require("json5");

let aliases;
let aliasrc;
let base;

function configure(
  options = { src: ".aliasrc.json", from: "paths", baseSrc: "baseUrl" }
) {
  const { src, from, baseSrc } = options;

  try {
    aliasrc = path.join(process.cwd(), src);
    const _file = fs.readFileSync(aliasrc, { encoding: "utf8" });
    const file = json5.parse(_file);

    const basePath = get(file, baseSrc);
    base = path.join(process.cwd(), basePath);

    if (from) {
      aliases = get(file, from);
    } else {
      aliases = file;
    }
  } catch (error) {
    debug("Problem occured while registering aliases. Take a look at:", src);
    return false
  }
  return true
}

function isAlias(request) {
  return Object.keys(aliases).includes(request);
}

function tryPaths(paths) {
  for (const item of paths) {
    const uri = path.join(base, item);
    let exists;
    try {
      exists = fs.statSync(uri);
    } catch (error) {}
    if (exists) return uri;
  }
  return false;
}

function getPaths(request) {
  return aliases[request];
}

function isConfigured() {
  return !!aliases;
}

module.exports = {
  configure,
  isAlias,
  tryPaths,
  getPaths,
  isConfigured,
};
