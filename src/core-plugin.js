import css from './core-plugin.css'
import { ensureCss } from './helpers/ensure-css'

export function dialogplusCorePlugin(Super) {
  ensureCss(css)
  return class extends Super {
    // static properties & methods
    static defaultOptions = {
      ...Super.defaultOptions,
      cancelOnBackdropClick: false,
    }
    static fire(options = {}) {
      return new this(options)
    }
    static fireSwal(icon, title, content) {
      return new this({ icon, title, content })
    }
    static fireAlert(content) {
      return new this({ content })
    }
    // TODO: fireConfirm, firePrompt, etc

    // "protected" methods
    _create() {
      super._create()
      this.elements.backdrop.addEventListener('click', () => {
        if (this.____optionCancelOnBackdropClick) {
          this.cancel('backdrop-click')
        }
      })
    }
    _render({ cancelOnBackdropClick, ...rest }) {
      this.____optionCancelOnBackdropClick = Boolean(cancelOnBackdropClick)
      super._render(rest)
    }
  }
}
