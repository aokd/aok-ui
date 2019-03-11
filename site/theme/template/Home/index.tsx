import * as React from 'react'
import { Footer } from '../Layout/Footer'
import Banner from './Banner'
import Page1 from './Page1'
import Page2 from './Page2'

function getStyle () {
  return `
    #header {
      margin: 20px auto 0
    }
  `
}

export default class Home extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <style dangerouslySetInnerHTML={{ __html: getStyle() }}/>
        <Banner/>
        <Page1/>
        <Page2/>
        <Footer/>
      </React.Fragment>
    )
  }
}
