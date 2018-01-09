function islogin() {
  wx.showModal({
    // title: '', 
    content: '您还没有登录，请登录后在试',
    success: function (res) {
      if (res.confirm) {
        wx.reLaunch({
          url: '/pages/welcome/welcome',
        })
      }
    },
  })
}
module.exports = {
  islogin: islogin,
}