// 和首页相关的路由

const express = require('express')
const router = express.Router()
// 导入首页的业务逻辑处理模块
const indexCtrl = require('../controller/indexCtrl.js')

router.get('/', (req, res) => { // 处理首页请求
  indexCtrl.showIndexPage(req, res)
})

// 上来就把路由暴露出去，防止今后忘记
module.exports = router