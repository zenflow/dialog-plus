export function dialogplusCorePluginInvokers(Super) {
  return class extends Super {
    static create(options = {}) {
      return new this(options)
    }

    static argMap = ['content']
    static withArgMap(argMap) {
      return (Super =>
        class extends Super {
          static argMap = argMap
        })(this)
      // is this technique gonna work? find that sweetalert2 issue i had
    }
    static make(...args) {
      const options = {}
      this.argMap.forEach((optionName, index) => {
        options[optionName] = args[index]
      })
      if (args.length > this.argMap.length) {
        Object.assign(options, args[this.argMap.length])
      }
      return new this(options)
    }
  }
}
