let app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad:function()
  {
    wx.checkSession(
      {
        success:function(res)
        {
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (res) {
                    console.log(res)
                    app.globalData.yhxx = res.userInfo;
                    wx.switchTab({
                      url: '/pages/index'
                    })
                  }
                });
              }
            }
          });
        },
        fail:function()
        {
          wx.login({
            success: function (res) {
              console.log(res.code)
              if (res.code) {
                wx.request({
                  url: 'http://www.panzongyan.cn/wxchat/login/login',
                  method: 'post',
                  data: {
                    code: res.code
                  },
                  success: function (res) {
                    if (res.statusCode === 200) {
                      console.log(res.data)
                      wx.getSetting({
                        success: function (res) {
                          if (res.authSetting['scope.userInfo']) {
                            wx.getUserInfo({
                              withCredentials: true,
                              success: function (res) {
                                console.log(res)
                                app.globalData.yhxx = res.userInfo;
                                wx.switchTab({
                                  url: '/pages/index'
                                })
                              }
                            });
                          }
                        }
                      });
                    }
                  },
                  complete: function () {
        
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      }
    )
  }
})