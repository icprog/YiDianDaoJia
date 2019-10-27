const WXAPI = require('apifm-wxapi')
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  bindSave: function(e) {
    var that = this;
    var lxr= e.detail.value.lxr;
    var lxdz = e.detail.value.lxdz;
    var lxdh = e.detail.value.lxdh;
    console.log(lxr+lxdz+lxdh)
    if (lxr == ""){
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel:false
      })
      return
    }
    if (lxdh == ""){
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel:false
      })
      return
    }
    if (lxdh == ""){
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel:false
      })
      return
    }
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/tjdz',
      data:
      {
        openid: app.globalData.openid,//身份验证
        content: "tjdzxx",// 内容
        script: "添加地址信息",//描述
        lxr: "12213",//联系人姓名
        lxdh: "13412342222",//联系电话
        fwdz: "河南省郑州市xxx",//地址
      }
    })
  },
  onLoad: function (e) {

  },
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://www.panzongyan.cn/wxchat/login/tjdz',
            data:
            {
              "useruuid": "xxx",//身份验证
              "bh": id,//地址唯一编号
              "content": "scdzxx",// 内容
              "script": "删除地址信息",//描述
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
})
