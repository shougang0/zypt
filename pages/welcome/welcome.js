Page({
    onTapJump2: function (event) {
      wx.redirectTo({
        url: '../register/register',
      });
    },
    onTapJump3: function (event) {
      wx.redirectTo({
        url: "../logs/logs",
      });
    },
  onLoad(){
    var state=wx.getStorageSync('flag')
    if(state==3){
      wx.reLaunch({//switchTab
          url: "../index/index"       
      })
    }
  } 
})