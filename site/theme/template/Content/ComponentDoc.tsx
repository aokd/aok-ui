import * as React from 'react'
import Demo from './Demo'

interface ComponentDocProps {
  doc: any
  demos: any
  utils?: any
  toComponent?: any
}

export default class ComponentDoc extends React.Component<ComponentDocProps, any> {

  constructor(props) {
    super(props)
    this.state = {
      expandAll: false
    }
  }
  
  render() {
    const { props } = this
    console.info(props)
    const { doc } = props
    const { meta } = doc
    const demos = Object.keys(props.demos).map((key) => props.demos[key])
    const { expandAll } = this.state

    const isSingleCol = meta.cols === 1
    const leftChildren = []
    const rightChildren = []

    demos
      .sort((a, b) => a.meta.order - b.meta.order)
      .forEach((demoData, index) => {
        console.info(demoData)
        const demoElem = (
          <Demo
            {...demoData}
            key={demoData.meta.filename}
            utils={props.utils}
            toComponent={ this.props.toComponent }
            expand={expandAll}
            location={location}
          />
        );
        if (index % 2 === 0 || isSingleCol) {
          leftChildren.push(demoElem);
        } else {
          rightChildren.push(demoElem);
        }
      })
  
    return (
      <div>
        { leftChildren }
        { rightChildren }
      </div>
    )
  }
}
