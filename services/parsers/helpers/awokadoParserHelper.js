const sanitizeText = (text) => {
  return text
    .split('\n')
    .filter(val => Boolean(val))
    .map(val => val.trim())
}

const isFirstOrLastElement = (el, index, arr) => index > 0 && index < arr.length - 1

const filterOutFirstAndLast = (arr) => arr.filter(isFirstOrLastElement)

module.exports = {sanitizeText, filterOutFirstAndLast}
