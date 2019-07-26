const conn = require('./baseDb.js')

module.exports = {
  addArticle(article, callback) { // 向数据库中写入文章数据
    const sql = 'insert into articles set ?'
    conn.query(sql, article, callback)
  },
  getArticleById(id, callback) { // 根据Id，获取文章详情
    const sql = 'select * from articles where id=?'
    conn.query(sql, id, callback)
  },
  saveArticle(article, callback) { // 修改文章信息
    const sql = 'update articles set ? where id=?'
    conn.query(sql, [article, article.id], callback)
  },
  getAllArticle(callback) { // 获取所有的文章数据
    // const sql = 'select * from articles order by id desc'

    // 注意： mysql 第三方模块，并没有默认启用执行多条Sql语句的功能，因此执行多条Sql语句会报错；
    //  如何启用 执行多条Sql语句的功能呢？
    const sql = `select articles.*, users.nickname 
    from articles 
    left join users 
    on articles.authorId=users.id 
    order by articles.id desc;
    select count(*) as totalcount from articles`

    conn.query(sql, callback)
  },
  getArticleByPage(nowPage, pageSize, callback) {
    const sql = `select articles.*, users.nickname 
    from articles 
    left join users 
    on articles.authorId=users.id 
    order by articles.id desc limit ${(nowPage - 1) * pageSize}, ${pageSize};
    select count(*) as totalcount from articles`

    conn.query(sql, callback)
  }
}