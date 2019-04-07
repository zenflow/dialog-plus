import { init } from 'snabbdom'
import snabbdomModuleClass from 'snabbdom/modules/class'
import snabbdomModuleProps from 'snabbdom/modules/props'
import snabbdomModuleStyle from 'snabbdom/modules/style'
import snabbdomModuleEventlisteners from 'snabbdom/modules/eventlisteners'
import h from 'snabbdom/h'

const patch = init([
  snabbdomModuleClass,
  snabbdomModuleProps,
  snabbdomModuleStyle,
  snabbdomModuleEventlisteners,
])

export { h, patch }
