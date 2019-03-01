import css from '../dialogplus-core-base.css'
import { ensureCss } from '../helpers/ensure-css'
import { assert } from '../helpers/assert'
import { mergeOptions } from '../helpers/merge-options'
import { createDeferred } from '../helpers/create-deferred'

const createElement = document.createElement.bind(document)
const documentBody = document.body

export class DialogplusCoreBase {
  // static properties & methods
  static optionDefaults = {
    content: '',
    getResolvedValue: ({ cancelReason }) => ({ cancelReason }),
  }
  // TODO: static plugins = [] ? when firing Dialog.withPlugins(), assert correct dependencies installed first?
  // TODO: attach this `meta` to instance prototype also?
  static withPlugins(...plugins) {
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static optionDefaults = mergeOptions(Super.optionDefaults, options)
      })(this)
    // is this technique gonna work? find that sweetalert2 issue i had
  }

  constructor(options) {
    ensureCss(css)
    this.____deferred = createDeferred()
    this.elements = getElements()
    this.options = mergeOptions(this.constructor.optionDefaults, options)
    Promise.resolve().then(() => this.render()) // TODO: fix hack for problem of rendering before child class initiation
  }

  // "final" and public methods
  // TODO: assert "final" prototype methods (and constructor) are not extended/overridden?
  //    decorator for "sealed" constructor & methods?
  setOptions(options = {}) {
    this.options = mergeOptions(this.options, options)
    this.render()
  }
  render() {
    this._render(this.options) // TODO: assert nothing accesses `this.options` during this call ?
    this.hasRendered = true
  }
  complete(result) {
    // TODO: assert valid state for completion
    this.result = result
    this._hide(this)
    resolveDeferred(this)
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
    // TODO: this.isHiding = true ... this.isHiding = false; this.isHidden = true
    this.elements.container.style.display = 'none' // TODO: use a classname and css to acheive this
    // TODO: this.elements.dialog.addEventListener('animationend', () => this._destroy())
    // TODO: fire onHide *after* this function is called
  }
  _destroy() {
    this.isDestroyed = true
    documentBody.removeChild(this.elements.container)
    // TODO: fire onDestroy *after* this function is called
  }
}

// "private" methods
function resolveDeferred(self) {
  self.resolvedValue = self.____optionGetResolvedValue(self)
  self.____deferred.resolve(self.resolvedValue)
}
function getElements() {
  // TODO: dry
  const container = createElement('div')
  container.className = 'dialogplus--root'
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

  return { container, backdrop, dialog, content }
}
