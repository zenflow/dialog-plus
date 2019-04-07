export function dialogplusCorePluginCancellers(Super) {
  return class extends Super {
    static optionDefaults = {
      ...Super.optionDefaults,
      cancelOnBackdropClick: false,
    }

    _renderBackdrop() {
      const backdrop = super._renderBackdrop()
      backdrop.data.on = backdrop.data.on = {} // TODO: use `set` below to avoid this line?
      if (
        this.options.cancelOnBackdropClick &&
        !this.isDestroying &&
        !this.isDestroyed
      ) {
        backdrop.data.on.click = () => this.cancel('backdrop-click') // TODO: utility to merge new handler with old handler
      }
      return backdrop
    }
  }
}
