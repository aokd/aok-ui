import * as React from 'react';

export interface MainContentProps {
}

export default class MainContent extends React.Component<MainContentProps> {
  componentDidMount() {
    console.info(this.props)
  }

  componentDidUpdate() {
    console.info(this.props)
  }

  public render() {
    return (
      <div>
        nihao
      </div>
    )
  }
}
