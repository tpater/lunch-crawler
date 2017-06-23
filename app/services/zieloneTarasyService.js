const requestPromise = require('request-promise')
const helpers = require('../helpers/helpers')

const getZieloneTarasyPageObj = (data) => {
  let uri = ''
  const publicModelObj = helpers.getPublicModelObj(data)

  publicModelObj['pageList']['pages'].forEach((page) => {
    if (page.title === 'AKTUALNOŚCI') {
      uri = 'https://static.wixstatic.com/sites/' + page.pageJsonFileName + '.z'
    }
  })

  return requestPromise({
    uri: uri
  })
    .catch(e => console.log(`Error calling ${uri}: `, e))
}

module.exports = {
  getZieloneTarasyPageObj
}
