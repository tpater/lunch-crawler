const helpers = require('../../helpers/helpers')
const cheerio = require('cheerio')

const ztParser = pageObj => {
  let pageHTML = JSON.parse(pageObj)['data']['document_data']['c2pd']['text']
  let $ = cheerio.load(pageHTML)
  let nodesArray = []
  let nodes = $('p').contents()

  //  make an array from objects
  for (let node in nodes) {
    if (nodes.hasOwnProperty(node) && typeof nodes[node].data !== 'function' && nodes[node].data) {
      nodesArray.push(nodes[node].data)
    }
  }

  return helpers.buildMenu(nodesArray)
}

module.exports = ztParser
