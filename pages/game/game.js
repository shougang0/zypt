var app = getApp();
var begin = null;
Page({
  data: {
    rulelist:[],
    showModal:false,//模态框不显示
    ismodal:false,
    ten_prize:false,
    one_prize: false,
    price:'',       //产品价格    
    modaltitle: '', //产品标题
    imgUrl:'',      //产品图片
    isbegin:false , //不出现遮罩层
    //isOpacity:false
    showNnm:null,
  },
  onLoad () {
    let that=this
    wx.request({
      url: "http://www.zyylpt.com/index.php/app/jiangpin.html", 
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, '')); 
        that.setData({rulelist:d.src})
      }
    })
  },
  one_prize(){  //一次抽奖
    Twinkle(this)
    let that=this;
    wx.request({
      url: "http://www.zyylpt.com/index.php/app/playone.html",
      data:{
        uid: app.globalData.uid
      },
      success:function(res){
        clearInterval(begin);
        let d = res.data.replace(/^\(|\)$/g, '');
        if(d==0){
          wx.showModal({
            title: '',
            content: '您的大米不足',
          })
        }else { 
          d=JSON.parse(d) 
          that.setData({ 
            modaltitle: d.good_name, 
            imgUrl: d.img_url,
            price: d.market_price,
            one_prize: true,  
          })
          that.setData({ ismodal: true}) //模态框
        }
        that.setData({isbegin: false }) //模态框
      }
    })
  },
  ten_prize(){
    Twinkle(this)
    let that = this;
    wx.request({
      url: "http://www.zyylpt.com/index.php/app/ten.html",
      data: {
        uid: app.globalData.uid
      },
      success: function (res) {
        clearInterval(begin);
        let d = res.data.replace(/^\(|\)$/g, '');
        if (d == 0) {
          wx.showModal({
            title: '',
            content: '您的大米不足',
          })
        } else {
          d = JSON.parse(d)
          that.setData({
            imgUrl: d,            
            ten_prize: true      
          })
        }
        that.setData({
          isbegin: false
        })
      }
    })
  },
  free(){  //白拿跳转
    wx.redirectTo({
      url: '../free/free',
    })
  },
  listDetail(event){ //产品详情
    //console.log(event) 
    let detail=[];
    if(event.currentTarget.dataset){
      detail = event.currentTarget.dataset;
      this.setData({ ismodal: true })
      this.setData({ 
        price: detail.price,
        modaltitle: detail.cot,
        imgUrl: detail.url,
      })
    }
  }, 
  modalhide() {//弹出窗口
    this.setData({ 
      ismodal: false ,
      one_prize:false,
      ten_prize:false,
    })
  },
  
})

function Twinkle(self){ //跳动方法
  let len = self.data.rulelist.length  //奖品列表的长度
  self.setData({ isbegin:true});  //出现的遮罩层
  begin = setInterval(function(){ //设置定时器
    var num = Math.floor(Math.random() * len);
    self.setData({ showNnm: num})  //随机某个跳动
  }, 50);

  setTimeout(function(){   //网络延时后清除定时器
    clearInterval(begin);
    
    if (isbegin){
      self.setData({ isbegin: false }) //取消遮罩层 
      wx.showToast({
        title: '网络请求超时，请到已的奖品查看',
        duration: 1000
      })      
    }    
  },10000)
}
