import { render } from 'enzyme'
import React from 'react'
import At from '..'

describe('At', () => {
  it('renders correctly', () => {
    const wrapper = render(<At>Demo</At>)
    expect(wrapper).toMatchSnapshot()
  })
})
