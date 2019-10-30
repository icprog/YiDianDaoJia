// pages/nav/zyxd.js

let app = getApp();
const {
  $Message
} = require('../../../iview/base/index');
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
    defaultIndex: 0,
    selectedIndex: 0,
    item: {},
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
        "script": "地址信息", //描述
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode === 200) {
          that.setData({
            dzxx: res.data.data.dzxx
          })
          //更新地址信息
          for (let index = 0; index < that.data.dzxx.length; index++) {
            const element = that.data.dzxx[index];
            if (element.bh === that.data.selectedBh) {
              that.setData({
                defaultIndex: index,
                selectedIndex: index
              })
            }
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
    console.log(myPay)
    var date = this.data.date + ' ' + this.data.time + ':00';
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    if (app.globalData.hasLogin) {
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
          info:"保洁直约",
          money:1,
          url: 'http://www.panzongyan.cn/wxchat/wxx/s_order'
        }).then(()=>
        {
          wx.navigateBack({
          })
        }).catch((res) => $Message({
          content: res.reason,
          type: 'error'
        }))
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
    this.setData({
      selectedIndex: this.data.selectedIndex
    })
  },

})