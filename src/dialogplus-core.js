import css from './dialogplus-core.css'
import { omitUndefined, ensureCss, assert } from './helpers'

const errorMessage = message => `dialogplus-core: ${message}`
const createElement = document.createElement.bind(document)
const documentBody = document.body

class DialogplusCore {
  static defaultOptions = {
    content: '',
    cancelOnBackdropClick: false,
  }
  static withPlugins(...plugins) {
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }

  static defaultOptions = {}
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static defaultOptions = { ...Super.defaultOptions, ...options }
      })(this)
  }

  static fire(options = {}) {
    return new this(options)
  }
  static fireSweet(icon, title, content) {
    return new this(omitUndefined({ icon, title, content }))
  }
  static fireAlert(content) {
    return new this(omitUndefined({ content }))
  }
  static fireConfirm() {} // TODO
  static firePrompt() {} // TODO

  elements = {}
  #cancelOnBackdropClick

  constructor(options) {
    // TODO: assert this constructor is not extended/overridden ?
    this._create()
    // TODO: fire onCreate event=
    this.options = { ...this.constructor.defaultOptions, ...options }
    this._render(true, this.options) // TODO: assert nothing accesses `this.options` during this call ?
  }
  setOptions(options = {}) {
    this.options = { ...this.options, ...options }
    this.render()
  }
  render() {
    this._render(false, this.options) // TODO: assert nothing accesses `this.options` during this call ?
    // TODO: fire onReRender event
  }
  cancel(reason) {
    this.cancelReason = reason
    this._hide()
  }

  _create() {
    ensureCss(css)

    const container = createElement('div')
    container.className = 'dialogplus--container'
    documentBody.appendChild(container)

    const backdrop = createElement('div')
    backdrop.className = 'dialogplus--backdrop'
    backdrop.addEventListener('click', () => {
      if (this.#cancelOnBackdropClick) {
        this.cancel('backdrop-click')
      }
    })
    container.appendChild(backdrop)

    const dialog = createElement('div')
    dialog.className = 'dialogplus--dialog'
    container.appendChild(dialog)

    const content = createElement('div')
    content.className = 'dialogplus--content'
    dialog.appendChild(content)

    Object.assign(this.elements, { container, dialog, content })
  }
  _render(isInitial, { content, cancelOnBackdropClick, ...rest }) {
    this.elements.content.innerHTML = String(content)

    this.#cancelOnBackdropClick = cancelOnBackdropClick

    // make sure no options were unused
    assert(
      !Object.keys(rest).length,
      errorMessage('Unknown option(s): ' + Object.keys(rest).join(', ')),
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

export { DialogplusCore }
