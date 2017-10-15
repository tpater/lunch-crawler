const express = require('express')
const router = express.Router()
const scrapeService = require('../services/scrapeService')
const moment = require('moment')

const isWeekend = moment().isoWeekday() > 5

const fetchMenus = (res) => {
  scrapeService.getMenus()
    .then(menus => {
      res.render('index', {
        title: 'Lunch w okolicy REGENT OFFICE',
        today: moment().format('DD.MM.YYYY'),
        menus
      })
    })
}

//  TODO: Additional information
const showWeekendInfo = (res) => {
  res.render('weekend', {
    message: 'Dzisiaj mamy weekend!'
  })
}

router.get('/', (req, res) => {
  if (isWeekend) {
    showWeekendInfo(res)
  } else {
    fetchMenus(res)
  }
})

module.exports = router
