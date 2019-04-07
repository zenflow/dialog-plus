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
        const unmappedArg = args[this.argMap.length]
        if (typeof unmappedArg === 'object') {
          Object.assign(options, unmappedArg)
        }
      }
      return new this(options)
    }
  }
}
