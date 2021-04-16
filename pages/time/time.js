// pages/time/time.js
Page({
  
  data: {
    flag: true,
    endTime:null,
    array: ['1小时：20元', '2小时：40元', '3小时：60元', '4小时：80元','5小时：100元','6小时：120元','7小时：140元','8小时：160元'],
    index: 0,
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    var mapdata =[];
    var storedata ={};
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
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

  },

  getInputValue(e){
    console.log(e.detail)// {value: "ff", cursor: 2}  
    this.data.text=e.detail.value
    console.log(this.data.text)
  },

  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    
    this.data.index= e.detail.value;
    console.log(this.data.array[this.data.index])
  },

  handleBtn() {
    
    wx.request({
      url:'http://localhost:8080/api_v1/sendSMS', //接口地址
      data: {
       array:this.data.array[this.data.index],
       text:this.data.text
      },
      
      menthod: 'GET',
      header:{
        'content-type':'application/json'   //默认值
      },
      success:function(res) {
        console.log(this.data.array[this.data.index])
        console.log(res.data)
      },
      fail:function(res) {
        console.log("......fail......")
        
        console.log(res.data)
        console.log("......fail......")
      }
    });
    wx.showToast({
      title: '提交成功',
      icon: 'succes',
      duration: 1500,
      mask: true,
      success: function () {
        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index'
          })
        }, 1500)
      }
    });
  }

  
})