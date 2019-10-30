// pages/nav/zyxd.js

let app = getApp();
const {
  $Message
} = require('../../../iview/base/index');
const { myPay } = require('../../../utils/myPay.js')
Page({
  data: {
    idx: 0,//select服务种类
    xmbh: "1111",//唯一编号
    fwxq: '<html>或者文字',//服务详情
    fwzl: [//服务种类
    ],
    title: '',
    sl: 1,
    time: '',
    date: '',
    ddbz: '',
    defaultIndex: 0,
    selectedIndex: 0,
    item: {},//地址元数据
    dzxx: [],//地址数据list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData({
      title: options.title
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
      success: function (res) {
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
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/module1/index',
      data:
      {
        openid: "xxx",
        //身份验证
        type: "send",
        //发送数据的类型为获取
        content: "hqzymkxx",
        xmmc: this.data.title,//项目名称
        script: "获取" + this.data.title+"信息",//描述

      },
      success(res)
      {
        console.log(res)
        if(res.statusCode===200)
        {
          if(res.data.status==='success')
          {
            that.setData(
              {
                fwzl:res.data.data.fwzl,
                xmbh:res.data.data.xmbh,
                fwxq:res.data.data.fwxq
              }
            )
          }
          else
          {
            wx.showToast({
              title: '服务种类为空',
            })
          }
        }
      },
      fail(res)
      {
        console.log(res)
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },
  handleChange: function (options) {
    this.setData({
      sl: options.detail.value
    })
  },
  ddbzInput: function (e) {
    this.setData({
      ddbz: e.detail.value
    })
  },
  change(e)
  {
    let index = e.currentTarget.dataset.index;
    this.setData({
      idx: index,
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
            zybh: this.data.xmbh,
            sl: this.data.sl,
            fwsj: timestamp,
            ddbz: this.data.ddbz,
            type: "send",
            content: "xdzymk",
            script: "下单自营模块",
          },
          info: this.data.title+"-"+this.data.fwzl[this.data.idx].xmmc,
          money: 1,
          url: 'xx'
        }).then(() => {
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
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