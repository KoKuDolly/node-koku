// 导入用户数据操作模块
const userModel = require('../model/userModel.js')
// 导入mcommon模块
const common = require('../common.js')

module.exports = {
  showRegisterPage(req, res) { // 渲染注册页面
    res.render('./user/register', {})
  },
  register(req, res) { // 实现用户的注册
    // 分析：
    //  1. 先拿到表单数据？？？ 怎么拿？？？
    // 原生： req.on('data/end')    第三方的中间件  body-parser
    //  2. 根据用户名 去数据库中 查重，只有不存在的用户名，才能进行下一步的注册流程
    //  3. 如果没有重复的用户名，就可以将数据保存到数据库了
    //  4. 将注册的结果，通过 JSON 数据格式，返回给前端的 Ajax

    // 【态度和方式同样重要】
    const user = req.body
    // 用户名查重
    userModel.getUserCountByUsername(user.username, (err, results) => {
      if (err) {
        // console.log(err)
        return res.json({ err_code: 1, msg: '注册失败！' })
      }
      console.log(results)

      if (results[0].totalcount !== 0) { // 用户名已经被占用
        return res.json({ err_code: 1, msg: '用户名已经被占用，请更换其他用户名！' })
      }

      // 对用户身上的密码，保存到数据前，先进行 MD5 加密操作
      // user.password = md5('user.password', '@#！*&……）-=——+1·~~盗取密码死全家')
      user.password = common.md5Encode(user.password)

      // 进行用户信息的写入
      // 在调用 Model 模块，把密码写入数据库之前，需要先调用 MD5 模块进行密码加密
      userModel.addNewUser(user, (err, results) => {
        if (err) return res.json({ err_code: 1, msg: '注册失败！' })

        if (results.affectedRows === 1) {
          res.json({ err_code: 0, msg: 'ok' })
        } else {
          res.json({ err_code: 1, msg: '注册失败！' })
        }
      })
    })
  },
  showLoginPage(req, res) { // 显示登录页面
    res.render('user/login', {})
  },
  login(req, res) { // 实现登录业务逻辑
    // 分析：
    // 1. 获取表单数据
    // 2. 根据用户名和密码，调用 Model 方法查看用户信息是否正确
    // 3. 返回登录结果，以 JSON 对象返回

    const info = req.body

    // 对输入的密码进行加密，从而防止登录失败的情况
    // info.password = md5(info.password, '@#！*&……）-=——+1·~~盗取密码死全家')
    info.password = common.md5Encode(info.password)

    userModel.login(info, (err, results) => {
      if (err || results.length !== 1) return res.json({ err_code: 1, msg: '登录失败！' })

      // 当我们 注册完 express-session 之后，就可以使用 req.session 来保存登录状态了
      // console.log(results)
      // console.log(req.session)

      // 将登录人的信息，保存到 Session 中
      req.session.user = results[0]
      req.session.islogin = true

      // 告诉客户端登录成功
      res.json({ err_code: 0, msg: 'ok' })
    })
  },
  logout(req, res){ // 注销登录
    req.session.destroy((err)=>{
      res.redirect('/')
    })
  }
}