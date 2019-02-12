import * as React from 'react';
import Header from './Header'
import '../../static/style'

export interface LayoutProps {
}

export default class Layout extends React.Component<LayoutProps> {
  public render() {
    const { children } = this.props
    return (
      <div className='page-wrapper'>
        <Header/>
        {children}
      </div>
    )
  }
}
