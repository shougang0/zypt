//logs.js
//const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
     /* logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })*/
    })
  },
  formSubmit: function (e) {
    var a = e.detail.value;
    var b = app.globalData.userInfo;
    var c = Object.assign(a, b, { trd_session: wx.getStorageSync('trd_session') });
    let that=this;
    wx.request({

      url: 'http://www.zyylpt.com/index.php/weixin/login.html',
      header: {
        'content-type': 'application/json'
      },
      data: c,
      success: function (res) {
        console.log(res) //登录结果
        if (res.data == 2 || res.data == 1) {
          wx.showToast({
            title: '账号密码错误',
            icon: 'loading',
            duration: 500,
          });
        } else {
          //登录成功，设置flag、
          wx.setStorageSync('flag', 3);
          wx.setStorageSync('ptuserinfo', res.data);
          console.log(that.globalDat)
          that.globalData.uid = res.data.userid 
          wx.switchTab({
           // url: '../index/index',
          })
        }
      }
    })

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})