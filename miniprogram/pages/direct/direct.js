const { $Message } = require('../../iview/base/index');
let app = getApp();
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/UI/normal.png',
    selectedSrc: '/image/UI/selected.png',
    halfSrc: '/image/UI/half.png',
    zdg: [{
      bh: "123",//阿姨唯一标识
      xm: "李阿姨",//姓名
      jg: "35",//价格
      xb: "女",//性别
      nl: "42",//年龄
      dd: "湖南",//地点
      xj: 5,//星级
      fwcs: 99,//服务次数
      jl: 3.5,//距离
      tx: "",//头像的url 或者uri 或者 base64
      fss: 111,//粉丝数
      hpl: 0.99,//好评率
    },
    ],
    scroll_height: 0,
  },
  onLoad: function (e) {
    // this.loadZdg()
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (320) - 30
    })
  },
  loadZdg: function () {
    let that = this
    wx.request({
      url: 'https://www.panzongyan.cn/wxchat/module2/index',
      method: 'post',
      data: {
        openid: app.globalData.openid,//身份验证
        district: "河北省石家庄市"
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            zdg: res.data
          })
        }
      },
      fail: function () {
        $Message({
          content: '加载失败',
          type: 'error'
        });
      },
      complete: function () {
      }
    })
  },
  stringify: function (e) {
    return JSON.stringify(e);
  }
})