const template = require('art-template')
const path = require('path')
const moment = require('moment')

template.defaults.imports.dateFormat = function (date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // date = Date.parse(date)
  return moment(date).format(pattern)
}

function bindRender(res) {
  res.render = function (fileName, data) {
    const htmlStr = template(path.join(__dirname, './views/' + fileName + '.html'), data)
    this.end(htmlStr)
  }

  res.redirect = function (location) {
    res.writeHeader(302, {
      'Location': location
    })
    this.end()
  }

  res.json = function (obj) {
    this.end(JSON.stringify(obj))
  }
}

module.exports = bindRender