import { HtmlRenderer, Parser } from 'commonmark';
import { createFilter } from 'rollup-pluginutils';
import objectAssign from 'object-assign';

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

  var filter = createFilter(options.include, options.exclude);

  var parser = new Parser();
  var renderer = new HtmlRenderer({
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

export default rollupPluginCommonmark;