// miniprogram/pages/wdpj/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_height: 0,
    zdg: [],
  },
  directxq(e) {

    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/nav/ayxq/ayxq?item=' + JSON.stringify(item) + '&title=了解详情'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    let pages = getCurrentPages()
    let prvPage = pages[pages.length -2]
    console.log(prvPage.data.gzlb)
    this.setData({
      currentIndex: options.index,
      scroll_height: windowHeight * 750 / windowWidth,
      zdg: prvPage.data.gzlb
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

  }
})