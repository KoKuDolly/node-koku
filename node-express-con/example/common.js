const md5 = require('blueimp-md5')

//  common 相当于一个配置文件
module.exports = {
  pwdSalt: '@#！*&……）-=——+1·~~盗取密码死全家',
  md5Encode(originPwd) { // 提取出了一个公共的MD5加密方法，方便调用
    return md5(originPwd, this.pwdSalt)
  },
  pageSize: 2  // 每页显示2条文章
}