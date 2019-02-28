import css from './dialogplus-core-plugin-style.css'
import { ensureCss } from './helpers/ensure-css'

function dialogplusCorePluginStyle(Super) {
  return class extends Super {
    _create() {
      super._create()
      ensureCss(css)
    }
  }
}

export { dialogplusCorePluginStyle }
