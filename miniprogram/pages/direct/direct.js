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
    region:[],
    sort_list: ['距离', '价格', '评分'],
    scroll_height: 0,
    idx: 0
  },
  kf() {
    if (app.globalData.hasLogin) {
      wx.navigateTo({
        url: '/pages/chat/index',
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  bindRegionChange: function (e) {
    let that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data:
      {
        address: e.detail.value[0] + e.detail.value[1] + e.detail.value[2],
        region:e.detail.value[1],
        key:'3G2BZ-YAT3F-4CJJP-NYDUW-G5KXH-EZFT5',
      },
      success(res)
      {
        if (res.statusCode == 200 && res.data.status == 0)
        {
          that.setData({
            region: e.detail.value
          });
          app.globalData.region = that.data.region
          app.globalData.position = [res.data.result.location.lng,res.data.result.location.lat]
          that.loadZdg()
        }
        else
        {
          wx.showModal({
            title: '提示',
            content: '地址获取失败',
            showCancel:false
          })
        }
      },
      fail(res)
      {
        wx.showModal({
          title: '提示',
          content: '地址获取失败',
          showCancel: false
        })
      }
    })
    
  },
  onLoad: function (e) {

    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (280) - 30
    })
   
  },
  re() {
    app.getPosition().then(res => {
      console.log(res)
      wx.showToast({
        title: '获取地址成功',
      })
      app.globalData.region = res.region
      app.globalData.position = res.position
      this.setData({
        region: res.region,
        position: res.position
      })
    }).catch(res => {
      wx.showToast({
        title: '获取地址失败',
      })
    });
  },
  onPullDownRefresh: function () {
    this.loadZdg()
  },
  loadZdg: function () {
    this.setData({
      zdg:[]
    })
    if(app.globalData.region[0]!='')
    {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      let that = this
      wx.request({
        url: 'https://yddj.panzongyan.cn/wxchat/module2/index',
        method: 'post',
        data: {
          openid: app.globalData.openid,//身份验证
          district: app.globalData.region[1],
          position:that.data.position
        },
        success: function (res) {
          if (res.statusCode === 200) {
            if(res.data.status=='success')
            {
              console.log(res.data)
              res.data.data.forEach(element => {
                element.jl = element.jl.toFixed(1)
              });
              that.setData({
                zdg: res.data.data.sort((a, b) => {
                  if (a.jl > b.jl) return 1
                  else if (a.jl === b.jl) return 0
                  else return -1
                })
              })
            }
            else
            {
              wx.showModal({
                title: '提示',
                content: '该地区无服务',
                showCancel: false
              })
            }
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '加载失败',
              showCancel: false
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
          wx.stopPullDownRefresh()
          wx.hideLoading()
        }
      })
    }
    else
    {
      wx.showModal({
        title: '提示',
        content: '地址未选择',
        showCancel:false
      })
    }
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
  onShow() {
    if (app.globalData.region[0] != '')
      this.setData({
        region: app.globalData.region,
        position: app.globalData.position
      })
    else
      app.getPosition().then(res => {
        console.log(res)
        app.globalData.region = res.region
        app.globalData.position = res.position
        this.setData({
          region: res.region,
          position: res.position
        })
      });
    this.loadZdg()
  },
  refresh() {
    console.log("refresh")
  }
})