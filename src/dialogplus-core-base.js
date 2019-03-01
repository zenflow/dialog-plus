import { init } from 'snabbdom'
import snabbdomModuleClass from 'snabbdom/modules/class'
import snabbdomModuleProps from 'snabbdom/modules/props'
import snabbdomModuleStyle from 'snabbdom/modules/style'
import snabbdomModuleEventlisteners from 'snabbdom/modules/eventlisteners'
import h from 'snabbdom/h'
import { mergeOptions } from './helpers/merge-options'
import { ensureCss } from './helpers/ensure-css'
import css from './dialogplus-core-base.css'
import styleCss from './dialogplus-core-plugin-style.css'
// import { createDeferred } from './helpers/create-deferred'

const patch = init([
  snabbdomModuleClass,
  snabbdomModuleProps,
  snabbdomModuleStyle,
  snabbdomModuleEventlisteners,
])

dialogplusCoreBase.optionDefaults = {
  content: '',
  getResolvedValue: ({ cancelReason }) => ({ cancelReason }),
}
dialogplusCoreBase.withOptions = function(options) {
  const parentFactory = this
  const childFactory = options => parentFactory(options)
  Object.assign(childFactory, parentFactory, {
    optionDefaults: mergeOptions(parentFactory.optionDefaults, options),
  })
  return childFactory
}
function getInsertedElement() {
  const element = document.createElement('div')
  document.body.appendChild(element)
  return element
}
export function dialogplusCoreBase(options = {}) {
  ensureCss(css)
  ensureCss(styleCss)

  // const deferred = createDeferred()
  const self = {
    options,
    vnodes: {},
    render() {
      const target = self.vnodes.root || getInsertedElement()

      self.vnodes = self._renderRoot()

      patch(target, self.vnodes.root)
    },
    setOptions(options = {}) {
      self.options = mergeOptions(self.options, options)
      self.render()
    },
    _renderRoot() {
      const vnodes = {
        ...self._renderBackdrop(),
        ...self._renderDialog(),
      }
      vnodes.root = h('div.dialogplus--root', [vnodes.backdrop, vnodes.dialog])
      console.log({ vnodes })
      return vnodes
    },
    _renderBackdrop() {
      const backdrop = h('div.dialogplus--backdrop')
      return { backdrop }
    },
    _renderDialog() {
      const dialog = h('div.dialogplus--dialog')
      return { dialog }
    },
  }
  Promise.resolve().then(() => self.render())
  return self
}
