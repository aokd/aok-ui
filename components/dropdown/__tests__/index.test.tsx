import { render } from 'enzyme'
import React from 'react'
import Dropdown from '..'

describe('Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = render(<Dropdown>Demo</Dropdown>)
    expect(wrapper).toMatchSnapshot()
  })
})
