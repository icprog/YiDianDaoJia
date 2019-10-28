// pages/nav/zyxd.js
const { $Message } = require('../../../iview/base/index');
let app = getApp();
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
    scroll_height:0,
    isFans:true,
    pj: [{
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "很好哈哈哈哈哈哈哈哈哈",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    },
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    }
    ]
    ,
    sl: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      zdg: JSON.parse(options.item),
      scroll_height: windowHeight * 750 / windowWidth - (400) - 30
    })
    // wx.request({
    //   url: 'http://www.panzongyan.cn/wxchat/module2/mtpl',
    //   method: 'post',
    //   data: {
    //     "useruuid": "xxx",//身份验证
    //     "type": "get",//发送数据的类型为获取
    //     "aybh": that.data.zdg.id,//阿姨编号
    //     "content": "zdgkhpj",//内容
    //     "script": "钟点工客户评价",//描述
    //   },
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.log(res.data)
    //     }
    //   },
    // })
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
                openid: app.globalData.openid,
                dzbh: 0,
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
})