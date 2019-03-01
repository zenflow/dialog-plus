import h from 'snabbdom/h'
export function dialogplusCorePluginLayout(parentFactory) {
  const childFactory = initialOptions => {
    const self = parentFactory(initialOptions)
    const _renderDialog = self._renderDialog
    self._renderDialog = () => {
      const vnodes = _renderDialog()
      const content = h('div.dialogplus--content', {
        props: { innerHTML: self.options.content },
      })
      vnodes.dialog.children = [...(vnodes.dialog.children || []), content]
      return { ...vnodes, content }
    }
    return self
  }
  Object.assign(childFactory, parentFactory)
  return childFactory
}
