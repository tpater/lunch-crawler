const moment = require('moment')
const parserHelper = require('./helpers/awokadoParserHelper')
const ParserError = require('../../errors/parserError')

const PARSER_NAME = 'awokadoParser'
const SELECTOR = '.responsive-tabs .tabcontent'

const awokadoParser = $ => {
  let tabContents = $(SELECTOR).toArray()
  // let know what happened if array is empty - site structure changed
  if (!tabContents.length) {
    throw new ParserError(`Site structure changed, review parsing strategy for ${PARSER_NAME}`)
  }
  //  get rid of 1st(breakfast menu) and last element (other stuff menu)
  tabContents = parserHelper.filterOutFirstAndLast(tabContents)
  if (tabContents.length !== 5) {
    throw new ParserError(`${PARSER_NAME} should be able to fetch menu for the whole week,
     instead it has ${tabContents.length} items`)
  }
  const dow = moment().isoWeekday()
  const text = $(tabContents[dow - 1]).text()
  return parserHelper.sanitizeText(text)
}

module.exports = awokadoParser
