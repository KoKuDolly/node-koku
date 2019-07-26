const sqlConnect = require('./baseDB.js')

module.exports = {
  getusercontsByusername (username, callback){
    const sql = 'select count(*) as userCounts from users where username=?'
    sqlConnect.query(sql, username, callback)
  },
  addNewUser(user, callback) {
    const sql = 'insert into users set ?'
    sqlConnect.query(sql, user, callback)
  },
  login(user, callback) {
    const sql = 'select * from users where username=? and password=?'
    sqlConnect.query(sql, [user.username, user.password], callback)
  }
}