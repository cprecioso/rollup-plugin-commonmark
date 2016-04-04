'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var commonmark = require('commonmark');
var rollupPluginutils = require('rollup-pluginutils');
var objectAssign = _interopDefault(require('object-assign'));

function rollupPluginCommonmark () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


  options = objectAssign({
    extensions: ["markdown", "md"],
    smart: true,
    sourcepos: false,
    safe: false,
    escape: undefined,
    softbreak: undefined
  }, options);

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  var parser = new commonmark.Parser();
  var renderer = new commonmark.HtmlRenderer({
    smart: options.smart,
    safe: options.safe
  });

  if (options.escape) render.escape = options.escape;
  if (options.softbreak) render.softbreak = options.softbreak;

  return {
    transform: function transform(code, id) {
      if (!filter(id) || !options.extensions.filter(function (ext) {
        return id.indexOf(ext) === id.length - ext.length;
      }).length) {
        return;
      }

      return {
        code: "export default " + JSON.stringify(renderer.render(parser.parse(code))) + ";",
        map: { mappings: "" }
      };
    }
  };
}

module.exports = rollupPluginCommonmark;