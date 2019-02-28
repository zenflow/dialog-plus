import { MyDialog } from './my-dialog'

export const examples = [
  {
    id: 'different ways to fire',
    fn() {
      // TODO MyDialog.fireSwal, MyDialog.for, etc
      return MyDialog.fireAlert('custom content')
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
      return MyDialog.fire({ content })
    },
  },
  {
    id: 'cancelling',
    fn() {
      const dialog = MyDialog.fire({
        content: 'wait a couple seconds...',
        cancelOnBackdropClick: false,
      })
      setTimeout(() => dialog.cancel('my-timeout'), 2000)
      return dialog
        .then(result =>
          MyDialog.fireAlert(
            'result: ' +
              JSON.stringify(result) +
              '<hr/>now click the backdrop...',
          ),
        )
        .then(result => MyDialog.fireAlert('result: ' + JSON.stringify(result)))
    },
  },
]

// note: desc property is also supported
