import * as React from 'react'

export default class Content extends React.Component {

  render() {
    console.info(this.props)
    return (
      <div>content</div>
    )
  }
}