import * as demo from 'aok/button/demos/basic.md'
import * as api from 'aok/button/indx.zh-CN.md'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

console.info((api as any).source)
const Component = (demo as any).source
const rootEle = document.querySelector('#root')
ReactDOM.render(
  <Component/>,
  rootEle,
)
