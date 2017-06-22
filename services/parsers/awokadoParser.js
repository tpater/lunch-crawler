const moment = require('moment')
const parserHelper = require('./helpers/awokadoParserHelper')

const PARSER_NAME = 'awokadoParser'
const SELECTOR = '.responsive-tabs .tabcontent'
const NO_LUNCH_MESSAGE = 'No lunch menu today. Sorry!'

const awokadoParser = $ => {
  let tabContents = $(SELECTOR).toArray()
  // let know what happened if array is empty - site structure changed
  if (!tabContents.length) {
    throw new Error(`Site structure changed, review parsing strategy for ${PARSER_NAME}`)
  }
  //  get rid of 1st(breakfast menu) and last element (other stuff menu)
  tabContents = tabContents.filter(parserHelper.isFirstOrLastElement)
  const dow = moment().isoWeekday()
  if (dow > 5) {
    return NO_LUNCH_MESSAGE
  }
  const text = $(tabContents[dow - 1]).text()
  return parserHelper.sanitizeText(text)
}

module.exports = awokadoParser
