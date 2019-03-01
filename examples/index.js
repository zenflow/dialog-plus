import { init } from 'snabbdom'
import snabbdomModuleClass from 'snabbdom/modules/class'
import snabbdomModuleProps from 'snabbdom/modules/props'
import snabbdomModuleStyle from 'snabbdom/modules/style'
import snabbdomModuleEventlisteners from 'snabbdom/modules/eventlisteners'
import h from 'snabbdom/h'
import { examples } from './examples'

const patch = init([
  snabbdomModuleClass,
  snabbdomModuleProps,
  snabbdomModuleStyle,
  snabbdomModuleEventlisteners,
])

let selectedExample = examples[0]
function render() {
  const items = examples.map(example => {
    return h('li', [
      h('button', { on: { click: () => openExample(example) } }, [example.id]),
      h(
        'pre',
        {
          on: { click: () => runExample(example) },
          style: { display: example === selectedExample ? 'block' : 'none' },
        },
        example.fn.toString(),
      ),
    ])
  })
  return h('ol', items)
}

function openExample(example) {
  selectedExample = example
  patchVnode(render())
}

function runExample({ id, fn }) {
  console.log(`"${id}": started`)
  const fnResult = fn()
  if (
    typeof fnResult === 'object' &&
    typeof fnResult.catch === 'function' &&
    typeof fnResult.then === 'function'
  ) {
    fnResult.catch(console.error).then(() => {
      console.log(`"${id}": finished`)
    })
  }
}

let vnode = render()
patch(document.getElementById('main'), vnode)
function patchVnode(next) {
  vnode = patch(vnode, next)
}
