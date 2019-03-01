import { dialogplusCore } from '../dist/dialogplus.cjs'
export const examples = [
  {
    id: 'afsaf',
    fn: () => {
      const dialog = dialogplusCore({
        content: `<p>(will be reset soon)</p><input type="text" value="foo"/>`,
      })
      setTimeout(() => {
        dialog.setOptions({
          content: `<p>(done)</p><input type="text"/>`,
        })
      }, 2000)
    },
  },
]

/*
import { MyDialog } from './my-dialog'

export const examples = [
  {
    id: 'invokers',
    fn() {
      // TODO
      return MyDialog.make('custom content')
    },
  },
  {
    id: 'wide and tall content',
    fn() {
      const content = Array.from({ length: 200 })
        .map((_, y) =>
          Array.from({ length: 20 })
            .map((_, x) => x * y)
            .join(' ... '),
        )
        .join('<br/>')
      return MyDialog.create({ content })
    },
  },
  {
    id: 'cancellers',
    fn() {
      const dialog = MyDialog.create({
        content: 'wait a couple seconds...',
        cancelOnBackdropClick: false,
      })
      setTimeout(() => dialog.cancel('my-timeout'), 2000)
      return dialog
        .then(result =>
          MyDialog.make(
            'result: ' +
              JSON.stringify(result) +
              '<hr/>now click the backdrop...',
          ),
        )
        .then(result => MyDialog.make('result: ' + JSON.stringify(result)))
    },
  },
]
*/
