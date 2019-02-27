import { Dialogplus } from '../dist/dialogplus.cjs'

const MyDialog = Dialogplus.withOptions({
  content: 'default content',
  cancelOnBackdropClick: true,
})

export { MyDialog }
window.MyDialog = MyDialog
