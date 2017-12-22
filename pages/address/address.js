// pages/address/address.js
var app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    let that=this;
    wx.request({
      url:'http://zhongyouapp.com/order/receiver_list',
      data: {uid: app.globalData.uid},
      success:function(res){
        that.setData({message:'由于接口未开通，所以页面为空'})
      }
      
    })
  }
})