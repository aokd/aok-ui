import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { tuple } from '../_util/type'
import { ThemeConsumer, ThemeConsumerProps } from '../theme-context'

export const ButtonSizes = tuple('large', 'default', 'small')
type ButtonSize = (typeof ButtonSizes)[number]
export const ButtonTypes = tuple('default', 'primary', 'danger')
type ButtonType = (typeof ButtonTypes)[number]

export interface ButtonProps {
  size: ButtonSize
  type: ButtonType
  prefixCls?: string
  loading?: boolean
  className?: string
}

export class Button extends React.Component<ButtonProps> {
  static propTypes = {
    className: PropTypes.string,
    loading: PropTypes.string,
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(ButtonSizes),
    type: PropTypes.oneOf(ButtonTypes),
  }
  render() {
    return (
      <ThemeConsumer>{ this.renderButton }</ThemeConsumer>
    )
  }

  private renderButton = ({ getPrefixCls }: ThemeConsumerProps) => {
    const {
      prefixCls: customPrefixCls,
      className,
      type,
      size,
    } = this.props
    const prefixCls = getPrefixCls('btn', customPrefixCls)
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
    })
    return (
      <button className={classes}>
        { this.props.children }
      </button>
    )
  }
}
