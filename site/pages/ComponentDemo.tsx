import * as React from 'react'
import CSSModules from 'react-css-modules'
import { Route, RouteProps } from 'react-router-dom'
import menus from '../routes'
import styleNames from '../static/demo.styl'
import { RouteLink } from './components/RouteLink'
import { Layout } from './Layout'

@CSSModules(styleNames)
export class ComponentDemo extends React.PureComponent<RouteProps> {
  render() {
    return (
      <Layout>
        { this.renderMainMenu() }
        { this.renderMainContainer() }
      </Layout>
    )
  }

  private renderMainMenu() {
    const menuItems = menus.map((menuItem: any) => {
      const { title, path, groups } = menuItem
      if (!groups || groups.length === 0) {
        return (
          <RouteLink
            key={ path }
            path={ `/${path}` }
            label={ title }
            level={ 1 }
          />
        )
      }
      return (
        <li key={ path } styleName='menu-item'>
          <div styleName='group-title'>{ title }</div>
          <ul>
            {
              groups.map((subMenuItem: any) => {
                const { title: comTitle, subTitle, path: comPath } = subMenuItem
                const fullPath = `/${path}/${comPath}`
                return (
                  <RouteLink
                    key={ fullPath }
                    path={ fullPath }
                    label={ `${comTitle}${subTitle}`}
                    level={ 2 }
                  />
                )
              })
            }
          </ul>
        </li>
      )
    })
    return (
      <ul>{ menuItems }</ul>
    )
  }

  private renderDemo(comPath: string) {
    const Component = require(`../../components/${comPath}/index.zh-CN.md`).Docs
    return <Component/>
  }

  private renderMainContainer() {
    return menus.map((menu: any) => {
      const { path, groups } = menu
      if (groups && groups.length > 0) {
        return groups.map((component: any) => {
          const { path: comPath } = component
          const ComponentPath = `/${path}/${comPath}`
          return (
            <Route
              key={ ComponentPath }
              path={ ComponentPath }
              children={ this.renderDemo(comPath) }
            />
          )
        })
      }
      return null
    })
  }
}
