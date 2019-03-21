import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Docs from '../components/button/index.zh-CN.md'
import { ComponentDemo } from './pages/ComponentDemo'
import { Main } from './pages/Main'
import './static'

const rootEle = document.querySelector('#root')

ReactDOM.render(
  <Router>
    <div>
      <Route path='/' component={ Main }/>
      <ComponentDemo/>
    </div>
  </Router>,
  rootEle,
)
