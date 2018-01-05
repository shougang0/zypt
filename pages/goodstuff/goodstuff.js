// pages/goodstuff/goodstuff.js
var app = getApp();
Page({
  data: {
    lists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    load(this);    
  },
  onPullDownRefresh: function () {//下拉刷新
    load(this);
  },
  change_: function (event) {
    wx.showLoading({
      title: '加载中',
    })
    let id=event.currentTarget.dataset.id;
    let that=this;
    wx.request({
      url: app.globalData.apiBase+"/index.php/app/infodisplay.html",
      data: { uid: app.globalData.uid,id:id},
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        wx.hideLoading()
        wx.showModal({
          title: '',
          content: '确认用' + d['forcharge'] + '斤换取大米' + d['dami']+'斤',
          success: function(res) {
            if(res.confirm){
              confirmEnter(id,that)  
            }
          },
        })
      }
    })
  }, 
})

function confirmEnter(id,self) {
  wx.request({
    url: app.globalData.apiBase +"/index.php/app/chargedami.html",
    data: { uid: app.globalData.uid, id: id },
    success:function(res){
      let d = res.data.replace(/^\(|\)$/g, '');
      if (d==1){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000, 
          success: function () {
            self.onLoad()
          }
        })
        /*wx.showModal({
          content: '兑换成功',
          showCancel:false,
          
        })*/
      }      
    }
  })  
}
function load(self){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: app.globalData.apiBase +"/index.php/app/myfood.html",
    data: { uid: app.globalData.uid },
    success: function (res) {
      wx.hideLoading()
      if (res.data) {
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        self.setData({ lists: d });
      }
      wx.stopPullDownRefresh()//停止刷新
    }
  })
}
