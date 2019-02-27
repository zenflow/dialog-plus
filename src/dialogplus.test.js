/* eslint-env jest */

import { Dialogplus } from './dialogplus.js'

describe('Dialogplus', () => {
  it('Dialogplus.fire({content})', () => {
    const dialog = Dialogplus.fire({ content: '<p>test</p>' })
    expect(dialog.elements.container).toMatchSnapshot()
  })
})
