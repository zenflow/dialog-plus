export function dialogplusCorePluginCancellers(Super) {
  return class extends Super {
    static optionDefaults = {
      ...Super.optionDefaults,
      cancelOnBackdropClick: false,
    }

    constructor(options) {
      super(options)
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
