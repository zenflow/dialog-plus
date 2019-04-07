/* eslint-env jest */

import { Dialogplus } from './dialogplus.js'

describe('Dialogplus', () => {
  it('Dialogplus.fire({content})', () => {
    const dialog = Dialogplus.create({ content: '<p>test</p>' })
    expect(dialog.container.elm).toMatchSnapshot()
  })
})
