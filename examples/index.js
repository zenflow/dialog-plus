import { Dialogplus } from '../.'

const MyDialog = Dialogplus.withOptions({
  content: 'default content',
  cancelOnBackdropClick: true,
})

const examples = [
  {
    id: 'fireAlert',
    // desc: 'some description',
    fn() {
      return Promise.resolve(MyDialog.fireAlert('custom content'))
    },
  },
  {
    id: 'cancelOnBackdropClick',
    fn() {
      // TODO: first use true, then use false, and a setTimeout to call `cancel`
      return Promise.resolve(MyDialog.fire({ cancelOnBackdropClick: false }))
    },
  },
]

const mainEl = document.getElementById('main')

const olEl = document.createElement('ol')
mainEl.appendChild(olEl)

for (const { id, desc, fn } of examples) {
  const liEl = document.createElement('li')
  olEl.appendChild(liEl)

  const aEl = document.createElement('a')
  aEl.innerText = id
  aEl.id = id
  aEl.href = `#${id}`
  liEl.appendChild(aEl)

  if (desc) {
    const pEl = document.createElement('p')
    pEl.innerText = desc
    liEl.appendChild(pEl)
  }

  const preEl = document.createElement('pre')
  preEl.innerText = fn.toString()
  preEl.addEventListener('click', () => {
    console.log(`started example "${id}"`)
    fn()
      .catch(console.error)
      .then(() => {
        console.log(`finished example "${id}"`)
      })
  })
  liEl.appendChild(preEl)
}

Object.assign(window, {
  MyDialog,
})
