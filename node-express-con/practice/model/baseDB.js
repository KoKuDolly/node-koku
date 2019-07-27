const mysql = require('mysql')

const conect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0918',
    database: 'kkdl_blog',
    multipleStatements: true,
    rejectUnauthorized: false
})

module.exports = conect