import * as React from 'react'
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
  picked: any
}

export default class MainContent extends React.Component<MainContentProps> {

  componentDidMount() {
    console.info(this.props)
  }

  getMenuItems() {
    const { themeConfig, picked } = this.props
    const { categoryOrder, typeOrder } = themeConfig
    console.info(this.props)
    const moduleData = [...picked.components]
    const menuItems = utils.getMenuItems(moduleData, categoryOrder, typeOrder)
    return menuItems.map(menuItem => {
      if (menuItem.children) {
        return (
          <div>
            <h4>{menuItem}</h4>
          </div>
        )
      }
    })
  }

  public render() {
    const { props } = this
    const MenuItems = this.getMenuItems()

    return (
      <React.Fragment>
        <section className='side-bar'>
          { MenuItems }
        </section>
        <section className='main-content'>
          <ComponentDoc {...props}/>
        </section>
      </React.Fragment>
    )
  }
}
