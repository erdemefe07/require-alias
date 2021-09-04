export = config;
/**
 * @param {Object} options
 * @param {string} [options.src=".aliasrc.json"] default .aliasrc.json
 * @param {string} [options.from="paths"] default paths
 * @param {string} [options.baseSrc="baseUrl"] default baseUrl
 */
declare function config(options: {
  src?: string;
  from?: string;
  baseSrc?: string;
}): void;
