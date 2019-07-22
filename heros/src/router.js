const path = require('path')
const fs = require('fs')
const hander = require('./handler.js')
const urlModule = require('url')

module.exports = function (req, res) {
  const { pathname: url, query } = urlModule.parse(req.url, true)
  req.query = query

  const method = req.method.toLowerCase()

  if (method === 'get' && url === '/') {
    hander.showIndexPage(req, res)
  } else if (method === 'get' && url === '/add') {
    hander.showAddPage(req, res)
  } else if (method === 'post' && url === '/add') {
    hander.addNewHero(req, res)
  } else if (method === 'get' && url === '/info') {
    hander.showHeroInfoPage(req, res)
  } else if (method === 'get' && url === '/edit') {
    hander.showEditPage(req, res)
  } else if (method === 'post' && url === '/edit') {
    hander.editHero(req, res)
  } else if (method === 'get' && url === '/del') {
    hander.deleteHeroById(req, res)
  } else if (method === 'get' && url.startsWith('/node_modules')) {
    hander.resolveStaticResource(req, res)
  }
}