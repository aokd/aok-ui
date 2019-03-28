import * as React from 'react'
import CSSModules from 'react-css-modules'
import styleNames from 'site/static/layout.styl'

@CSSModules(styleNames)
export class Layout extends React.PureComponent {
  render() {
    const children = React.Children.toArray(this.props.children)

    return (
      <div styleName='page-wrapper'>
        <header/>
        <div styleName='main-wrapper'>
          <div styleName='main-menu'>
            { children[0] }
          </div>
          <div styleName='main-content'>
            { children[1] }
          </div>
        </div>
      </div>
    )
  }
}
