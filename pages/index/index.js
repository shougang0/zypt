//index.js
//获取应用实例
const app = getApp()
var imgurl = "http://zhongyoupingtai0515.oss-cn-hongkong.aliyuncs.com/upload/image/"
Page({
  data: {
    imgGroup: "",
    iconGroup:"",  
  },
  onLoad:function(){
    let that = this;
    var info = wx.getStorageSync('ptuserinfo');
    var img = info.avatarUrl ?  info.avatarUrl:"/img/user.jpg" 
    this.setData({ username: info.username, selfimg: img})
    wx.request({
      url: "http://www.zyylpt.com/index.php/app/index.html",
      data: { uid: info.userid},
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        that.setData({ rice: d })
      }
    })
    wx.request({
      url: "http://www.zyylpt.com/index.php/weixin/lunbo_and_icon.html",
      success:function(res){
        console.log(res.data)
        that.setData({ imgGroup: res.data.imgGroup, iconGroup: res.data.iconGroup })
      }
    })
  },
  wxlogout() {//解除绑定
    let that = this;
    wx.showModal({
      title: '解除绑定', content: '确定要清除' + this.data.username + '的账号绑定么？',
      success: function (res) {
        //如果用户点击确定
        if (res.confirm) {
          wx.request({
            url: app.globalData.apiBase + "index.php/weixin/wxlogout.html",
            data: {
              trd_session: app.globalData.trd_session
            },
            success: function (res) {
              wx.removeStorage({
                key: 'ptuserinfo',
                success: function (msg) {
                  wx.showToast({
                    title: "账号解除绑定成功",
                    duration: 1000,
                    mask: true,
                    icon: "success"
                  }),
                    wx.setStorageSync('flag', 2),
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../welcome/welcome',
                      })
                    }, 1000)
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
 