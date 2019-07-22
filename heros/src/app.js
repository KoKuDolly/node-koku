const http = require('http')
const bindRender = require('./render.js')
const router = require('./router.js')
const server = http.createServer()

server.on('request', function (req, res) {
  bindRender(res)
  router(req, res)
})

server.listen(3001, function () {
  console.log('server listen at http://127.0.0.1:3001')
})