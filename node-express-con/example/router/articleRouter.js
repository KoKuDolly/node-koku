const express = require('express')
const router = express.Router()
// 导入文章相关的业务处理模块
const articleCtrl = require('../controller/articleCtrl.js')

// 挂载路由
router
  .get('/article/add', (req, res) => { // 显示添加文章的页面
    articleCtrl.showArticleAddPage(req, res)
  })
  .post('/article/add', (req, res) => { // post 发表新文章
    articleCtrl.addNewArticle(req, res)
  })
  .get('/article/info', (req, res) => { // 显示文章详情页面
    articleCtrl.showArticleInfoPage(req, res)
  })  // /article/edit/10
  .get('/article/edit/:id', (req, res) => { // 显示文章编辑页面
    articleCtrl.showEditPage(req, res)
  })
  .post('/article/edit', (req, res) => { // 保存编辑过后的文章数据
    articleCtrl.saveArticle(req, res)
  })

module.exports = router