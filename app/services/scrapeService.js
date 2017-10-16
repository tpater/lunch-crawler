const requestPromise = require('request-promise')
const cheerio = require('cheerio')
const awokadoParser = require('./parsers/awokadoParser')
// const freshParser = require('./parsers/freshParser')
const ztParser = require('./parsers/ztParser')

const AWOKADO_MENU_URI = 'http://awokado.krakow.pl/lunch-bar/menu/'
// const FRESH_MENU_URI = 'http://www.fresh-krakow.pl/menu'
const ZIELONE_MENU_URI = 'https://www.zielone-tarasy.eu/'

const transform = (body) => cheerio.load(body)

const getMenu = (uri, parser) => {
  const options = {uri, transform}
  return requestPromise(options)
    .then(parser)
    .catch(e => console.log(`Error calling ${options.uri}: `, e))
}

const getMenus = () => {
  return Promise.all([
    //  TODO: create new scraper for fresh
    // getMenu(FRESH_MENU_URI, freshParser),
    getMenu(AWOKADO_MENU_URI, awokadoParser),
    getMenu(ZIELONE_MENU_URI, ztParser)
  ])
}

module.exports = {getMenus}
