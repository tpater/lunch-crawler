const helpers = require('../../helpers/helpers')
const ztService = require('../zieloneTarasyService')

const ztParser = $ => {
  const page = $.html()
  return ztService.getZieloneTarasyPageObj(page)
    .then(pageObj => {
      const menuObj = JSON.parse(pageObj)
      const menuHTML = menuObj['data']['document_data']['c2pd']['text']

      return helpers.buildTarasyMenu(stripHTML(menuHTML))
    })
}

const stripHTML = html => {
  const tagMap = [
    '<p class="font_8" style="text-align: center;">',
    '</p>',
    'amp;',
    '<span class="wixGuard">​</span></p>'
  ]
  const re = new RegExp(tagMap.join('|'), 'g')
  return html.replace(re, '').replace(/\r?\n|\r/g, ' ')
}

module.exports = ztParser
