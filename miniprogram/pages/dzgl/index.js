const app = getApp()
Page({
  data: {
    addressList: [],
    defaultBh:0,
    from:'',
  },

  address: function(e) {
    wx.navigateTo({
      url: "/pages/address-add/index?item=" + JSON.stringify(e.currentTarget.dataset.item)+"&from="+e.currentTarget.dataset.from
    })
  },
  select:function(e)
  {
    if(this.data.from==='select')
    {
      let pages = getCurrentPages()
      let prvPage = pages[pages.length -2]
      prvPage.setData(
        {
          selectedIndex: e.currentTarget.dataset.index,
        }
      )
      wx.navigateBack({})
    }
  },
  onLoad: function(e) {
    
    this.data.from=e.from

  },
  onShow()
  {
    let that = this;
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      data:
      {
        openid: app.globalData.openid,//身份验证
        //身份验证
        type: "get",
        //发送数据的类型为获取
        content: "dzxx",
        // 内容
        script: "地址信息",//描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.status === 'success') {
            that.setData(
              {
                addressList: res.data.data.dzxx,
                defaultBh: res.data.data.defaultBh
              }
            )
          }
          else {
          }
        }
        else {
          wx.showModal({
            title: '提示',
            content: '获取失败',
            showCancel: false
          })
        }
      }, fail(res) {
        wx.showModal({
          title: '提示',
          content: '获取失败',
          showCancel: false
        })
      }
    })
  }
 
})