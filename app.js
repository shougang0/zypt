//app.js
App({
  onLaunch: function (options) {
    var that = this;
    // 展示本地存储能力
   /* var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
    // 登录
    wx.login({
      success:function(res) {
        if (res.code) {
          var code = res.code;          
          wx.request({
            url: "http://www.zyylpt.com/index.php/weixin/weixinapi.html",
            header: {
              'content-type': 'application/json'
            },
            type: 'GET',
            data: { code: res.code },
            success: function (res) {
             // console.log(that);
              //获取openid
              wx.setStorageSync('flag', res.data.code)
              wx.setStorageSync('trd_session', res.data.trd_session)  
              if (res.data.code == 3) {
                that.globalData.uid = res.data.ptuserinfo.userid 
                wx.setStorageSync('ptuserinfo', res.data.ptuserinfo);
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }   
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    uid: "",//'999980049'自//999977526测//744293242周
    userid: null,
    username: null
  }
})