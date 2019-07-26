const conn = require('./baseDb.js')

module.exports = {
  getUserCountByUsername(username, callback) { // 根据用户名查重，返回查询到的数量
    var sql = 'select count(*) as totalcount from users where username=?'
    conn.query(sql, username, callback)
  },
  addNewUser(user, callback) { // 添加新用户
    var sql = 'insert into users set ?'
    conn.query(sql, user, callback)
  },
  login(user, callback) { // 登录
    var sql = 'select * from users where username=? and password=?'
    conn.query(sql, [user.username, user.password], callback)
  }
}