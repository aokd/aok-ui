import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { omit } from '../_util/omit'
import { tuple } from '../_util/type'
import { ThemeConsumer, ThemeConsumerProps } from '../theme-context'

const ButtonSizes = tuple('large', 'default', 'small')
type ButtonSize = (typeof ButtonSizes)[number]
const ButtonTypes = tuple('default', 'primary', 'danger')
type ButtonType = (typeof ButtonTypes)[number]
const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number]

export interface BaseButtonProps {
  className?: string
  loading?: boolean
  prefixCls?: string
  size: ButtonSize
  type: ButtonType
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
} & BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export type AnchorButtonProps = {
  href?: string,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
} & BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export type ButtonProps = NativeButtonProps | AnchorButtonProps

export class Button extends React.Component<ButtonProps> {
  static propTypes = {
    htmlType: PropTypes.oneOf(ButtonHTMLTypes),
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(ButtonSizes),
    type: PropTypes.oneOf(ButtonTypes),
  }

  static defaultProps = {
    loading: false,
    size: 'small',
    type: 'default'
  }

  buttonNode: HTMLElement | null = null

  render() {
    return <ThemeConsumer>{ this.renderButton }</ThemeConsumer>
  }

  private renderButton = ({ getPrefixCls }: ThemeConsumerProps) => {
    const {
      prefixCls: customPrefixCls,
      className,
      loading,
      type,
      size,
      children,
      ...rest
    } = this.props
    const prefixCls = getPrefixCls('btn', customPrefixCls)

    let sizeSuffix = ''
    switch (size) {
      case 'large':
        sizeSuffix = 'lg'
        break
      case 'small':
        sizeSuffix = 'sm'
        break
      default:
        break
    }
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${sizeSuffix}`]: sizeSuffix,
      [`${prefixCls}-${type}`]: type,
    })
    const anchorButtonRestProps = omit(rest as NativeButtonProps & AnchorButtonProps, ['htmlType'])

    if (anchorButtonRestProps.href !== undefined) {
      return (
        <a
          { ...anchorButtonRestProps }
          className={ classes }
          onClick={ this.handleClick }
          ref={ this.saveButtonNode }
        >
          { children }
        </a>
      )
    }

    const { htmlType, ...otherProps } = rest as NativeButtonProps

    return (
      <button
        { ...otherProps }
        type={ htmlType || 'button'}
        className={ classes }
        onClick={ this.handleClick }
        ref={ this.saveButtonNode }
      >
        { children }
      </button>
    )
  }

  private handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    const { loading, onClick } = this.props
    if (!!loading) {
      return
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }

  private saveButtonNode = (node: HTMLElement | null) => {
    this.buttonNode = node
  }
}
