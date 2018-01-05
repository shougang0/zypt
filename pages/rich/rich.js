// pages/rich/rich.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnum:[],
    imgList: ['new_pic/gong2.jpg','new_pic/xi2.jpg','new_pic/fa2.jpg','new_pic/cai2.jpg',
      'new_pic/ji2.jpg','new_pic/xiang2.jpg','new_pic/ru2.jpg','new_pic/yi2.jpg',
     ]
      
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.apiBase +"/index.php/app/suprize.html",
      data: { uid: app.globalData.uid},
      success: function (res){
        let lists = res.data.replace(/^\(|\)$/g, '');
        that.setData({ listnum: JSON.parse(lists) })
      }
    })
  },
  exchange(){
    wx.request({
      url: app.globalData.apiBase +"/index.php/app/openprize.html",
      data: { uid: app.globalData.uid },
      success:function(res){
        let lists = res.data.replace(/^\(|\)$/g, '');
        let d = JSON.parse(lists)
        if (d.code == 400) {
          wx.showModal({
            content:"未集齐八个字的祝福字，快去必赢吧。",
          })
        }
      }
    })
  }
})