// pages/nav/zyxd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/UI/normal.png',
    selectedSrc: '/image/UI/selected.png',
    halfSrc: '/image/UI/half.png',
    zdg: {},
    sl: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData(
      {
        zdg: {
          id: options.id,
          xm: options.xm, //姓名
          jg: options.jg, //价格
          xb: options.xb, //性别
          nl: options.nl, //年龄
          dd: "", //地点
          xj: options.xj, //星级
          fwcs: options.fwcs, //服务次数
          jl: options.jl, //距离
          tx: options.tx, //头像
        }
      }
    )
  },
  handleChange: function (options) {
    this.setData({
      sl: options.detail.value
    })
  },
  confirmPay: function () {

  }
})