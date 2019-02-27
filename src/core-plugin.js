import css from './core-plugin.css'
import { ensureCss } from './helpers'

export function dialogplusCorePlugin(Super) {
  return class extends Super {
    static defaultOptions = {
      ...Super.defaultOptions,
      cancelOnBackdropClick: false,
    }
    _create() {
      super._create()
      ensureCss(css)
      this.elements.backdrop.addEventListener('click', () => {
        if (this.____optionCancelOnBackdropClick) {
          this.cancel('backdrop-click')
        }
      })
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

    _render({ cancelOnBackdropClick, ...rest }) {
      this.____optionCancelOnBackdropClick = Boolean(cancelOnBackdropClick)
      super._render(rest)
    }
  }
}
