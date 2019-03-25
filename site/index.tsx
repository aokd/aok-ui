import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ComponentDemo } from './pages/ComponentDemo'
import { Main } from './pages/Main'
import './static'

const rootEle = document.querySelector('#root')

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route path='/index' component={ Main }/>
      <ComponentDemo/>
    </React.Fragment>
  </Router>,
  rootEle,
)
