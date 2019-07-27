//入口文件
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const moment = require('moment')

// 1. 先导入 art-template 模板引擎
const template = require('art-template')
// 2. 自定义一个 时间过滤器
template.defaults.imports.dateFormat = function(
  date,
  pattern = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(date).format(pattern)
}

// 配置默认的模板引擎
// app.set('view engine', 'ejs')
// app.engine('ejs') 使用它来自定义一个模板引擎，这个模板引擎的名称叫做 ejs,模板文件的后缀名也叫 ejs
app.engine('ejs', require('express-art-template'))
// 将自定义的模板引擎，当作 express的默认模板引擎
app.set('view engine', 'ejs')

// 托管静态资源
app.use('/node_modules', express.static('./node_modules'))

// 配置解析Post表单数据的body-parser中间件
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))

// 配置 express-session
const session = require('express-session')
// 只要配置了Session，那么今后，只要能访问到 req， 必然能够访问到 req.session 对象
app.use(
  session({
    secret: '）（*&……&……这是盐', // 盐
    resave: false, // 如果为true， 表示：强制每个Session必须保存到物理磁盘上
    saveUninitialized: true, // 如果为true， 表示：强制没有被初始化的Session，也必须保存到物理磁盘上
  })
)

// 循环注册路由
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
  filenames.forEach(filename => {
    // 拼接出每个路由模块的完整文件名
    const fullpath = path.join(__dirname, './router', filename)
    // 自动导入模块
    const tempModule = require(fullpath)
    // 自动注册路由模块
    app.use(tempModule)
  })
})

app.listen(3002, function() {
  console.log('Server running at http://127.0.0.1:3002')
})
