import { render } from 'enzyme'
import React from 'react'
import Button from '..'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>Demo</Button>)
    expect(wrapper).toMatchSnapshot()
  })
})
