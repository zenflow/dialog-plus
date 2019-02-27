import css from './dialogplus-core.css'
import { omitUndefined, ensureCss, assert } from './helpers'

const errorMessage = message => `dialogplus-core: ${message}`

const createElement = document.createElement.bind(document)
const documentBody = document.body

class DialogplusCore {
  static defaultOptions = {
    content: '',
  }
  static withPlugins(...plugins) {
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }

  static customOptions = {}
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static customOptions = { ...Super.customOptions, ...options }
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

  constructor(options) {
    // TODO: assert this constructor is not extended/overridden ?
    this._create()
    // TODO: fire onCreate event
    const { defaultOptions, customOptions } = this.constructor
    this.options = { ...defaultOptions, ...customOptions, ...options }
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

  _create() {
    ensureCss(css)

    const dialog = createElement('div')
    dialog.className = 'dialogplus--dialog'
    documentBody.appendChild(dialog)

    const content = createElement('div')
    content.className = 'dialogplus--content'
    dialog.appendChild(content)

    Object.assign(this.elements, { dialog, content })
  }
  _render(isInitial, { content, ...rest }) {
    content = content || ''
    assert(
      typeof content === 'string',
      errorMessage('"content" option must be a string'),
    )
    this.elements.content.innerHTML = content

    // make sure no options were unused
    assert(
      !Object.keys(rest).length,
      errorMessage('Unknown option(s): ' + Object.keys(rest).join(', ')),
    )
  }
  _hide() {
    this.elements.dialog.style.display = 'none' // TODO: use a classname and css to acheive this
    // TODO: this.elements.dialog.addEventListener('animationend', () => this._destroy())
    // TODO: fire onHide *after* this function is called
  }
  _destroy() {
    documentBody.removeChild(this.elements.dialog)
    // TODO: fire onDestroy *after* this function is called
  }
}

export { DialogplusCore }
