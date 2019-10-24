// pages/nav/zyxd.js
let app = getApp();
const { $Message } = require('../../iview/base/index');
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
    ddbz: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData({
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
    })
    //获取地址
    let that = this
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      method: 'post',
      data: {
        useruuid: "ozi5W47CX8DYHQ6wE_g6P0U6TBc4",
        type: "get",
        content: "dzxx",
        script: "地址信息"
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
        }
      }
    })


  },
  handleChange: function (options) {
    this.setData({
      sl: options.detail.value
    })
  },
  ddbzInput: function (e) {
    this.setData(
      {
        ddbz: e.detail.value
      }
    )
  },
  order: function () { //(this.data.sl * this.data.zdg.jg) * 100
    if (app.globalData.hasLogin) {
      if (this.data.time !== '' && this.data.date !== '') {
        let that = this;
        wx.cloud.callFunction({
          name: "pay",
          data: {
            orderid: "" + new Date().getTime(),
            money: 2
          },
          success(res) {
            var date = that.data.date + ' ' + that.data.time + ':00';
            date = date.substring(0, 19);
            date = date.replace(/-/g, '/');
            var timestamp = new Date(date).getTime();
            wx.request({
              url: 'http://www.panzongyan.cn/wxchat/wxx/s_order',
              method: 'post',
              data: {
                useruuid: "ozi5W47CX8DYHQ6wE_g6P0U6TBc4",
                dzbh: "1234",
                aybh: that.data.zdg.id,
                sl: that.data.sl,
                fwsj: timestamp,
                ddbz: that.data.ddbz,
                type: "send",
                content: "xdbjzy",
                script: "下单保洁直约"
              },
              success: function (res) {
                if (res.statusCode === 200) {
                  console.log(res.data)
                }
              }
            })
            that.pay(res.result)
          },
          fail(res) {
            console.log("提交失败", res)
          }
        })
      }
      else {
        $Message({
          content: '请选择服务日期和服务时间',
          type: 'error'
        });
      }
    }
    else{
      $Message({
        content: '请登录',
        type: 'error'
      });
    }
  },
  //实现小程序支付
  pay(payData) {
    //官方标准的支付方法
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
      signType: 'MD5',
      paySign: payData.paySign, //签名
      success(res) {
        console.log("支付成功", res)
        wx.switchTab({
          url: '/pages/my'
        })
      },
      fail(res) {
        $Message({
          content: '支付失败',
          type: 'error'
        });
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  }

})