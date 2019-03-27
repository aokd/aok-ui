import * as React from 'react'
import CSSModules from 'react-css-modules'
import styleNames from '../static/layout.styl'

const Links = [{
  label: 'Github',
  href: 'https://github.com/aokd/aok-ui',
  outer: true
}, {
  label: 'AliPay',
  href: 'https://www.baidu.com'
}]

export interface LayoutProps {
}

@CSSModules(styleNames)
export class Layout extends React.Component<LayoutProps, any> {
  render() {
    const [ menu, content ] = React.Children.toArray(this.props.children)

    return (
      <div styleName='page-wrapper'>
        <header styleName='header'>
          <div styleName='logo'>
            <span>AOK</span>
          </div>
          <div styleName='link-group'>
            {
              Links.map(link => {
                const target = link.outer ? '_blank' : ''
                return (
                  <a
                    key={ link.href }
                    href={ link.href }
                    target={ target }>{ link.label }</a>
                )
              })
            }
          </div>
        </header>
        <div styleName='main-wrapper'>
          <nav styleName='navbar'>
            { menu }
          </nav>
          <div styleName='content'>
            { content }
          </div>
        </div>
      </div>
    )
  }
}
