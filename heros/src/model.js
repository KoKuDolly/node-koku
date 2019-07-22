const fs = require('fs')
const path = require('path')

function getAll(callback) {
  fs.readFile(path.join(__dirname, './data.json'), 'utf-8', (err, dataStr) => {
    if (err) return callback(err)
    const heros = JSON.parse(dataStr)
    callback(null, heros)
  })
}

function writeAll (heros, callback) {
  fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(heros), callback)
}

function getHeroById (id, callback) {
  getAll((err, heros) => {
    if (err) return callback(err)
    heros.some((item, i) => {
      if (item.id === id) {
        callback(null, item)
        return true
      }
    })
  })
}



module.exports = {
  getAllHeros: getAll,
  writeAllHeros: writeAll,
  getHeroById
}