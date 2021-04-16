//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs),
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
      //   const code = res.code;
      //   const appId =wx54108a0ba8be70fb;
      //   const secret = "ecc424b3240a3ddd387a9d5e82c88bc5";
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //   wx.request({
      //               url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId 
      //                                                                 + '&secret=' + secret 
      //                                                                 + '&js_code=' + code 
      //                                                                 + '&grant_type=authorization_code',
      //               data: {},
      //               header: {
      //                 'content-type': 'json'
      //               },
      //               success: function (res) {
      //                 const openId = res.data.openid; //返回openid
      //               }
      //             })
      },
      
      globalData: {
        userInfo: null,
        apiKey:'APIKEY',
        secretKey:'SECRETKEY'
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})