module.exports = {
  // counts: 0,
  showIndexPage(req, res) {
    res.set('Access-Control-Allow-Origin', '*')
    res.json({ code: 1, message: '成功！' })
    // res.render('index', {
    //   isLogin: req.session.isLogin,
    //   user: req.session.user,
    // })
    this.counts++
    console.log('qingqiule', this.counts)
  },
  handleReport (req, res) {
    res.set('Access-Control-Allow-Origin', '*')
    res.json({code: '000001', data: {}, message: '生成报告失败'})
  }
}
