//logs.js
//const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    if (wx.getStorageSync('flag')==3){
      wx.switchTab({
        url: '../index/index',
      })
    }
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
    //合并输入数据，用户信息（如果用户点击允许获取的话）和第三方session
    var c = Object.assign(a, b, { trd_session: wx.getStorageSync('trd_session') });
    //console.log('form发生了submit事件，携带数据为：', c)
    let that=this;
    c.user = encodeURI(c.user);

    console.log(that);
    wx.request({
      url: app.globalData.apiBase+'index.php/weixin/login.html',
      dataType: 'json',

      data: c,
      success: function (res) {
        console.log(res) //登录结果
        if (res.data == 2 || res.data == 1) {
          wx.showToast({
            title: '账号密码错误',
            icon: 'loading',
            duration: 1000,
          });
        } else if(res.data == 3){
          wx.showToast({
            title: '请求异常请稍后再试',
            icon: 'loading',
            duration: 1000,
          });
        }else{
          //登录成功，设置flag、
          wx.setStorageSync('flag', 3);
          wx.setStorageSync('ptuserinfo', res.data);

          app.globalData.uid = res.data.userid
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
