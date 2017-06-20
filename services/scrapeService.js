const requestPromise = require('request-promise')
const moment = require('moment')
const cheerio = require('cheerio')
const ztService = require('./zieloneTarasyService')
const helpers = require('../helpers/helpers')

const transform = (body) => cheerio.load(body)

const sanitizeText = (text) => {
  return text.split('\n').filter((val) => Boolean(val))
}

const getAwokadoMenu = () => {
  const options = {
    uri: 'http://awokado.krakow.pl/lunch-bar/menu/',
    transform
  }

  return requestPromise(options)
    .then($ => {
      let tabContents = $('.responsive-tabs .tabcontent').toArray()
      //  get rid of 1st and last element
      tabContents = tabContents.filter((el, index, arr) => index > 0 && index < arr.length - 1)
      const dow = moment().isoWeekday()
      if (dow > 5) {
        return 'No lunch menu today. Sorry!'
      }
      const text = $(tabContents[dow - 1]).text()
      return sanitizeText(text)
    })
    .catch(e => console.log(`Error calling ${options.uri}: `, e))
}

const getFreshMenu = () => {
  const options = {
    uri: 'http://www.fresh-krakow.pl/menu',
    transform
  }

  return requestPromise(options)
    .then($ => {
      let freshMenu = {}
      const soups = $('.soups')
        .parent()
        .find('ul')
        .first()
        .find('li').toArray()
      freshMenu.soups = soups.map(soup => $(soup).find('span').text())

      const mainDishes = $('.maindishes')
        .parent()
        .find('ul')
        .last()
        .find('li').toArray()
      freshMenu.mainDishes = mainDishes.map(dish => $(dish).find('span').text())
      return freshMenu
    })
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
    .then(pageObj => {
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
    })
    .catch(e => console.log(`Error calling ${options.uri}: `, e))
}

const getMenus = () => {
  return Promise.all([
    getFreshMenu(),
    getAwokadoMenu(),
    getZieloneTarasyMenu()
  ])
}

module.exports = {
  getMenus
}
