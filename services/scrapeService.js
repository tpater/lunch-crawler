const requestPromise = require('request-promise')
const cheerio = require('cheerio')
const ztService = require('./zieloneTarasyService')
const awokadoParser = require('./parsers/awokadoParser')
const freshParser = require('./parsers/freshParser')
const ztParser = require('./parsers/ztParser')

const AWOKADO_MENU_URI = 'http://awokado.krakow.pl/lunch-bar/menu/'
const FRESH_MENU_URI = 'http://www.fresh-krakow.pl/menu'

const transform = (body) => cheerio.load(body)

const getMenu = (uri, parser) => {
  const options = {uri, transform}
  return requestPromise(options)
    .then(parser)
    .catch(e => console.log(`Error calling ${options.uri}: `, e))
}

const getZieloneTarasyMenu = () => {
  const options = {
    uri: 'https://www.zielone-tarasy.eu/'
  }

  return requestPromise(options)
    .then(data => {
      return ztService.getZieloneTarasyPageObj(data)
    })
    .then(ztParser)
    .catch(e => console.log(`Error calling ${options.uri}: `, e))
}

const getMenus = () => {
  return Promise.all([
    getMenu(FRESH_MENU_URI, freshParser),
    getMenu(AWOKADO_MENU_URI, awokadoParser),
    getZieloneTarasyMenu()
  ])
}

module.exports = {getMenus}
