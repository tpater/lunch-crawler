const requestPromise = require('request-promise')

const getZieloneTarasyPageObj = (data) => {
  const publicModel = data.substring(data.indexOf('publicModel'))
  const publicModelObj = JSON.parse(publicModel.substring(0, publicModel.indexOf(';')).split(' = ')[1])
  let uri = ''
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
