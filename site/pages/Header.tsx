import * as React from 'react'
import CSSModules from 'react-css-modules'
import styleNames from 'site/static/header.styl'

@CSSModules(styleNames)
export class Header extends React.PureComponent {
  render() {
    return (
      <header styleName='page-header'>
        Aok
      </header>
    )
  }
}
