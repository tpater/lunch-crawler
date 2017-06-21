const helpers = require('../../helpers/helpers')
const ztService = require('../zieloneTarasyService')

const ztParser = $ => {
  const page = $.html()
  return ztService.getZieloneTarasyPageObj(page)
    .then(pageObj => {
      const menuObj = JSON.parse(pageObj)
      const menuHTML = menuObj['data']['document_data']['c2pd']['text']
      const tagMap = [
        '<p class="font_8" style="text-align: center;">',
        '</p>',
        '<span class="wixGuard">​</span></p>'
      ]
      const re = new RegExp(tagMap.join('|'), 'g')
      const strippedHTML = menuHTML.replace(re, '').replace(/\r?\n|\r/g, ' ')

      return helpers.buildTarasyMenu(strippedHTML)
    })
}

module.exports = ztParser
