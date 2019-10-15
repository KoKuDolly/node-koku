const express = require('express')
const router = express.Router()

const indexCtrl = require('../controller/indexCtrl.js')

router
  .get('/', (req, res) => {
    indexCtrl.showIndexPage(req, res)
  })
  .get('/api/approval-service/examine/report', (req, res) => {
    indexCtrl.handleReport(req, res)
  })

module.exports = router