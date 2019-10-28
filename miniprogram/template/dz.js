// templete/dz.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default: 1234,
    defaultItem:'',
    dzxx: [{
      "bh": "1234",//地址唯一编号
      "lxr": "小白",//联系人姓名
      "lxdh": "12345",//联系电话
      "fwdz": "河南省郑州市xxx",//地址
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        "script": "地址信息",//描述
      },
      success: function (res) {
        if (res.statusCode === 200) {
          that.setData({
            default: res.data.default,
            dzxx: res.data.dzxx
          })
          for (let index = 0; index < res.data.dzxx.length; index++) {
            const element = res.data.dzxx[index];
            if(element.bh===that.data.default)
            {
              that.setData({
                defaultItem:element
              })
              break
            }
          }
        }
      }
    })
  },
})