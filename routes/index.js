const express = require('express')
const router = express.Router()
const scrapeService = require('../services/scrapeService')
const moment = require('moment')

router.get('/', (req, res) => {

  scrapeService.getMenus()
    .then(menus => {
      console.log(menus)
      res.render('index', {
        title: 'Lunch w okolicy REGENT OFFICE',
        today: moment().format('DD.MM.YYYY'),
        menus
      })
    })
})

module.exports = router
