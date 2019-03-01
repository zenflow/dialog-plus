import css from '../dialogplus-core-plugin-style.css'
import { ensureCss } from '../helpers/ensure-css'

function dialogplusCorePluginStyle(Super) {
  return class extends Super {
    constructor(options) {
      super(options)
      ensureCss(css)
    }
  }
}

export { dialogplusCorePluginStyle }
