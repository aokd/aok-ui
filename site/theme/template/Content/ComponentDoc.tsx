import * as React from 'react'

interface ComponentDocProps {
}

export default class ComponentDoc extends React.Component<ComponentDocProps, any> {
  componentDidMount() {
    console.info(this.props)
  }
  public render() {
    return (
      <div>
        
      </div>
    )
  }
}
