const express = require('express')
const router = express.Router()
// 导入自己的用户业务逻辑处理模块
const userCtrl = require('../controller/userCtrl.js')

router
  .get('/register', (req, res) => { // 展示注册页面
    userCtrl.showRegisterPage(req, res)
  })
  .post('/register', (req, res) => { // 注册新用户
    userCtrl.register(req, res)
  })
  .get('/login', (req, res) => { // 展示登录页面
    userCtrl.showLoginPage(req, res)
  })
  .post('/login', (req, res) => { // 用户登录
    userCtrl.login(req, res)
  })
  .get('/logout', (req, res) => { // 注销登录
    userCtrl.logout(req, res)
  })

module.exports = router