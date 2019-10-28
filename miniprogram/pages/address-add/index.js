const WXAPI = require('apifm-wxapi')
//获取应用实例
var app = getApp()
Page({
  data: {
    from:'',
    addressData:null
  },
  bindSave: function (e) {
    var that = this;
    var lxr = e.detail.value.lxr;
    var lxdz = e.detail.value.lxdz;
    var lxdh = e.detail.value.lxdh;
    console.log(lxr + lxdz + lxdh)
    if (lxr == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (lxdh == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (lxdh == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
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
        lxr: lxr,//联系人姓名
        lxdh: lxdh,//联系电话
        fwdz: lxdz,//地址
      }
    })
  },
  onLoad: function (e) {
    this.setData(
      {
        from : e.from
      }
    )
    if (e.from === 'select') {
     
    }
    else if (e.from === 'edit') {
      wx.setNavigationBarTitle(
        {
          title: "修改地址"
        }
      )
      this.setData(
        {addressData:JSON.parse(e.item)}
      )
    }
    else if (e.from === 'add') {

    }

  },
  deleteAddress: function (e) {
    let that = this;
    let bh = e.currentTarget.dataset.bh;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://www.panzongyan.cn/wxchat/login/tjdz',
            data:
            {
              openid:app.globalData.openid ,//身份验证
              "bh": e.bh,//地址唯一编号
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
