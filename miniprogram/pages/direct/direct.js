let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/UI/normal.png',
    selectedSrc: '/image/UI/selected.png',
    halfSrc: '/image/UI/half.png',
    zdg:[],
    region: ["", "选择地区"],
    scroll_height: app.globalData.scroll_height,
  },
  onLoad: function(e) {
    this.loadZdg()
    //载入数据
    if (app.globalData.region[1] === "选择地区") {
      app.getPosition().then(res => {
        app.globalData.region = res;
        this.setData({
          region: app.globalData.region
        })
      });
    } else {
      this.setData({
        region: app.globalData.region
      })
    }
  },
  loadZdg: function() {
    let that  = this
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/module2/index',
      method: 'post',
      data: {
        district: "河北省石家庄市"
      },
      success: function(res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            zdg: res.data
          })
        }
      },
      complete: function() {
        
      }
    })
  },
  stringify: function(e) {
    return JSON.stringify(e);
  }
})