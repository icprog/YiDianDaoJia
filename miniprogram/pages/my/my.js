const app = getApp();
const { $Message } = require('../../iview/base/index');
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: app.globalData.hasLogin,
    wxtx: app.globalData.wxtx,
    wxnc: app.globalData.wxnc
  },
  bindGetUserInfo: function (e) {
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
                    app.globalData.hasLogin = true;
                    that.updateInfo();
                  },
                  fail: function () {
                    $Message({
                      content: '登陆失败',
                      type: 'error'
                    });
                  }
                });
              }
            }
          });
        }
      },
      fail: function () {
        $Message({
          content: '登陆失败',
          type: 'error'
        });
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
      wx.showToast({
        title: '请登录',
        icon: 'none',
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
    }
    else {
      $Message({
        content: '请登录',
        type: 'error'
      });
    }
  }
})