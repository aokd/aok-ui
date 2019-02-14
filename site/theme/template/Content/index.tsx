import MainContent from './MainContent'
import * as collect from 'bisheng/collect'

export default collect(async nextProps => {
  console.info(nextProps)
  return nextProps
})(MainContent)