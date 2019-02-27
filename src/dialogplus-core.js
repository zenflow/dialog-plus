import { DialogplusCoreBase } from './core-base'
import { dialogplusCorePlugin } from './core-plugin'

const DialogplusCore = DialogplusCoreBase.withPlugins(dialogplusCorePlugin)

export { DialogplusCoreBase, dialogplusCorePlugin, DialogplusCore }
