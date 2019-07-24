import classNames from 'classnames'
import * as React from 'react'
import { Link, Route } from 'react-router-dom'

interface Props { label: string, path: string, level: number }

export const RouteLink = (props: Props) => {
  const { path, level, label } = props
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
