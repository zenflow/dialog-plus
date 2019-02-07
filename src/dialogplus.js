import { DialogplusCore } from './dialogplus-core'
import { dialogplusPluginIcons } from './dialogplus-plugin-icons'

const Dialogplus = DialogplusCore.withPlugins(dialogplusPluginIcons)

export { DialogplusCore, dialogplusPluginIcons, Dialogplus }
