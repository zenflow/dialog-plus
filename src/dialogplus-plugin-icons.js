import css from './dialogplus-plugin-icons.css'
import { ensureCss } from './helpers'

function dialogplusPluginIcons(Super) {
  return class extends Super {
    _create() {
      super._create()
      ensureCss(css)
    }
  }
}

export { dialogplusPluginIcons }
