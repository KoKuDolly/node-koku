// 导入文章的CRUD数据操作模块
const articleModel = require('../model/articleModel.js')
const markdown = require('markdown').markdown

module.exports = {
  showArticleAddPage(req, res) { // 展示文章添加页面
    // 在真正渲染添加页面之前，要先判断有没有登录，如果没有登录，则直接redirect 到首页
    if (!req.session.islogin) return res.redirect('/')

    res.render('article/add', {
      islogin: req.session.islogin,
      user: req.session.user
    })
  },
  addNewArticle(req, res) { // 添加新文章
    // 分析：
    //  1. 由于当前表单提交过来的数据中，只有 title 和 content，没有 作者Id（authorId），我们现在考虑：服务器端能不能获取到 作者Id呢？？ 经过分析，发现可以，因为 当前登录人的信息，已经保存到了Session中去，此时，直接访问  req.session.user.id  就是当前文章作者的Id；
    //  但是，Session有一个问题，Session默认都有过期时间，所以，如果有一篇文章，写了很长时间之后，才进行发表，这时候，服务器端的登录Session信息已经过期了，就拿不到登录人的ID，就会报错！
    //  2. 我们，可以在用户已进入 文章发表页面的时候， 立即使用隐藏域，把登录人的Id，预先保存到 隐藏域中，这样，哪怕 服务器端的 Session 登录信息过期失效了，也不耽误 我们在正常保存这篇文章！！！

    // 3. 调用 Model 模块里面，保存文章到数据库的方法
    // 4. 将操作的结果，返回给客户端；

    const article = req.body
    // 补全文章的发表shi'jian
    article.ctime = new Date()
    articleModel.addArticle(article, (err, results) => {
      if (err || results.affectedRows !== 1) return res.json({ err_code: 1, msg: '抱歉，文章发表失败！' })

      // 文章添加成功
      res.json({ err_code: 0, msg: 'ok', articleId: results.insertId })
    })
  },
  showArticleInfoPage(req, res) { // 显示文章详情页面
    //  分析：
    //  1. 获取文章的Id
    const id = req.query.id
    //  2. 根据Id，调用Model模块，获取文章详情
    //  3. 使用res.render 渲染页面（需要创建一个info 页面）
    articleModel.getArticleById(id, (err, results) => {
      if (err || results.length !== 1) return res.render('404')

      // 在渲染页面之前，使用 markdown 第三方模块，将文章转换为 HTML 格式
      results[0].content = markdown.toHTML(results[0].content)

      // 渲染页面
      res.render('article/info', {
        islogin: req.session.islogin,
        user: req.session.user,
        article: results[0] // 要渲染的文章对象
      })
    })
  },
  showEditPage(req, res) { // 展示文章编辑页面
    if (!req.session.islogin) return res.redirect('/login')
    // 分析：
    //  1. 拿到文章的id
    //  2. 根据ID获取到文章的详情
    //  3. 根据文章详情，展示文章的页面，并在展示页面时候，把文章的数据，渲染到指定的表单元素中
    articleModel.getArticleById(req.params.id, (err, results) => {
      if (err || results.length !== 1) return res.render('404')

      // 渲染文章编辑页面
      res.render('article/edit', {
        islogin: req.session.islogin,
        user: req.session.user,
        article: results[0]
      })
    })
  },
  saveArticle(req, res) { // 保存文章信息
    // 分析：
    //  1. 获取到 提交过来的文章对象
    //  2. 调用 Model 中，修改文章信息的方法
    //  3. 将修改的结果返回给客户端的Ajax
    articleModel.saveArticle(req.body, (err, results) => {
      if (err || results.affectedRows !== 1) return res.json({ err_code: 1, msg: '保存文章失败！' })

      res.json({ err_code: 0, msg: 'ok' })
    })
  }
}