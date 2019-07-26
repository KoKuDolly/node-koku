const userModel = require('../model/userModel.js')

module.exports = {
  showRegisterPage (req, res) {
    res.render('user/register', {})
  },
  addNewUser (req, res) {
    const user = req.body
    userModel.getusercontsByusername(user.username, (err, result) => {
      if (err) return res.json({code: 1, message: '注册失败！'})
      // console.log(result)
      const { userCounts } = result[0]
      if (userCounts !== 0) {
        res.json({code: 1, message: '用户名重复，请换一个！'})
      } else {
        userModel.addNewUser(user, (err, result) => {
          if (err) {
            res.json({code: 1, message: '注册失败！'})
          } else {
            res.json({code: 0, message: '注册成功！'})
          }
        })
      }
    })
  },
  showLoginPage (req, res) {
    res.render('./user/login', {})
  },
  login (req, res) {
    const user = req.body
    userModel.login(user, (err, result) => {
      if (err) {
        res.json({code: 1, message: '登录失败！'})
      } else {
        const len = result.length
        console.log(result)
        if (len === 0) {
          res.json({code: 1, message: '登录失败！'})
        } else {
          res.json({code: 0, message: '登录成功！'})
        }
      }
    })
  },
  logout (req, res) {

  }
}