import * as React from 'react';

export interface HeaderProps {
}

export default class Header extends React.Component<HeaderProps> {
  public render() {
    return (
      <header id='header'>
        AokUI
      </header>
    )
  }
}
