import * as PropTypes from 'prop-types'
import * as React from 'react'

export interface ButtonProps {
  size: 'large' | 'default' | 'small'
}

export class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <div>
        button
      </div>
    )
  }
}
