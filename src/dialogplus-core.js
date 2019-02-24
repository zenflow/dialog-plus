import './dialogplus-core.css'

function error(message) {
  return new Error(`dialogplus-core: ${message}`)
}

class DialogplusCore {
  static withPlugins(...plugins) {
    return plugins.reduce((Super, plugin) => plugin(Super), this)
  }
  static defaultOptions = {
    content: '',
  }
  static withOptions(options) {
    return (Super =>
      class extends Super {
        static defaultOptions = { ...Super.defaultOptions, ...options }
      })(this)
  }
  static _argsToOptions(args) {
    // TODO: eliminate this & add *different* methods for shorthand form
    const [options = {}] = args
    return options
  }
  static fire(...args) {
    const options = this._argsToOptions(args)
    return new this(options)
  }

  elements = {}
  constructor(options) {
    this._create()
    this.options = { ...this.constructor.defaultOptions, ...options }
    this._setOptions(true, this.options)
  }
  setOptions(options) {
    this.options = { ...this.options, ...options }
    this._setOptions(false, this.options)
  }

  _create() {
    // TODO: make this code smaller
    this.elements.dialog = document.createElement('div')
    this.elements.dialog.className = 'dialogplus--dialog'
    document.body.appendChild(this.elements.dialog)

    this.elements.content = document.createElement('div')
    this.elements.content.className = 'dialogplus--content'
    this.elements.dialog.appendChild(this.elements.content)
  }
  _setOptions(isInitial, { content, ...rest }) {
    content = content || ''
    if (typeof content !== 'string') {
      throw error('"content" option must be a string')
    }
    this.elements.content.innerHTML = content

    // make sure no options were unused
    if (Object.keys(rest).length) {
      throw error('Unknown option(s): ' + Object.keys(rest).join(', '))
    }
  }
  _hide() {
    this.elements.dialog.style.display = 'none' // TODO: use a classname and css to acheive this
    // TODO: this.elements.dialog.addEventListener('animationend', () => this._destroy())
  }
  _destroy() {
    document.body.removeChild(this.elements.dialog)
  }
}

export { DialogplusCore }
