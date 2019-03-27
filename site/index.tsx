import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Content } from 'site/pages/Content'
import { Main } from 'site/pages/Main'
import 'site/static'

const rootEle = document.querySelector('#root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/index' component={ Main }/>
      <Route exact path='/docs' component={ Content }/>
      <Route exact path='/components/:component' component={ Content }/>
      <Redirect to='/index'/>
    </Switch>
  </Router>,
  rootEle,
)
