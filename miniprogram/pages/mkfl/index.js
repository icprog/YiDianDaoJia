Page({
  data: {
    statusType: [],
    currentType: '全部',
    currentIndex: 0,
    scroll_height: 0,
    orderList: [],
    selected: [],
    type:"",
    item: {}
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData(
      {
        type: options.title
      }
    )
    let pages = getCurrentPages()
    let prv = pages[pages.length - 2]
    this.setData({
      statusType: prv.data.zymk
    })
  },
  statusTap: function(e) {

    const curIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: curIndex
    });
  },
  onShow() {
    //更新列表
  },
  nav(e) {
    if (this.data.type === '其他自营') {
      wx.navigateTo({
        url: '/pages/nav/zy/zy?title=' + e.currentTarget.dataset.title
      })
    } else if (this.data.type === '其他服务') {
      wx.navigateTo({
        url: '/pages/nav/js/js?title=' + e.currentTarget.dataset.title
      })
    }
  },
});