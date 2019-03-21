import * as React from 'react'
import CSSModules from 'react-css-modules'
import { Link, Route, RouteProps } from 'react-router-dom'
import menus from '../routes'
import styleNames from '../static/demo.styl'
import { Layout } from './Layout'

export interface ComponentDemoProps extends RouteProps {
}

@CSSModules(styleNames)
export class ComponentDemo extends React.Component<ComponentDemoProps> {
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
          <li>
            <Link to={{ pathname: `/${path}` }}>{ title }</Link>
          </li>
        )
      }
      return (
        <li>
          { title }
          {
            groups.map((submenuItem: any) => {
              const { title: comTitle, subTitle, path: comPath, componentName } = submenuItem
              return (
                <Link to={{ pathname: `/${path}/${comPath}`}}>
                  {comTitle} {componentName}
                </Link>
              )
            })
          }
        </li>
      )
    })
    return (
      <div>{ menuItems }</div>
    )
  }

  private renderMainContainer() {
    console.info(this.props.location)
    return (
      <div>
        { this.generatorRoutes() }
      </div>
    )
  }

  private generatorRoutes() {

    return menus.map((menu: any) => {
      const { path, groups } = menu
      if (groups && groups.length > 0) {
        return groups.map((component: any) => {
          const { path: comPath } = component
          const Component = require(`../../components/${comPath}/index.zh-CN.md`).Docs
          return (
            <Route path={ `/${path}/${comPath}` } component={ Component } />
          )
        })
      }
      return null
    })
  }
}
