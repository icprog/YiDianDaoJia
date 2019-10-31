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
    var fwdz = e.detail.value.fwdz;
    var lxdh = e.detail.value.lxdh;
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
    if (fwdz == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    wx.request({
      url: this.data.from == 'add' ? 'https://1024.lovelywhite.cn/wxchat/login/tjdz' : 'https://1024.lovelywhite.cn/wxchat/login/xgdz',
      data:
      {
        openid: app.globalData.openid,//身份验证
        content: "tjdzxx",// 内容
        script: "添加/修改地址信息",//描述
        bh: that.data.addressData==null ? '' : that.data.addressData.bh,
        lxr: lxr,//联系人姓名
        lxdh: lxdh,//联系电话
        fwdz: fwdz,//地址
      },
      success(res)
      {
        console.log(res)
        if(res.statusCode ==200)
        {
          if(res.data.status==='success')
          {
            wx.showModal({
              title: '提示',
              content: '成功',
              showCancel: false,
              success(res)
              {
                if (res.confirm)
                {
                  wx.navigateBack({
                  })
                }
              }
            })
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '失败',
              showCancel: false
            })
          }
        }
        else
        {
          wx.showModal({
            title: '提示',
            content: '失败',
            showCancel: false
          })
        }
      },
      fail(res)
      {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '失败',
          showCancel: false
        })
      }
    })
  },
  onLoad: function (e) {
    this.setData(
      {
        from : e.from
      }
    )
    if (e.from === 'edit') {
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
            url: 'https://1024.lovelywhite.cn/wxchat/login/scdz',
            data:
            {
              openid: app.globalData.openid,//身份验证
              bh: bh,//地址唯一编号
              content: "scdzxx",// 内容
              script: "删除地址信息",//描述
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                if (res.data.status === 'success') {
                  wx.navigateBack({})
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: '删除失败',
                    showCancel: false
                  })
                }
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '删除失败',
                  showCancel: false
                })
              }
            }, fail(res) {
              wx.showModal({
                title: '提示',
                content: '删除失败',
                showCancel: false
              })
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }, setDefault: function (e) {
    let that = this;
    let bh = e.currentTarget.dataset.bh;
    wx.showModal({
      title: '提示',
      content: '确定要设置该收货地址位默认地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://1024.lovelywhite.cn/wxchat/login/mrdz',
            data:
            {
              openid: app.globalData.openid,//身份验证
              "bh": bh,//地址唯一编号
              "content": "szmrdz",// 内容
              "script": "设置默认地址",//描述
            },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200) {
                if (res.data.status === 'success') {
                  wx.showModal({
                    title: '提示',
                    content: '设置成功',
                    showCancel: false
                  })
                  wx.navigateBack({})
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: '设置失败',
                    showCancel: false
                  })
                }
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '设置失败',
                  showCancel: false
                })
              }
            }, fail(res) {
              wx.showModal({
                title: '提示',
                content: '设置失败',
                showCancel: false
              })
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
})
