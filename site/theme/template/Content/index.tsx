import MainContent from './MainContent'
import * as collect from 'bisheng/collect'

export default collect(async nextProps => {
  const { pathname } = nextProps.location
  const pageDataPath = pathname.split('/')
  const pageData = nextProps.utils.get(nextProps.data, pageDataPath)

  const pageDataPromise = pageData.index()
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo'])

  const [localizedPageData, demos] = await Promise.all([ pageDataPromise, demosFetcher()])
  return { localizedPageData, demos }
})(MainContent)