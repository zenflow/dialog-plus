/* eslint-env jest */

import DialogPlus from './main.js'

describe('DialogPlus', () => {
  it('DialogPlus(string)', () => {
    expect(DialogPlus('cool')).toMatchSnapshot()
  })
})
