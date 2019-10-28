// pages/nav/zyxd.js
let app = getApp();
const {
  $Message
} = require('../../../iview/base/index');
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
    defaultBh: 0,
    defaultItem: '',
    dzxx: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData({
      zdg: JSON.parse(options.item)
    })
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      data: {
        "openid": app.globalData.openid,
        //身份验证
        "type": "get",
        //发送数据的类型为获取
        "content": "dzxx",
        // 内容
        "script": "地址信息",//描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {

          that.setData({
            defaultBh: res.data.data.defaultBh,
            dzxx: res.data.data.dzxx
          })
          for (let index = 0; index < res.data.dzxx.length; index++) {
            const element = res.data.dzxx[index];
            if (element.bh === that.data.defaultBh) {
              that.setData({
                defaultItem: element
              })
              break
            }
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    console.log(this.data.zdg)
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
  order: function() { //(this.data.sl * this.data.zdg.jg) * 100
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
                openid: app.globalData.openid,
                dzbh: "1234",
                aybh: that.data.zdg.id,
                sl: that.data.sl,
                fwsj: timestamp,
                ddbz: that.data.ddbz,
                type: "send",
                content: "xdbjzy",
                script: "下单保洁直约"
              },
              success: function(res) {
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
      } else {
        $Message({
          content: '请选择服务日期和服务时间',
          type: 'error'
        });
      }
    } else {
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
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  }

})