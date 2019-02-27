import { examples } from './examples'

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
    console.log(`"${id}": started`)
    fn()
      .catch(console.error)
      .then(() => {
        console.log(`"${id}": finished`)
      })
  })
  liEl.appendChild(preEl)
}
