const mysql = require('mysql')

const conect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'kkdl',
  multipleStatements: true,
  rejectUnauthorized: false
})

module.exports = conect