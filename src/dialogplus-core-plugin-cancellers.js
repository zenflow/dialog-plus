import css from './dialogplus-core-plugin-style.css'
import { ensureCss } from './helpers/ensure-css'

export function dialogplusCorePluginCancellers(Super) {
  return class extends Super {
    static optionDefaults = {
      ...Super.optionDefaults,
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

    _render({ cancelOnBackdropClick, ...rest }) {
      super._render(rest)
      this.____optionCancelOnBackdropClick = Boolean(cancelOnBackdropClick)
    }
  }
}
