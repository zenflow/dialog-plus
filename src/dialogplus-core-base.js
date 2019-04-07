import css from './dialogplus-core-base.css'
import { ensureCss } from './helpers/ensure-css'
import { assert } from './helpers/assert'
import { mergeOptions } from './helpers/merge-options'
import { createDeferred } from './helpers/create-deferred'
import { patch, h } from './helpers/snabbdom'

export class DialogplusCoreBase {
  // static properties & methods
  static optionDefaults = {
    content: '',
    getResolvedValue: ({ result, canceled }) => ({ result, canceled }),
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

  ____deferred = createDeferred()
  ____patchTarget = getInsertedElement()
  options = undefined
  container = undefined
  result = undefined
  canceled = undefined
  isDestroying = false
  isDestroyed = false

  constructor(options) {
    ensureCss(css)
    this.options = mergeOptions(this.constructor.optionDefaults, options)
    this.render()
    // Promise.resolve().then(() => this.render()) // TODO: fix hack for problem of rendering before child class initiation
  }

  // "final" and public methods
  // TODO: assert "final" prototype methods (and constructor) are not extended/overridden?
  //    decorator for "sealed" constructor & methods?
  setOptions(options = {}) {
    // TODO: convenience if typeof options === 'function' {this.options = options(this.options)}
    this.options = mergeOptions(this.options, options)
    this.render()
  }
  render() {
    const rendered = this._renderRoot()
    patch(this.____patchTarget, rendered)
    this.____patchTarget = rendered
    this.container = rendered
  }
  complete(result) {
    destroy.call(this, () => {
      this.result = result
    })
  }
  cancel(canceled) {
    destroy.call(this, () => {
      this.canceled = canceled
    })
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
  _renderRoot() {
    // TODO: rename "root" to "container"
    return h(
      'div.dialogplus--root',
      { class: { 'dialogplus--isDestroying': this.isDestroying } },
      this.isDestroyed ? [] : [this._renderBackdrop(), this._renderDialog()],
    )
  }
  _renderBackdrop() {
    return h('div.dialogplus--backdrop')
  }
  _renderDialog() {
    return h('div.dialogplus--dialog', [this._renderContent()])
  }
  _renderContent() {
    return h('div.dialogplus--content', {
      props: { innerHTML: this.options.content },
    })
  }
}

// "private" methods

function getInsertedElement() {
  const element = document.createElement('div')
  document.body.appendChild(element)
  return element
}

function destroy(cb) {
  assert(!this.isDestroying)
  assert(!this.isDestroyed)

  cb()

  const resolvedValue = this.options.getResolvedValue.call(null, this)
  this.____deferred.resolve(resolvedValue)

  this.isDestroying = true
  this.render()

  this.____patchTarget.elm.addEventListener('animationend', () => {
    // TODO: wait for other animations to end?
    this.isDestroying = false
    this.isDestroyed = true
    this.render()
    document.body.removeChild(this.____patchTarget.elm)
  })
}
