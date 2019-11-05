const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: app.globalData.hasLogin,
    wxtx: app.globalData.wxtx,
    wxnc: app.globalData.wxnc
  },
  kf() {
    if (app.globalData.hasLogin) {
      wx.navigateTo({
        url: '/pages/chat/index',
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '正在登陆',
      mask:true
    })
    let that = this

    wx.cloud.callFunction({
      name: "login",
      success(res) {
        app.globalData.openid = res.result.openid;//保存openid
        if (e.detail.userInfo) {
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (res) {
                    console.log(res)
                    app.globalData.wxnc = res.userInfo.nickName;//保存昵称
                    app.globalData.wxtx = res.userInfo.avatarUrl;//保存头像
                    wx.request({
                      url: 'https://yddj.panzongyan.cn/wxchat/my/login',
                      data: {
                        type: "send",//发送数据的类型为获取
                        content: "sfxx",//内容"
                        openid: app.globalData.openid,//身份openid
                        wxtx: res.userInfo.avatarUrl,//微信头像
                        wxnc: res.userInfo.nickName,//微信昵称
                        script: "身份信息",//描述
                      },
                      success(res) {
                        console.log(res)
                        if (res.statusCode == 200) {
                          if (res.data.status == 'success') {
                            app.globalData.hasLogin = true;
                            that.updateInfo();
                            wx.showModal({
                              title: '提示',
                              content: '登陆成功',
                              showCancel: false
                            })
                          }
                          else {
                            wx.showModal({
                              title: '提示',
                              content: res.data.message,
                              showCancel: false
                            })
                          }
                        }
                        else {
                          wx.showModal({
                            title: '提示',
                            content: '状态码错误',
                            showCancel: false
                          })
                        }
                      },
                      fail(res) {
                        console.log(res)
                      }
                    })

                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '登陆失败',
                      showCancel: false
                    })
                  },
                  complete()
                  {
                    wx.hideLoading()
                  }
                });
              }
            }
          });
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '登陆失败',
          showCancel: false
        })
      },
      complete()
      {
        
      }
    })
  },
  updateInfo: function () {
    this.setData(
      {
        hasLogin: app.globalData.hasLogin,
        wxtx: app.globalData.wxtx,
        wxnc: app.globalData.wxnc
      }
    )
    console.log(this.data.hasLogin)
  },
  goOrder: function (e) {
    if (!app.globalData.hasLogin) {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
    else
      wx.navigateTo({
        url: "/pages/order-list/index?index=" + e.currentTarget.dataset.index
      })
  },
  centerDirect: function (e) {
    if (app.globalData.hasLogin) {
      let from = e.currentTarget.dataset.from;
      if (from === 'dzgl')//地址管理
      {
        wx.navigateTo(
          {
            url: '/pages/dzgl/index?from=dzgl'
          }
        )
      }
      else if(from === 'tszx')
      {
        wx.navigateTo(
          {
            url: "/pages/feedback/feedback"
          }
        )
       
      }
      else if (from === 'sjrz') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/sjphone',
          data:
          {
            openid: app.globalData.openid,
            type: 'get',
            content: 'hqsjdh',
            script: "获取商家电话",
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              if (res.data.status == 'success') {
                wx.makePhoneCall({
                  phoneNumber: res.data.dh,
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
              }
            }
            else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      }
      else if (from === 'lxpt') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/sjphone',
          data:
          {
            openid:app.globalData.openid,
            type:'get',
            content:'hqsjdh',
            script:"获取商家电话",
          },
          success(res)
          {
            console.log(res)
            if(res.statusCode===200)
            {
              if(res.data.status=='success')
              {
                wx.makePhoneCall({
                  phoneNumber: res.data.dh,
                })
              }
              else
              {
                wx.showModal({
                  title: '提示',
                  content:  res.data.message,
                  showCancel: false
                })
              }
            }
            else
            {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      }
      else if (from === 'yhxy') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/agreement',
          data:
          {
            openid: app.globalData.openid,
            type: 'get',
            content: 'hqyhxy',
            script: "获取用户协议",
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              if (res.data.status == 'success') {
                wx.showModal({
                  title: '用户协议',
                  content: res.data.yhxy,
                  showCancel:false
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content:  res.data.message,
                  showCancel: false
                })
              }
            }
            else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      }
      else if (from === 'yszc') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/policy',//todo:aaa
          data:
          {
            openid: app.globalData.openid,
            type: 'get',
            content: 'hqyszc',
            script: "获取隐私政策",
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              if (res.data.status == 'success') {
                wx.showModal({
                  title: '隐私政策',
                  content: res.data.yszc,
                  showCancel: false
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content:  res.data.message,
                  showCancel: false
                })
              }
            }
            else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      }
      else if (from === 'gywm') {
        wx.showModal({
          title: '关于我们',
          content: '家政服务提供商',
          showCancel:false
        })
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  }
})