const freshParser = $ => {
  let freshMenu = {}
  const soups = $('.soups')
    .parent()
    .find('ul')
    .first()
    .find('li').toArray()
  freshMenu.soups = soups.map(soup => $(soup).find('span').text())

  const mainDishes = $('.maindishes')
    .parent()
    .find('ul')
    .last()
    .find('li').toArray()
  freshMenu.mainDishes = mainDishes.map(dish => $(dish).find('span').text())
  return freshMenu
}

module.exports = freshParser
