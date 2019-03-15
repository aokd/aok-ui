import * as React from 'react'

export default class Demo extends React.Component<any> {

  state = {
    codeExpand: false,
  }

  render() {
    const { state, props } = this
    const { meta, src, content, toComponent, hightlightedCode, style } = props
    console.info(props)
    return (
      <section id={ meta.id }>
        <section>nihao</section>
      </section>
    )
  }
}
