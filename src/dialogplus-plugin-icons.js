import css from './dialogplus-plugin-icons.css'
import { ensureCss } from './helpers/ensure-css'

function dialogplusPluginIcons(Super) {
  ensureCss(css)
  return class extends Super {}
}

export { dialogplusPluginIcons }
