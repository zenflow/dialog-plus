import {
  DialogplusCoreBase,
  dialogplusCorePluginCancellers,
  dialogplusCorePluginInvokers,
  DialogplusCore,
} from './dialogplus-core'
import { dialogplusPluginIcons } from './dialogplus-plugin-icons'

const Dialogplus = DialogplusCore.withPlugins(dialogplusPluginIcons)

export {
  DialogplusCoreBase,
  dialogplusCorePluginCancellers,
  dialogplusCorePluginInvokers,
  DialogplusCore,
  dialogplusPluginIcons,
  Dialogplus,
}
