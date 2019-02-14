require('../../static/style')
import * as React from 'react';
import Header from './Header'

export interface LayoutProps {
}

export default class Layout extends React.Component<LayoutProps> {
  public render() {
    const { children, ...restProps } = this.props
    return (
      <div className='page-wrapper'>
        <Header {...restProps}/>
        {children}
      </div>
    )
  }
}
