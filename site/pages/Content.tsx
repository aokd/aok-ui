import * as React from 'react'
import CSSModules from 'react-css-modules'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { RouteLink } from 'site/pages/components/RouteLink'
import { Layout } from 'site/pages/Layout'
import menus from 'site/routes'
import styleNames from 'site/static/content.styl'

const ComponentPathReg = /^\/components\/([\w]+)$/i
const DocsPathRef = /^\/docs$/g

@CSSModules(styleNames)
export class Content extends React.PureComponent<RouteComponentProps> {
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
                    label={ `${comTitle} ${subTitle}`}
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
    try {
      const Component = require(`../../components/${comPath}/index.zh-CN.md`).Docs
      return Component && <Component/>
    } catch (e) {
      return <Redirect to='/index'/>
    }
  }

  private renderMainContainer() {
    const { url } = this.props.match

    if (ComponentPathReg.exec(url)) {
      return this.renderDemo(RegExp.$1)
    } else if (DocsPathRef.test(url)) {
      return <div>docs</div>
    }
  }
}
