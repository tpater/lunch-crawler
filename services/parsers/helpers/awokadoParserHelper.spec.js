const test = require('tape')
const helper = require('./awokadoParserHelper')

const fixture = `
  Dish 1   
     Dish 2
  Dish 3
`

test('sanitizeText', assert => {
  const expected = ['Dish 1', 'Dish 2', 'Dish 3']
  const actual = helper.sanitizeText(fixture)

  actual.forEach((item, index) => {
    assert.notEqual(item, `Dish ${index + 1}   `, 'item should not contain trailing whitespaces')
    assert.notEqual(item, '', 'item should not be empty string')
  })
  assert.deepEqual(actual, expected, 'should return array of three sanitized items')
  assert.end()
})
