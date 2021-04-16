// pages/mine/mine.js
//list.js
// pages/user/user.js
var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */

  
    click: function (e) {
      wx.openLocation({
        latitude: 23.362490,
        longitude: 116.715790,
        scale: 18,
        name: '华乾大厦',
        address:'金平区长平路93号'
      })
    },
  data: {
    menuitems: [
      { text: '个人资料', url: '/pages/ybd/ybd', icon: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8ntf8yzj305k05ka9w.jpg', tips: '', arrows: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8o9g4y6j304006idfl.jpg' },
      { text: '邀请好友', url: '#', icon: 'https://wx2.sinaimg.cn/mw690/006P6Ah5ly1gkb8nlgx20j305k05k0sk.jpg', tips: '', arrows: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8o9g4y6j304006idfl.jpg' },
      { text: '地图搜索', url: '/pages/map/map', icon: 'https://wx3.sinaimg.cn/mw690/006P6Ah5ly1gkb8nle63tj305k05kdfo.jpg', tips: '', arrows: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8o9g4y6j304006idfl.jpg' },
      { text: '帮助说明', url: '#', icon: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8nlcwzgj305k05k3yd.jpg', tips: '', arrows: 'https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8o9g4y6j304006idfl.jpg' }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that=this;
  //   wx.getSetting({
  //     success(res){
  //         if(res.authSetting['scope.userInfo']){
  //             wx.getUserInfo({
  //               success:function(res){
  //                 that.setData({
  //                   userInfo:res.userInfo,
  //                   showAuth:false
  //                 })
  //               }
  //             })
  //         }
  //     }
  //   })
  // },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  toLogin: function(){
    wx.navigateTo({ url:"/pages/bdh/bdh", }) 
   },
  Login: function(){
    wx.navigateTo({url:"/pages/demo/demo"})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
  
})