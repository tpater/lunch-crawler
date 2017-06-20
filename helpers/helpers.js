const getPublicModelObj = (data) => {
  const publicModel = data.substring(data.indexOf('publicModel'))
  return JSON.parse(publicModel.substring(0, publicModel.indexOf(';')).split(' = ')[1])
}

const buildMenu = (arr) => {
  let result = []
  return result.concat(arr.slice(0, 3).join(' '), arr.slice(3, 6).join(' '), arr.slice(6, 9).join(' '))
}

module.exports = {
  buildMenu,
  getPublicModelObj
}
