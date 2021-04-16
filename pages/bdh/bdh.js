Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    realName:'',
    idNo:'',
    family:'',
    bedNo:'',
    beginTime:'',
    state:'',
    num:'',
    endTime:'',
    code:'1',
    code1:'2'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var stu = wx.getStorageSync('student');
    // this.setData({ myinfo: stu });
    // console.log(this.data.myinfo);
  },
  realName:function(e){
    this.setData({
      realName:e.detail.value
    })
  },
  idNo:function(e){
    this.setData({
      idNo:e.detail.value
    })
  },
  family:function(e){
    this.setData({
      family:e.detail.value
    })
  },
  bedNo:function(e){
    this.setData({
      bedNo:e.detail.value
    })
  },
  beginTime:function(e){
    this.setData({
      beginTime:e.detail.value
    })
  },
  state:function(e){
    this.setData({
      state:e.detail.value
    })
  },
  num:function(e){
    this.setData({
      num:e.detail.value
    })
  },
  endTime:function(e){ 
    this.setData({
      endTime:e.detail.value
    })
  },
  data:{checked: true},
 
  radioChange: function (e) {
     var ts = this
     ts.setData({
       checked: !ts.data.checked
     })
   },
 
  loginBtnClick:function() {
    let arr = wx.getStorageSync("test1") || [];
    arr.unshift(this.value);
    wx.setStorageSync("test1", arr)
    
  },
  loginBtnClick: function(){
    wx.switchTab({
      url: '../mine/mine',
    })
   },
   handleBtn() {
      wx.request({
        url:'http://localhost:8080/api_v1/register', //接口地址
        data: {
          realName:this.data.realName,
          idNo:this.data.idNo,
          family:this.data.family,
          bedNo:this.data.bedNo,
          beginTime:this.data.beginTime,
          state:this.data.state,
          num:this.data.num,
          endTime:this.data.endTime
        },
        menthod: 'GET',
        header:{
          'content-type':'application/json'   //默认值
        },
        success:function(res) {
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