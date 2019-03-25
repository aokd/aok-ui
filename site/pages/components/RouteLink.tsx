import classNames from 'classnames'
import * as React from 'react'
import { Link, Route } from 'react-router-dom'

export const RouteLink = ({ label, path, level }: { label: string, path: string, level: number }) => {
  return (
    <Route
      key={ path }
      path={ path }
      children={({match}) => {
        const cls = classNames('menu-item', {
          'active-menu-item': !!match,
        })
        const style = { paddingLeft: `${level * 40}px` }
        return (
          <li key={ path } className={ cls } style={ style }>
            <Link to={ path }>{ label }</Link>
          </li>
        )}
      }
    />
  )
}
