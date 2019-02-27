import css from './dialogplus-plugin-icons.css'
import { ensureCss } from './helpers/ensure-css'

function dialogplusPluginIcons(Super) {
  return class extends Super {
    _create() {
      super._create()
      ensureCss(css)
    }
  }
}

export { dialogplusPluginIcons }
