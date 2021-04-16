var app = getApp()
Page({
  data: {
    userN:''
  },
  //手机号码输入框
  iphonenumberInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  
  loginBtnClick: function(){
     wx.navigateTo({ url:"/pages/bdh/bdh", }) 
    }
})