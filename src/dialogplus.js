import {
  DialogplusCoreBase,
  dialogplusCorePlugin,
  DialogplusCore,
} from './dialogplus-core'
import { dialogplusPluginIcons } from './dialogplus-plugin-icons'

const Dialogplus = DialogplusCore.withPlugins(dialogplusPluginIcons)

export {
  DialogplusCoreBase,
  dialogplusCorePlugin,
  DialogplusCore,
  dialogplusPluginIcons,
  Dialogplus,
}
