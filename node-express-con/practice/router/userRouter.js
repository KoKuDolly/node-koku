const express = require('express')
const router = express.Router()

const userCtrl = require('../controller/userCtrl.js')

router
  .get('/register', (req, res) => {
    userCtrl.showRegisterPage(req, res)
  })
  .post('/register', (req, res) => {
    userCtrl.addNewUser(req, res)
  })
  .get('/login', (req, res) => {
    userCtrl.showLoginPage(req, res)
  })
  .post('/login', (req, res) => {
    userCtrl.login(req, res)
  })
  .get('/logout', (req, res) => {
    userCtrl.logout(req, res)
  })


module.exports = router