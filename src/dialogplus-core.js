import { DialogplusCoreBase } from './dialogplus-core-base'
import { dialogplusCorePluginStyle } from './dialogplus-core-plugin-style'
import { dialogplusCorePluginCancellers } from './dialogplus-core-plugin-cancellers'
import { dialogplusCorePluginInvokers } from './dialogplus-core-plugin-invokers'

const DialogplusCore = DialogplusCoreBase.withPlugins(
  dialogplusCorePluginStyle,
  dialogplusCorePluginCancellers,
  dialogplusCorePluginInvokers,
)

export {
  DialogplusCoreBase,
  dialogplusCorePluginStyle,
  dialogplusCorePluginCancellers,
  dialogplusCorePluginInvokers,
  DialogplusCore,
}
