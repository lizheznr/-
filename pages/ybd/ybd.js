var util = require('../../utils/util.js')
Page({
  data: {
    time:util.formatTime(new Date()),
    post:[],  //这是一个空的数组，等下获取到数据库的数据将存放在其中
  },
  onLoad: function (options) {
    var thit = this;
    var time = util.formatTime(new Date());  
    wx.request({
      url:'http://localhost:8080/api_v1/getUserInfo',
      data: {
      },
      header:{
        'content-type':'application/json' ,  //默认值
      },
      dataType:'json',
     success:function(res) {
        console.log('读取成功')
        console.log(res.data)  
        thit.setData({
          realName:res.data.oldman.realName,
          idNo:res.data.oldman.idNo,
          family:res.data.oldman.family,
          bedNo:res.data.oldman.bedNo,
          beginTime:res.data.oldman.beginTime,
          state:res.data.oldman.state,
          num:res.data.oldman.num,
          endTime:res.data.oldman.endTime
        })
     },
     fail:function(res) {
      console.log("......fail......")
     }
    })
  }
})