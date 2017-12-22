// pages/my/my.js
var app = getApp();
Page({
  data: {
    username:""
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var info = wx.getStorageSync('ptuserinfo');
    this.setData({username: info.username})
  },

  wxlogout(){//解除绑定
    let that = this;
    wx.showModal({title:'解除绑定', content:'确定要清除' + this.data.username +'的账号绑定么？',
         success: function(res){
           //如果用户点击确定
           if(res.confirm){
             wx.request({
               url: app.globalData.apiBase + "index.php/weixin/wxlogout.html",
               data: {
                 trd_session: app.globalData.trd_session
               },
               success: function (res) {
                 wx.removeStorage({
                   key:'ptuserinfo',
                   success: function (msg) {
                     wx.showToast({
                       title: "账号解除绑定成功",
                       duration: 1000,
                       mask: true,
                       icon: "success"
                     }),
                       wx.setStorageSync('flag', 2),
                     setTimeout(function(){
                         wx.redirectTo({
                           url: '../welcome/welcome',
                       })
                     },1000)
                      
                   },
                   fail: function (e) {
                     console.log(e)
                   }
                 })
               }
             })
           }
         }
               
      })  
  }
})