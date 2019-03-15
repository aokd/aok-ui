import * as React from 'react'
import { Link } from 'bisheng/router'
import ComponentDoc from './ComponentDoc'
import * as utils from '../util'

export interface MainContentProps {
  themeConfig: {
    categoryOrder: {
      [key: string]: number
    },
    typeOrder: {
      [key: string]: number
    }
  },
  picked: any,
  localizedPageData: any,
  demos: any,
  utils: any,
}

export default class MainContent extends React.Component<MainContentProps> {

  render() {
    const { props } = this
    console.info(props)
    const MenuItems = this.getMenuItems()

    return (
      <React.Fragment>
        <section className='side-bar'>
          { MenuItems }
        </section>
        <section className='main-content'>
          <ComponentDoc {...props} doc={ props.localizedPageData} demos={ props.demos } toComponent={ this.toComponent } />
        </section>
      </React.Fragment>
    )
  }

  private toComponent = (content: any) => {
    if (!Array.isArray(content)) {
      return null
    }

    const [tag, headingText] = content
    if (tag.match(/h[1-4]/)) {
      const id = headingText.trim().replace(/(\s|\.|\(|\))+/g, '-')
      content = [tag, ['a', { href: `#${id}`, id }, headingText]]
    }

    return this.props.utils.toReactComponent([...content])
  }

  private getMenuItems () {
    const { themeConfig, picked } = this.props
    const { categoryOrder, typeOrder } = themeConfig
    const moduleData = [...picked.components]
    const menuItems = utils.getMenuItems(moduleData, categoryOrder, typeOrder)

    return menuItems.map(menuItem => {
      if (menuItem.children) {
        return (
          <div key={ menuItem.title }>
            <h4>
              {
                menuItem.children.map((child) => {
                  if (child.type === 'type') {
                    return (
                      <li key={ child.title }>
                        { child.title }
                        {
                          child.children.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                          .map((leaf) => this.generateMenuItem(false, leaf) )
                        }
                      </li>
                    )
                  }
                })
              }
            </h4>
          </div>
        )
      }
      return this.generateMenuItem(true, menuItem)
    })
  }

  private generateMenuItem = (isTop, leaf) => {
    const url = leaf.filename.replace(/(\/index)?\.md$/i, '')
    const text = isTop ? leaf.title : [
      <span key={ leaf.title }>{ leaf.title }</span>,
      <span key={ leaf.subtitle }>{ leaf.subtitle }</span>
    ]
    
    return (
      <Link to={ /^components/.test('components') ? `${url}/` : url } key={ url }>
        { text }
      </Link>
    )
  }
}
