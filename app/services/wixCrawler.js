const requestPromise = require('request-promise')
const co = require('co')

/***
 * Returns crawled page object from wix base sites
 *
 * @param uri
 * @param pageTitle
 * @returns {*}
 */
const crawlWix = (uri, pageTitle) => {
  const options = {uri}

  return co(function * () {
    const wixPage = yield requestPromise(options)
    const wixPageObj = getPublicModelObj(wixPage)
    const jsonUrl = findPageJSON(wixPageObj, pageTitle)
    return requestPromise({uri: jsonUrl})
  })
}

/***
 * Returns desired wix page json uri based on page object and title
 *
 * @param pageObj
 * @param pageTitle
 * @returns {string}
 */
const findPageJSON = (pageObj, pageTitle) => {
  const allPages = pageObj['pageList']['pages']
  for (let i = 0, len = allPages.length; i < len; i++) {
    if (allPages[i].title === pageTitle.toUpperCase()) {
      return 'https://static.wixstatic.com/sites/' + allPages[i].pageJsonFileName + '.z'
    }
  }
}

/***
 * Return page object form parsed wix site
 *
 * @param data
 * @returns {json}
 */
const getPublicModelObj = (data) => {
  const publicModel = data.substring(data.indexOf('publicModel'))
  return JSON.parse(publicModel.substring(0, publicModel.indexOf(';')).split(' = ')[1])
}

module.exports = {
  crawlWix
}
