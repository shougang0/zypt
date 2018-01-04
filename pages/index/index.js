//index.js
//获取应用实例
const app = getApp()
var imgurl = "http://zhongyoupingtai0515.oss-cn-hongkong.aliyuncs.com/upload/image/"
Page({
  data: {
    imgUrls: [{ 
        'imgurl':imgurl +'201712/81d40979-3e2f-4d2e-8d2e-11581574822a.jpg',//会员
        'url':'/pages/game/game'    
      },{
        'imgurl':imgurl + '201710/7ab98854-63bc-4b5e-989a-e3686dbb5dd9.jpg',//白拿
        'url': "/pages/free/free"
      },{
        'imgurl': imgurl + '201710/a41509ca-6c6d-43bd-88ee-172ea7905795.jpg',//必赢
        'url': "/pages/free/free"
      }, {
        'imgurl': imgurl + '201711/7b2917c9-2914-4407-93c4-5e23aac0ece8.jpg',//职工
        'url': "/pages/free/free"
      }],
    indicatorDots: true,
  },
  onLoad:function(){
    let that = this;
    var info = wx.getStorageSync('ptuserinfo');
    this.setData({ username: info.username })
    wx.request({
      url: "http://www.zyylpt.com/index.php/app/index.html",
      data: { uid: wx.getStorageSync('ptuserinfo').userid},
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
       // console.log(res)
        that.setData({ rice: d })
      }
    })
  },
}) 
 