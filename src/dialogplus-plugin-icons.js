import css from './dialogplus-plugin-icons.css'
import { ensureCss } from './helpers/ensure-css'

function dialogplusPluginIcons(Super) {
  return class extends Super {
    constructor(options) {
      super(options)
      ensureCss(css)
    }
  }
}

export { dialogplusPluginIcons }
