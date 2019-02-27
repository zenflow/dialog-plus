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
        if (this.__cancelOnBackdropClick) {
          this.cancel('backdrop-click')
        }
      })
    }

    static fireSwal(icon, title, content) {
      return new this({ icon, title, content })
    }
    static fireAlert(content) {
      return new this({ content })
    }
    static fireConfirm() {} // TODO
    static firePrompt() {} // TODO

    // TODO: replace `isInitial` argument with `this.wasRendered` property
    _render(isInitial, { cancelOnBackdropClick, ...rest }) {
      this.__cancelOnBackdropClick = Boolean(cancelOnBackdropClick)
      super._render(isInitial, rest)
    }
  }
}
