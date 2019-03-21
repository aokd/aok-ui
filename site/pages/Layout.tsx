import * as React from 'react'
import CSSModules from 'react-css-modules'
import styleNames from '../static/layout.styl'

export interface LayoutProps {
}

// @CSSModules(styleNames)
export class Layout extends React.Component<LayoutProps, any> {
  render() {
    const children = React.Children.toArray(this.props.children)

    return (
      <div>
        <header/>
        <div>
          <div>
            { children[0] }
          </div>
          <div>
            { children[1] }
          </div>
        </div>
      </div>
    )
  }
}
