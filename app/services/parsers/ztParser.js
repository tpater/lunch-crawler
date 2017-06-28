const striptags = require('striptags')
const wixCrawler = require('../wixCrawler')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

const ztParser = () => {
  return wixCrawler.crawl('https://www.zielone-tarasy.eu/', 'aktualności')
    .then(pageObj => {
      const menuObj = JSON.parse(pageObj)
      const menuHTML = menuObj['data']['document_data']['c2pd']['text']
      const plainText = striptags(menuHTML)
      const decodedString = entities.decode(plainText)
      return buildTarasyMenu(decodedString)
    })
}

const buildTarasyMenu = (html) => {
  return [
    html.substring(html.indexOf('VEGE'), html.indexOf('M&B')),
    html.substring(html.indexOf('M&B'), html.indexOf('TRZECI')),
    html.substring(html.indexOf('TRZECI'))
  ]
}

module.exports = ztParser
