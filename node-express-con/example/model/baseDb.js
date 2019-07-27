// 在 baseDb 模块中，创建一个 公共的数据库连接对象，然后暴露出去
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0918',
    database: 'kkdl_blog',
    multipleStatements: true, // 启用多条Sql语句同时执行的功能
    rejectUnauthorized: false
})

module.exports = conn