// TODO: split this file into multiple modules

function omitUndefined(object) {
  const result = []
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}

export function mergeOptions(baseOptions, updatedOptions) {
  return { ...baseOptions, ...omitUndefined(updatedOptions) }
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

// adapted from https://github.com/egoist/style-inject/blob/master/src/index.js
function injectCss(css) {
  if (!css || typeof document === 'undefined') return

  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'

  head.appendChild(style)

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}

const ensuredCss = new Set()
export function ensureCss(css) {
  if (ensuredCss.has(css)) return
  injectCss(css)
  ensuredCss.add(css)
}

export function createDeferred() {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}
