import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Content } from 'site/pages/Content'
import { Main } from 'site/pages/Main'
import 'site/static'

const rootEle = document.querySelector('#root')

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route path='/index' component={ Main }/>
      <Route path='/docs' component={ Content }/>
      <Route path='/components/:component' component={ Content }/>
    </React.Fragment>
  </Router>,
  rootEle,
)
