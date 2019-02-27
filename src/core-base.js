import css from './core-base.css'
import { ensureCss } from './helpers/ensure-css'
import { assert } from './helpers/assert'
import { mergeOptions } from './helpers/merge-options'
import { createDeferred } from './helpers/create-deferred'

let isCssEnsured = false

const createElement = document.createElement.bind(document)
const documentBody = document.body

export class DialogplusCoreBase {
  // static properties & methods
  static defaultOptions = {
    content: '',
    getResolvedValue: ({ cancelReason }) => ({ cancelReason }),
  }
  // TODO: attach this `meta` to instance prototype also?
  static meta = {
    plugins: [], // TODO: populate this ?
  }
  static withPlugins(...plugins) {
    if (!isCssEnsured) {
      ensureCss(css)
      isCssEnsured = true
    }
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static defaultOptions = mergeOptions(Super.defaultOptions, options)
      })(this)
  }

  // "final" (sealed) methods
  // TODO: assert "final" prototype methods (and constructor) are not extended/overridden?
  //    decorator for "sealed" constructor & methods?
  constructor(options) {
    this.____deferred = createDeferred()
    this._create()
    this.options = mergeOptions(this.constructor.defaultOptions, options)
    this.render()
  }
  setOptions(options = {}) {
    this.options = mergeOptions(this.options, options)
    this.render()
  }
  render() {
    this._render(this.options) // TODO: assert nothing accesses `this.options` during this call ?
    this.hadFirstRender = true
  }
  cancel(reason) {
    // TODO: assert valid state for cancellation
    this.cancelReason = reason
    this._hide(this)
    resolveDeferred(this)
  }
  then(onFulfilled, onRejected) {
    return this.____deferred.promise.then(onFulfilled, onRejected)
  }
  catch(onRejected) {
    return this.____deferred.promise.catch(onRejected)
  }
  finally(onFinally) {
    return this.____deferred.promise.finally(onFinally)
  }

  // "protected" methods
  _create() {
    // TODO: dry
    const container = createElement('div')
    container.className = 'dialogplus--container'
    documentBody.appendChild(container)

    const backdrop = createElement('div')
    backdrop.className = 'dialogplus--backdrop'
    container.appendChild(backdrop)

    const dialog = createElement('div')
    dialog.className = 'dialogplus--dialog'
    container.appendChild(dialog)

    const content = createElement('div')
    content.className = 'dialogplus--content'
    dialog.appendChild(content)

    this.elements = { container, backdrop, dialog, content }
  }
  _render({ content, getResolvedValue, ...rest }) {
    this.elements.content.innerHTML = String(content)
    this.____optionGetResolvedValue = getResolvedValue

    // make sure no options were unused
    assert(
      !Object.keys(rest).length,
      'Unknown option(s): ' + Object.keys(rest).join(', '),
    )
  }
  _hide() {
    this.elements.container.style.display = 'none' // TODO: use a classname and css to acheive this
    // TODO: this.elements.dialog.addEventListener('animationend', () => this._destroy())
    // TODO: fire onHide *after* this function is called
  }
  _destroy() {
    documentBody.removeChild(this.elements.container)
    // TODO: fire onDestroy *after* this function is called
  }
}

// "private" methods
function resolveDeferred(self) {
  self.resolvedValue = self.____optionGetResolvedValue(self)
  self.____deferred.resolve(self.resolvedValue)
}
