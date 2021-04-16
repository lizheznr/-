// pages/demo/demo.js
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:{},
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
    //在页面加载完成时调用
    onLoad :function(){
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
      // var that= this;
      // wx.getSetting({
      //   success(res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       wx.getUserInfo({
      //         success: function(res){
      //           console.log(res)
      //           that.setData({
      //             userName:res.userInfo.userName,
      //             hasUserInfo: true
      //           })
      //         }
      //       })
      //     }
      //   }
      // })
    },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log(e)
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },fail:()=>{
        wx.showModal({
                title: '提示',
                content: '您必须授权才能使用所有功能',
                showCancel: false,
              })
      }
    })
  },
  sss:function(){
    wx.navigateTo({
      url: '/pages/ai/ai',
    })
  },
})