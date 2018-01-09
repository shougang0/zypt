Page({
    onTapJump2: function (event) {
      wx.redirectTo({ //新用户注册
        url: '../register/register',
      });
    },
    onTapJump3: function (event) {
      wx.redirectTo({//老用户登录
        url: "../logs/logs",
      });
    },
  onLoad(){
    this.setData({ baseUrl: app.globalData.apiBase })
    var state=wx.getStorageSync('flag')
    if(state==3){
      wx.reLaunch({//switchTab
          url: "../index/index"       
      })
    }
  } 
})