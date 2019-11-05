let app = getApp();
Page({
  data: {
    //自营模块
    zymk: [{
      img: '/image/UI/kfkh.png',
      title: '空房开荒',
    }, {
      img: '/image/UI/zycbl1.png',
      title: '专业擦玻璃',

    }, {
      img: '/image/UI/dbdl.png',
      title: '地板打蜡',

    }, {
      img: '/image/UI/czmf.png',
      title: '瓷砖美缝',

    }, {
      img: '/image/UI/dlsjm.png',
      title: '大理石晶面',

    }, {
      img: '/image/UI/sfqx.png',
      title: '沙发清洗',

    }, {
      img: '/image/UI/cdqx.png',
      title: '床垫清洗',

    }, {
      img: '/image/UI/dtqx.png',
      title: '地毯清洗',

    }, {
      img: '/image/UI/clqx1.png',
      title: '窗帘清洗',

    }, {
      img: '/image/UI/gdfw.png',
      title: '更多服务',

    },],
    zszy: [{
      img: '/image/UI/bmys.png',
      title: '保姆月嫂',

    }, {
      img: '/image/UI/gdst.png',
      title: '管道疏通',

    }, {
      img: '/image/UI/jdwx.png',
      title: '家电维修',

    }, {
      img: '/image/UI/kshs.png',
      title: '开锁换匙',

    }, {
      img: '/image/UI/smhs.png',
      title: '上门回收',

    }, {
      img: '/image/UI/xhlz.png',
      title: '鲜花绿植',

    }, {
      img: '/image/UI/bjhy.png',
      title: '搬家货运',

    }, {
      img: '/image/UI/qtfw.png',
      title: '其他服务',

    }],
    region: ["", "选择地区"],
    zytext: "1.平台服务商严选入驻服务安心\n2.平台五抽成服务商服务用心\n3.平台提供交易资金担保放心\n4.平台服务商一键对比省心",
    notice: "示例消息",
    scroll_height: 0
  },
  bindRegionChange: function (e) {
    let that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data:
      {
        address: e.detail.value[0] + e.detail.value[1] + e.detail.value[2],
        region: e.detail.value[1],
        key: '3G2BZ-YAT3F-4CJJP-NYDUW-G5KXH-EZFT5',
      },
      success(res) {
        if (res.statusCode == 200 && res.data.status == 0) {
          that.setData({
            region: e.detail.value
          });
          app.globalData.region = that.data.region
          app.globalData.position = [res.data.result.location.lng, res.data.result.location.lat]

        }
        else {
          wx.showModal({
            title: '提示',
            content: '地址获取失败',
            showCancel: false
          })
        }
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: '地址获取失败',
          showCancel: false
        })
      }
    })

  },
  directNav: function (e) {
    wx.switchTab({
      url: '../direct/direct'
    })
  },
  re() {
    app.getPosition().then(res => {
      console.log(res)
      app.globalData.region = res.region
      app.globalData.position = res.position
      wx.showModal({
        title: '提示',
        content: '定位成功',
        showCancel: false
      })
      this.setData(
        {
          region: app.globalData.region
        }
      )
    }).catch(res=>
    {
      wx.showModal({
        title: '提示',
        content: '定位失败',
        showCancel: false
      })
    })
  },
  onLoad: function () {
 
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (250) - 30
    })
    
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
  getPosition: function () {
    return new Promise((resolve, reject) => {
      let app = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=3G2BZ-YAT3F-4CJJP-NYDUW-G5KXH-EZFT5";
          wx.request({
            url: getAddressUrl,
            success: res => {
              if (res.statusCode != 200) {
                reject(res);
              } else {
                let reg = [
                  res.data.result.address_component.province,
                  res.data.result.address_component.city,
                  res.data.result.address_component.district
                ];
                resolve(reg);
              }
            },
            fail(res) {
              reject(["", "选择地区"]);
            }
          });
        }
      })
    });
  },
  nav(e) {
    console.log(e)
    if (app.globalData.hasLogin) {
      if (e.currentTarget.dataset.type === 'zymk') {
        if (e.currentTarget.dataset.title != '更多服务')
          wx.navigateTo({
            url: '/pages/nav/zy/zy?title=' + e.currentTarget.dataset.title
          })
        else {
          wx.showModal({
            title: '提示',
            content: '暂无',
            showCancel: false
          })
        }
      }
      else if (e.currentTarget.dataset.type === 'jszy') {
        if (e.currentTarget.dataset.title != '其他服务')
          wx.navigateTo({
            url: '/pages/nav/js/js?title=' + e.currentTarget.dataset.title
          })
        else {
          wx.showModal({
            title: '提示',
            content: '暂无',
            showCancel: false
          })
        }
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
    let that = this
    if (app.globalData.region[0] != '') {
      this.setData(
        {
          region: app.globalData.region
        }
      )
    }
    else {
      app.getPosition().then(res => {
        console.log(res)
        app.globalData.region = res.region
        app.globalData.position = res.position
        this.setData(
          {
            region: app.globalData.region
          }
        )
      })
    }
    wx.request({
      url: 'https://yddj.panzongyan.cn/wxchat/module2/gdt',
      method: 'get',
      data: {},
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          if (res.data.status === "success") {
            that.setData({
              notice: res.data.gdgg
            });
          }
          else {
            wx.showModal({
              title: '提示',
              content: res.data.message,
              showCancel: false
            })
          }
        }
      }
    })
  }
});