import {Parser, HtmlRenderer} from "commonmark"
import { createFilter } from "rollup-pluginutils"
import objectAssign from "object-assign"

export default function(options = {}) {
  
  options = objectAssign({
    extensions: ["markdown", "md"],
    smart: true,
    sourcepos: false,
    safe: false,
    escape: undefined,
    softbreak: undefined
  }, options)
  
  const filter = createFilter(options.include, options.exclude)
  
  const parser = new Parser()
  const renderer = new HtmlRenderer({
    smart: options.smart,
    safe: options.safe
  })
  
  if (options.escape) render.escape = options.escape
  if (options.softbreak) render.softbreak = options.softbreak
  
  return {
    transform(code, id) {
      if (
        (!filter(id)) ||
        (!options.extensions.filter(ext => id.indexOf(ext) === id.length - ext.length).length)
      ) { return }
      
      return {
        code: `export default ${JSON.stringify(renderer.render(parser.parse(code)))};`,
        map: { mappings: "" }
      }
    }
  }
}
