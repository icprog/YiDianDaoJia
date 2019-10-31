let app = getApp();
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/UI/normal.png',
    selectedSrc: '/image/UI/selected.png',
    halfSrc: '/image/UI/half.png',
    sort: "",
    reverse: false,
    zdg: [],
    sort_list: ['距离', '价格', '评分'],
    scroll_height: 0,
    idx: 0
  },
  onLoad: function (e) {

    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (280) - 30
    })
  },
  loadZdg: function () {
    let that = this
    wx.request({
      url: 'https://1024.lovelywhite.cn/wxchat/module2/index',
      method: 'post',
      data: {
        openid: app.globalData.openid,//身份验证
        district: "河北省石家庄市"
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            zdg: res.data.sort((a, b) => {
              if (a.jl > b.jl) return 1
              else if (a.jl === b.jl) return 0
              else return -1
            })
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '加载失败',
          showCancel: false
        })
      },
      complete: function () {
      }
    })
  },
  stringify: function (e) {
    return JSON.stringify(e);
  },
  sort(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    let temp;
    this.setData({
      idx: index,
      reverse: !that.data.reverse
    })
    console.log(this.data.reverse)
    if (index === 0) {
      if (that.data.reverse)
        temp = that.data.zdg.sort((a, b) => {
          if (a.jl < b.jl) return 1
          else if (a.jl === b.jl) return 0
          else return -1
        })
      else
        temp = that.data.zdg.sort((a, b) => {
          if (a.jl > b.jl) return 1
          else if (a.jl === b.jl) return 0
          else return -1
        })
    }
    else if (index === 1) {
      if (that.data.reverse)
        temp = that.data.zdg.sort((a, b) => {
          if (a.jg < b.jg) return 1
          else if (a.jg === b.jg) return 0
          else return -1
        })
      else
        temp = that.data.zdg.sort((a, b) => {
          if (a.jg > b.jg) return 1
          else if (a.jg === b.jg) return 0
          else return -1
        })

    }
    else {
      if (that.data.reverse)
        temp = that.data.zdg.sort((a, b) => {
          if (a.xj < b.xj) return 1
          else if (a.xj === b.xj) return 0
          else return -1
        })
      else
        temp = that.data.zdg.sort((a, b) => {
          if (a.xj > b.xj) return 1
          else if (a.xj === b.xj) return 0
          else return -1
        })
    }
    this.setData(
      {
        zdg: temp
      }
    )
  },
  directxq(e) {
    if (app.globalData.hasLogin) {
      let title = e.currentTarget.dataset.title
      let item = e.currentTarget.dataset.item
      if (title === '下单预约')
        wx.navigateTo({
          url: '/pages/nav/xdyy/xdyy?item=' + JSON.stringify(item) + '&title=' + title
        })
      else {
        wx.navigateTo({
          url: '/pages/nav/ayxq/ayxq?item=' + JSON.stringify(item) + '&title=' + title
        })
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  onShow()
  {
    this.loadZdg()
  },
  refresh() {
    console.log("refresh")
  }
})