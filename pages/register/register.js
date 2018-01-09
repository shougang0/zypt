// register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad(){
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
  }  
})