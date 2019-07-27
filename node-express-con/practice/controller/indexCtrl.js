module.exports = {
  showIndexPage (req, res) {
    res.render('index', {
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  }
}