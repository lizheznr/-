var app = getApp()
Page({
  data: {
    navbar: [ '分类', '推荐'],
    currentTab: 0,
    index:0,
    index1:0,
    index2:0,
    /**分类导航 */
    categoryList: {
      pageone: [{
        name: "养生常识",
        src: "https://wx1.sinaimg.cn/mw690/006P6Ah5ly1gkb8osk6iaj30fk0f0t8t.jpg",
        url: "/pages/_1/_1"
      }, {
        name: "疾病百科",
        src: "https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8osnfrsj30fj0f0747.jpg",
          url: "/pages/_2/_2"
      }, {
        name: "食品安全",
          src: "https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8p2n3uyj30fk0f0aac.jpg",
          url: "/pages/_3/_3"
      }, {
        name: "消防知识",
          src: "https://wx4.sinaimg.cn/mw690/006P6Ah5ly1gkb8p2t360j30fj0f0aa5.jpg",
          url: "/pages/_4/_4"
      }, {
        name: "医养结合",
          src: "https://wx1.sinaimg.cn/mw690/006P6Ah5ly1gkb8p2up0lj30fj0f0aa8.jpg",
          url: "/pages/_5/_5"
      }, {
        name: "医疗卫生",
          src: "https://wx2.sinaimg.cn/mw690/006P6Ah5ly1gkb8p2uzzrj30fk0f1wep.jpg",
          url: "/pages/_6/_6"
      }, {
        name: "舒适居住",
          src: "https://wx3.sinaimg.cn/mw690/006P6Ah5ly1gkb8p2t159j30fj0f0t8s.jpg",
          url: "/pages/_7/_7"
      }, {
        name: "文化娱乐",
          src: "https://wx2.sinaimg.cn/mw1024/006P6Ah5ly1gkb8pddbh4j30fk0f0q3d.jpg",
          url: "/pages/_8/_8"
      }],
    },
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  jishu: function () {
    var that = this;
    this.setData({ index: that.data.index + 1 });

  },
  jishu1: function () {
    var that = this;
    this.setData({ index1: that.data.index1 + 1 });

  },
  jishu2: function () {
    var that = this;
    this.setData({ index2: that.data.index2 + 1 });

  },
})

