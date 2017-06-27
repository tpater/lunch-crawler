const wixCrawler = require('../wixCrawler')

const ztParser = $ => {
  return wixCrawler.crawl('https://www.zielone-tarasy.eu/', 'aktualności')
    .then(pageObj => {
      const menuObj = JSON.parse(pageObj)
      const menuHTML = menuObj['data']['document_data']['c2pd']['text']

      return buildTarasyMenu(stripHTML(menuHTML))
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

const buildTarasyMenu = (html) => {
  return [
    html.substring(html.indexOf('VEGE'), html.indexOf('M&B')),
    html.substring(html.indexOf('M&B'), html.indexOf('TRZECI')),
    html.substring(html.indexOf('TRZECI'))
  ]
}

module.exports = ztParser
