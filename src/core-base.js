import css from './core-base.css'
import { ensureCss, assert, mergeOptions } from './helpers'

const createElement = document.createElement.bind(document)
const documentBody = document.body

export class DialogplusCoreBase {
  static defaultOptions = {
    content: '',
  }
  static withPlugins(...plugins) {
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }

  static defaultOptions = {}
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static defaultOptions = mergeOptions(Super.defaultOptions, options)
      })(this)
  }

  static fire(options = {}) {
    return new this(options)
  }

  elements = {}

  constructor(options) {
    // TODO: assert this constructor is not extended/overridden ?
    this._create()
    // TODO: fire onCreate event=
    this.options = mergeOptions(this.constructor.defaultOptions, options)
    this._render(true, this.options) // TODO: assert nothing accesses `this.options` during this call ?
  }
  setOptions(options = {}) {
    this.options = mergeOptions(this.options, options)
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

    Object.assign(this.elements, { container, backdrop, dialog, content })
  }
  _render(isInitial, { content, ...rest }) {
    this.elements.content.innerHTML = String(content)

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
