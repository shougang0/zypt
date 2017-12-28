Page({
    onTapJump1: function (event) {
        wx.switchTab({
          url: "../index/index",
        });
    },
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
      wx.switchTab({
        url: "../index/index",
      });
    }
  } 
})