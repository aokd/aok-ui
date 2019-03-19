import * as demo from 'aok/button/demos/basic.md'
import * as api from 'aok/button/index.zh-CN.md'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './static/index.styl'

const Docs = (api as any).Docs
const Component = (demo as any).source
const rootEle = document.querySelector('#root')
ReactDOM.render(
  <div>
    <Docs/>
  </div>,
  rootEle,
)
