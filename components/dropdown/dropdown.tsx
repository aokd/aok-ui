import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { ThemeConsumer, ThemeConsumerProps } from '../theme-context'

interface Props {}

export class Dropdown extends React.Component<Props> {
  static propTypes = {

  }

  static defaultPorps = {

  }

  render() {
    return <ThemeConsumer>{ this.renderDropdown }</ThemeConsumer>
  }

  private renderDropdown = ({ getPrefixCls }: ThemeConsumerProps) => {
    return null
  }
}
