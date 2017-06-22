const getPublicModelObj = (data) => {
  const publicModel = data.substring(data.indexOf('publicModel'))
  return JSON.parse(publicModel.substring(0, publicModel.indexOf(';')).split(' = ')[1])
}

const buildTarasyMenu = (html) => {
  return [
    html.substring(html.indexOf('VEGE'), html.indexOf('M&B')),
    html.substring(html.indexOf('M&B'), html.indexOf('TRZECI')),
    html.substring(html.indexOf('TRZECI'))
  ]
}

module.exports = {
  buildTarasyMenu,
  getPublicModelObj
}
