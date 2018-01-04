// 抽中产品列表
var app = getApp();
Page({
  data: {
    rule_list_content:"",
    ismodal:false,
    modaltitle:'',
    prize:'',
    modalcontent:'',
    indexs:0,
    pageNum:'',
    totalNam:''
  },

  onLoad () {
    load(this)//加载数据
  },
  onPullDownRefresh () {//下拉刷新
    load(this);
  },
  showdetail(event){//显示商品的详情
    let detail = [];
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
      this.setData({ ismodal: true })
      this.setData({
        prize: detail.prize,
        modaltitle: detail.good_name,
        modalcontent: detail.dsc.replace(/<br\/>/g,' \n')
      })
    }
  },
  send(event){
    let detail = '';
    let that=this;
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
     // console.log(detail)
     wx.request({
       url: "http://www.zyylpt.com/index.php/app/getproductId.html",
       data: { id: detail.id},
       success(res){
        let d = res.data.replace(/^\(|\)$/g, '');
        var etdt = new Date("2017,09,29".replace(/-/g, "/")).getTime();
        var stdt = new Date(2017, 10, 27).getTime();
       // let s_href = "http://zhongyouapp.com/order/checkout_game?skuId=" + d.productId;
        let s_href = "../order/order?skuId=" + d.productId;
          if (stdt > etdt) {//开放时间大于注册时间                      
            wx.navigateTo({
              url: s_href,
            }) 
          } else {
            if (rank == 2) {
              wx.navigateTo({
                url: s_href,
              }) 
            } else if (rank == 1) {
              if (white == 1 || white == 2) {
               wx.navigateTo({
                 url: s_href,
               }) 
              } else if (white == 0) {
               if (invitationCode == 0) {
                 wx.navigateTo({
                   url: "http://zhongyouapp.com/game/membertype",
                 })  
               } else if (invitationCode == 7) {
                 if (etdt > ttmm) {
                   wx.navigateTo({
                     url: s_href,
                   }) 
                 } else {
                   wx.navigateTo({
                     url: "http://zhongyouapp.com/game/membertype",
                   }) 
                 }
               } else {
                 wx.navigateTo({
                   url: s_href,
                 })
               }
             }
           }
         }
       }
     })
    }
  },
  modalhide() { //弹出窗口
    this.setData({
      ismodal: false,
    })
  },
  bindPickerChange: function (e) {//加载多页数据
    this.setData({
      indexs: e.detail.value
    }),
    load(this)//加载数据
  },
})



function load(self){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: "http://www.zyylpt.com/index.php/app/prize.html",
    data: {
      uid: app.globalData.uid,
      p: self.data.indexs*1+1
    },
    success: function (res) {
      wx.hideLoading()
      let d = res.data.replace(/^\(|\)$/g, '');
      let li = JSON.parse(d)

      if (li.data) {
        let pagenum = [];
        for (let i = 0; i < li.num;i++){
          pagenum[i]='第'+(i+1)+'页'
        }  
        self.setData({ 
          rule_list_content: li.data,
          pageNum: pagenum,
          totalNam: li.num
        })
      }else{
        self.setData({unde:true})
      }
      wx.stopPullDownRefresh()//停止刷新
    }
  })

}
/*onPullDownRefresh: function () {//下拉刷新
  load(this);
}*/