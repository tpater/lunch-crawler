const moment = require('moment')

const sanitizeText = (text) => {
  return text.split('\n').filter((val) => Boolean(val))
}

const awokadoParser = $ => {
  let tabContents = $('.responsive-tabs .tabcontent').toArray()
  //  get rid of 1st and last element
  tabContents = tabContents.filter((el, index, arr) => index > 0 && index < arr.length - 1)
  const dow = moment().isoWeekday()
  if (dow > 5) {
    return 'No lunch menu today. Sorry!'
  }
  const text = $(tabContents[dow - 1]).text()
  return sanitizeText(text)
}

module.exports = awokadoParser
