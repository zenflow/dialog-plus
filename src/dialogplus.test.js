/* eslint-env jest */

import { Dialogplus } from './dialogplus.js'

describe('Dialogplus', () => {
  it('Dialogplus(string)', () => {
    const dialog = Dialogplus.fire({ content: '<p>test</p>' })
    expect(dialog).toMatchSnapshot()
  })
})
