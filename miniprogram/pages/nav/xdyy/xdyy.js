// pages/nav/zyxd.js

let app = getApp();
const {myPay} = require('../../../utils/myPay.js')
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
    sl: 1,
    time: '',
    date: '',
    ddbz: '',
    defaultIndex: -1,
    selectedIndex: -1,
    item: {},
    dzxx: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData({
      zdg: JSON.parse(options.item)
    })
    let that = this
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      data: {
        "openid": app.globalData.openid,
        //身份验证
        "type": "get",
        //发送数据的类型为获取
        "content": "dzxx",
        // 内容
        "script": "地址信息", //描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status === 'success') {
            that.setData({
              dzxx: res.data.data.dzxx
            })
            //更新地址信息
            for (let index = 0; index < that.data.dzxx.length; index++) {
              const element = that.data.dzxx[index];
              if (element.bh === res.data.data.defaultBh) {
                that.setData({
                  defaultIndex: index,
                  selectedIndex: index
                })
              }
            }
          }
          else {
            wx.showModal({
              title: '提示',
              content: '请先添加地址',
              showCancel: false
            })
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  handleChange: function(options) {
    this.setData({
      sl: options.detail.value
    })
  },
  ddbzInput: function(e) {
    this.setData({
      ddbz: e.detail.value
    })
  },
  order() {
    var date = this.data.date + ' ' + this.data.time + ':00';
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    if (app.globalData.hasLogin) {
      if(this.data.selectedIndex!=-1)
      {
        if (this.data.time !== '' && this.data.date !== '') {
          myPay({
            data: {
              openid: app.globalData.openid,
              dzbh: this.data.dzxx[this.data.selectedIndex].bh,
              aybh: this.data.zdg.id,
              sl: this.data.sl,
              fwsj: timestamp,
              ddbz: this.data.ddbz,
              type: "send",
              content: "xdbjzy",
              script: "下单保洁直约",
            },
            info: "保洁直约",
            money: 1,
            url: 'http://www.panzongyan.cn/wxchat/wxx/s_order'
          }).then(() => {
            wx.switchTab({
              url: '/pages/direct/direct',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            }).catch((res) => {
              wx.showModal({
                title: '提示',
                content: res.reason,
                showCancel: false
              })})
        } else {
          wx.showModal({
            title: '提示',
            content: '请选择服务时间',
            showCancel: false
          })
        }
      }
      else
      {
        wx.showModal({
          title: '提示',
          content: '请先添加地址',
          showCancel: false
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  onShow() {
    let that = this
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      data: {
        "openid": app.globalData.openid,
        //身份验证
        "type": "get",
        //发送数据的类型为获取
        "content": "dzxx",
        // 内容
        "script": "地址信息", //描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status === 'success') {
            that.setData({
              dzxx: res.data.data.dzxx
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '请先添加地址',
              showCancel: false
            })
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    this.setData({
      selectedIndex: this.data.selectedIndex
    })
  },
})