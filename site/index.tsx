import * as React from 'react'
import * as ReactDOM from 'react-dom'
import yaml from './routes/config.yaml'

console.info(JSON.parse(yaml))
const rootEle = document.querySelector('#root')
ReactDOM.render(<div>site</div>, rootEle)
