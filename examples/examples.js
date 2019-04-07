import { Dialogplus } from '../dist/dialogplus.cjs'

window.Dialogplus = Dialogplus

export const examples = [
  {
    id: 'invokers',
    fn() {
      const MyDialog = Dialogplus.withOptions({ cancelOnBackdropClick: true })
      return MyDialog.make('custom content')
      // TODO: show more invokers
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
      return Dialogplus.create({ content })
    },
  },
  {
    id: 'cancellers',
    fn() {
      const dialog = Dialogplus.make('wait a couple seconds...')
      setTimeout(() => dialog.cancel('my-timeout'), 2000)
      return dialog.then(result =>
        Dialogplus.create({
          cancelOnBackdropClick: true,
          content:
            'result: ' +
            JSON.stringify(result) +
            '<hr/>now click the backdrop...',
        }).then(result => Dialogplus.make('result: ' + JSON.stringify(result))),
      )
    },
  },
]

// note: desc property is also supported
