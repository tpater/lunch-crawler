const getPublicModel = (data) => {
  let publicModel = data.substring(data.indexOf('publicModel'))
  return JSON.parse(publicModel.substring(0, publicModel.indexOf(';')).split(' = ')[1])
}

module.exports = {
  getPublicModel
}
