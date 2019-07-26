// 首页相关的业务处理模块
const articleModel = require('../model/articleModel.js')
const common = require('../common.js')

module.exports = {
  showIndexPage(req, res) { // 渲染首页的业务逻辑

    // 每页显示的记录条数
    const pageSize = common.pageSize
    // 当前展示第几页的数据
    const nowPage = req.query.page ? req.query.page : 1
    //  limit 0, 2      (nowPage - 1) * pageSize

    articleModel.getArticleByPage(nowPage, pageSize, (err, results) => {
      if (err) return res.render('404')

      // 目前，我们只在 render 首页的时候，返回了 所有的 文章，但是并没有告诉客户端总共有几页；

      // 如何拿到总页码值？？？
      //  1. 执行 count(*) 的Sql语句，获取总记录条数
      //  2. 拿到总条数（totalcount）之后，除以 每页显示的记录条数（pageSize），上取整，得到总页数
      // console.log(results[0])
      // 由于同时执行了多条Sql语句，所以，返回的 results 是一个数组：
      //   其中，results[0] 是所有文章的数组
      //   resutls[1] 也是一个数组 ，样子是 [ RowDataPacket { totalcount: 5 } ]， 如果要拿到所有的文章条数，需要 这么来拿  results[1][0].totalcount
      // 所有文章的数量
      const totalcount = results[1][0].totalcount


      console.log(nowPage)

      res.render('index', {
        islogin: req.session.islogin,
        user: req.session.user,
        list: results[0],
        pages: Math.ceil(totalcount / pageSize), // 总页码数据
        nowPage: nowPage
      })
    })

  }
}