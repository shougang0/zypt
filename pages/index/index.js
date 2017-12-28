//index.js
//获取应用实例
const app = getApp()
var imgurl = "http://zhongyoupingtai0515.oss-cn-hongkong.aliyuncs.com/upload/image/"
Page({
  data: {
    imgUrls: [
      imgurl +'201712/4bb32fa4-8172-4b69-9d22-a408c6a46399.jpg',     
      imgurl +'201712/33848a4c-acaa-4a46-8713-7dd4c43f6a96.jpg',
      imgurl +'201712/81d40979-3e2f-4d2e-8d2e-11581574822a.jpg',
      imgurl +'201710/7ab98854-63bc-4b5e-989a-e3686dbb5dd9.jpg'
    ],
    indicatorDots: true,
  },
  onLoad:function(){
    
  },
})
