import demo from 'aok/button/demos/basic.md'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Component = demo
const rootEle = document.querySelector('#root')
ReactDOM.render(
  <Component/>,
  rootEle,
)
