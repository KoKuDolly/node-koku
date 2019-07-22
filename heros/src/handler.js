const fs = require('fs')
const path = require('path')
const model = require('./model.js')
const querystring = require('querystring')

module.exports = {
  showIndexPage(req, res) {
    model.getAllHeros((err, heros) => {
      if (err) return res.render('index', { list: [] })
      res.render('index', { list: heros })
    })
  },

  showAddPage (req, res) {
    res.render('add', {})
  },

  addNewHero (req, res) {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      let hero = querystring.parse(data)
      hero.ctime = (new Date()).getTime()
      let id = 0
      model.getAllHeros((err, heros) => {
        if (err) return res.end('添加英雄失败！')
        heros.forEach(item => {
          if (item.id > id) {
            id = item.id
          }
        })
        id++
        hero.id = id + ''

        heros.push(hero)
        model.writeAllHeros(heros, (err) => {
          if (err) {
            res.json({ err_code: 1, msg: '添加失败了！' })
          } else {
            res.json({ err_code: 0, msg: 'ok' })
          }
        })
      })
    })
  },

  showHeroInfoPage (req, res) {
    const id = req.query.id
    model.getHeroById(id, (err, hero) => {
      if (err) res.end('获取英雄信息页面失败！')
      res.render('info', hero)
    })
  },

  showEditPage (req, res) {
    const id = req.query.id
    model.getHeroById(id, (err, hero) => {
      if (err) return res.end('展示编辑页面失效')
      res.render('edit', hero)
    })
  },

  editHero (req, res) {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      // console.log(data)
      const newHero = querystring.parse(data)
      newHero.ctime = +newHero.ctime
      model.getAllHeros((err, heros) => {
        if (err) return res.end('修改失败！')
        heros.some((item, i) => {
          if (item.id === newHero.id) {
            heros.splice(i, 1, newHero)
            return true
          }
        })

        model.writeAllHeros(heros, (err) => {
          if (err) {
            res.json({ err_code: 1, msg: '修改英雄失败了！' })
          } else {
            res.json({ err_code: 0 })
          }
        })
      })
    })
  },

  deleteHeroById (req, res) {
    const id = req.query.id
    model.getAllHeros((err, heros) => {
      if (err) return res.end('删除英雄失败')
      heros.some((item, i) => {
        if (item.id === id) {
          heros.splice(i, 1)
          return true
        }
      })

      model.writeAllHeros(heros, (err) => {
        if (err) return res.end('删除英雄失败')
        res.redirect('/')
      })
    })
  },

  resolveStaticResource(req, res) {
    fs.readFile(path.join(__dirname, '../', req.url), (err, buf) => {
      if (err) res.end('404')
      res.end(buf)
    })
  }
}