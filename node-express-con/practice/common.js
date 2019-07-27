const md5 = require('blueimp-md5')

module.exports = {
  pwdSalt: 'slkj_12$%%%;;..._______+==0--',
  md5Encode (originPwd) {
    return md5(originPwd, this.pwdSalt)
  }
}
