// pages/ai/ai.js
var app = getApp();
Page({
  data: {
    navbar: [ '活动中心', '卧室'],
    currentTab: 0,
    sum:0,
    src:"",
    fengmian:"",
    videoSrc:"",
    who:"",
    openid: "",
    token: "",
    windowWidth: 0,
    trackshow: "进行人脸追踪",
    trackshow1: "进行人脸追踪",
    canvasshow:true,
    canvasshow1:true,
    access_token:'',
    access_token1:'',
    methoddata:{},
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad() {
    var that = this
    //屏幕宽度
    var sysInfo = wx.getSystemInfoSync()
    that.setData({
      windowWidth: sysInfo.windowWidth,
    })
    that.ctx = wx.createCameraContext()
      that.setData({
        openid: app.globalData.openid,
        token: app.globalData.token
      });
    
    // 每次更新access_token
    //活动中心
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=FNwQMBIRA8OsEb4vzvZghMQt&client_secret=XAHrTL78prjqz8KPY7SYKPhoDSFPT6Ur",
      dataType: "json",
      header: {
        // "Accept": "application/json",//
        // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'//
         'content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST',
      success: function (res) {
        app.globalData.access_token = res.data.access_token;
        // 判断上个页面是否传递值下来
            that.setData({
                access_token: res.data.access_token
              })
      },
    }) 
    //卧室
    wx.request({
      url: "https://open.ys7.com/api/lapp/token/get?appKey=419538bd56db4853bb3dbc992d97a10c&appSecret=6e030e8572d39953c565d0997d2629ad",
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
         console.log(res.data.data.accessToken);
        that.setData({
          access_token1: res.data.data.accessToken
        });
      }
    })
    
    
    wx.hideLoading()
  },
  onReady: function () {
  },
 
  

//活动中心
  track (e){
    var that =this
    console.log(e)
    if (e.target.dataset.trackshow =="进行人脸追踪"){
      that.setData({
        trackshow: "停止人脸追踪",
        canvasshow: true
      })
      that.takePhoto()
      that.interval = setInterval(this.takePhoto, 500)
    }else{
      clearInterval(that.interval)
      that.setData({
        trackshow: "进行人脸追踪",
        canvasshow: false
      })
    }
  },
  //卧室
  track1 (e){
    var that =this
    console.log(e)
    if (e.target.dataset.trackshow =="进行人脸追踪"){
      that.setData({
        trackshow1: "停止人脸追踪",
        canvasshow1: true
      })
      that.takePhoto1()
      that.interval = setInterval(this.takePhoto1, 500)
    }else{
      clearInterval(that.interval)
      that.setData({
        trackshow1: "进行人脸追踪",
        canvasshow1: false
      })
    }
  },
//活动中心
  takePhoto() {
    console.log("开始拍照takePhoto")
    var that = this
    var takephonewidth
    var takephoneheight
    that.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        // console.log(res.tempImagePath),
        // 获取图片真实宽高
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            takephonewidth= res.width,
            takephoneheight = res.height
          }
        })
        // console.log(takephonewidth, takephoneheight)
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log(that.data)
            console.log(res)
            //活动中心
            wx.request({
              url: "https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=" + that.data.access_token,
              data: {
                image:res.data,
                image_type:"BASE64",
                max_face_num:10,
                face_field:'age,beauty,emotion'
              },
              // dataType: "json",
              header: {
                'content-type': 'application/json; charset=UTF-8'
               },
               method: 'POST',
              success: function (res) {
                console.log(res.data);
                
                if (res.data.error_code === 0) { 
                  var ctx = wx.createContext()
                  ctx.setStrokeStyle('yellow')
                  // ctx.lineWidth = 3
                  ctx.setLineWidth(3)
                  for (let j = 0; j < res.data.result.face_num; j++){
                    var cavansl = res.data.result.face_list[j].location.left / takephonewidth * that.data.windowWidth
                    var cavanst = res.data.result.face_list[j].location.top / takephoneheight * that.data.windowWidth
                    var cavansw = res.data.result.face_list[j].location.width / takephonewidth * that.data.windowWidth
                    var cavansh = res.data.result.face_list[j].location.height / takephoneheight * that.data.windowWidth
                    var emotionType = res.data.result.face_list[j].emotion.type;
                    var emotion = '';
                    // console.log(takephonewidth * that.data.windowWidth)
                    // console.log(res.data.result.face_list[j].location.left)
                    
                    if (emotionType =='angry'){
                      emotion = '愤怒';
                    }else if (emotionType == 'disgust') {
                      emotion = '厌恶';
                    }else if (emotionType == 'fear') {
                      emotion = '恐惧';
                    }else if (emotionType == 'happy') {
                      emotion = '高兴';
                    }else if (emotionType == 'sad') {
                      emotion = '伤心';
                    }else if (emotionType == 'surprise') {
                      emotion = '惊讶';
                    } else if (emotionType == 'neutral'){
                      emotion = '无情绪';
                    }else{
                      emotion = '未知表情';
                    }
                    var cavanstext = '年龄:' + res.data.result.face_list[j].age + ' 颜值:' + res.data.result.face_list[j].beauty + ' 表情:' + emotion
                    ctx.setFontSize(14);
                    ctx.setFillStyle("blue")//文本颜色
                    ctx.fillText(cavanstext, cavansl, cavanst - 2)
                     ctx.strokeRect(cavansl, cavanst, cavansw, cavansh)
                  }
                     wx.drawCanvas({
                                      canvasId: 'canvas',
                                      actions: ctx.getActions()
                                    })
                                  } else{
                                  var ctx = wx.createContext()
                                  ctx.setStrokeStyle('black')
                                  ctx.lineWidth = 3
                                  wx.drawCanvas({
                                    canvasId: 'canvas',
                                    actions: ctx.getActions()
                                  })               
                }
                // console.log(res.data.result.face_list[0].emotion.type)
                if(res.data.result.face_list[0].emotion.type==='happy'){
                  that.data.sum++
                  if(that.data.sum>3){
                    console.log("sanci")
                    wx.request({
                      url:'http://localhost:8080/api_v1/sendSMS2', //接口地址
                     
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
                }
              },
              })
              }
          })
        }
      }
    )
  },
  //卧室
  takePhoto1() {
    console.log("开始拍照takePhoto")
    var that = this
    var takephonewidth
    var takephoneheight
    that.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        // console.log(res.tempImagePath),
        // 获取图片真实宽高
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            takephonewidth= res.width,
            takephoneheight = res.height
          }
        })
        // console.log(takephonewidth, takephoneheight)
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log(that.data)
            console.log(res.data)
            //活动中心
            wx.request({
              url: "https://open.ys7.com/api/lapp/intelligence/face/analysis/detect?accessToken=" + that.data.access_token1,
              data: {
                image:res.data,
                image_type:"BASE64",
                max_face_num:10,
                face_field:'age,beauty,emotion'
              },
              // dataType: "json",
              header: {
                // 'content-type': 'application/json; charset=UTF-8'
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
               },
               method: 'POST',
              success: function (res) {
                console.log(res.data);
                if (res.data.error_code === 0) { 
                  var ctx = wx.createContext()
                  ctx.setStrokeStyle('yellow')
                  // ctx.lineWidth = 3
                  ctx.setLineWidth(3)
                  for (let j = 0; j < res.data.result.face_num; j++){
                    var cavansl = res.data.result.face_list[j].location.left / takephonewidth * that.data.windowWidth
                    var cavanst = res.data.result.face_list[j].location.top / takephoneheight * that.data.windowWidth
                    var cavansw = res.data.result.face_list[j].location.width / takephonewidth * that.data.windowWidth
                    var cavansh = res.data.result.face_list[j].location.height / takephoneheight * that.data.windowWidth
                    var emotionType = res.data.result.face_list[j].emotion.type;
                    var emotion = '';
                    // console.log(takephonewidth * that.data.windowWidth)
                    // console.log(res.data.result.face_list[j].location.left)
                    
                    if (emotionType =='angry'){
                      emotion = '愤怒';
                    }else if (emotionType == 'disgust') {
                      emotion = '厌恶';
                    }else if (emotionType == 'fear') {
                      emotion = '恐惧';
                    }else if (emotionType == 'happy') {
                      emotion = '高兴';
                    }else if (emotionType == 'sad') {
                      emotion = '伤心';
                    }else if (emotionType == 'surprise') {
                      emotion = '惊讶';
                    } else if (emotionType == 'neutral'){
                      emotion = '无情绪';
                    }else{
                      emotion = '未知表情';
                    }
                    var cavanstext = '年龄:' + res.data.result.face_list[j].age + ' 颜值:' + res.data.result.face_list[j].beauty + ' 表情:' + emotion
                    ctx.setFontSize(14);
                    ctx.setFillStyle("blue")//文本颜色
                    ctx.fillText(cavanstext, cavansl, cavanst - 2)
                     ctx.strokeRect(cavansl, cavanst, cavansw, cavansh)
                  }
                     wx.drawCanvas({
                                      canvasId: 'canvas',
                                      actions: ctx.getActions()
                                    })
                                  } else{
                                  var ctx = wx.createContext()
                                  ctx.setStrokeStyle('black')
                                  ctx.lineWidth = 3
                                  wx.drawCanvas({
                                    canvasId: 'canvas',
                                    actions: ctx.getActions()
                                  })               
                }
                // console.log(res.data.result.face_list[0].emotion.type)
                if(res.data.result.face_list[0].emotion.type==='happy'){
                  that.data.sum++
                  if(that.data.sum>3){
                    console.log("sanci")
                    wx.request({
                      url:'http://localhost:8080/api_v1/sendSMS2', //接口地址
                     
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
                }
              },
              })
              }
          })
        }
      }
    )
  },

  handleBtn() {
    console.log(navbar.methoddata)
    wx.request({
      url:'http://localhost:8080/api_v1/register', //接口地址
      data: {
        "methoddata":navbar.methoddata
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