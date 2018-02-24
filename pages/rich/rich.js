// pages/rich/rich.js
var app = getApp();
var util = require('../t.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnum:[],
    imgList: ['new_pic/H1.png', 'new_pic/H2.png', 'new_pic/H3.png','new_pic/H4.png',
      'new_pic/H5.png', 'new_pic/H6.png', 'new_pic/H7.png','new_pic/H8.png',
     ]    
  },
  onLoad: function (options) {
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
    var that = this
    wx.request({
      url: app.globalData.apiBase +"index.php/app/suprize.html",
      data: { uid: app.globalData.uid},
      success: function (res){
        let lists = res.data.replace(/^\(|\)$/g, '');
        that.setData({ listnum: JSON.parse(lists) })
      }
    })
  },
  exchange(){
    var info = wx.getStorageSync('flag');
    if (info != 3) {
      util.islogin();//判断是否是登录状态
    } else {
      wx.showModal({
        title: "提示",
        content: '由于支付功能暂未开通，请下载App领奖',
        //confirmText: '下载App',
        confirmColor: '#3094D2',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../download/download',
            })
          }
        }
      })
      // wx.request({
      //   url: app.globalData.apiBase + "/index.php/app/openprize.html",
      //   data: { uid: app.globalData.uid },
      //   success: function (res) {
      //     let lists = res.data.replace(/^\(|\)$/g, '');
      //     let d = JSON.parse(lists)
      //     if (d.code == 400) {
      //       wx.showModal({
      //         content: "未集齐八个字的祝福字，快去必赢吧。",
      //       })
      //     }else{//集齐换奖
            
      //     }
      //   }
      // })
    }  
  }
})