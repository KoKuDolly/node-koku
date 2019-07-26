const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use('/node_modules', express.static('./node_modules'))
app.use(bodyParser.urlencoded({extended: false}))

// 循环遍历路由并注册
fs.readdir(path.join(__dirname, './router'), function (err, filenames) {
  filenames.forEach((filename) => {
    const tempRouter = require(path.join(__dirname, './router', filename))
    app.use(tempRouter)
  })
})
// const indexRouter = require('./router/index.js')
// const userRouter = require('./router/userRouter.js')

// app.use(indexRouter)
// app.use(userRouter)

app.listen(3003, function(){
  console.log('server running at http://127.0.0.1:3003')
})