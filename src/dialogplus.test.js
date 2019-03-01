/* eslint-env jest */

import { Dialogplus } from './dialogplus.js'

describe('Dialogplus', () => {
  it('Dialogplus.fire({content})', () => {
    const dialog = Dialogplus.create({ content: '<p>test</p>' })
    // Arggg so bad! need to `expect` *after* a wait on the micro tast queue
    return Promise.resolve().then(() => {
      expect(dialog.elements.container).toMatchSnapshot()
    })
  })
})
