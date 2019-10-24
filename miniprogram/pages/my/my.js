let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxnc: "",//微信昵称
    sjh: "",//手机号
    tx: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571850510196&di=44155f6e0155f1002be37105e57fb985&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01786557e4a6fa0000018c1bf080ca.png"//头像
    , hasLogin: false
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        hasLogin:app.globalData.hasLogin,
        wxnc: app.globalData.yhxx.nickName,
        tx: app.globalData.yhxx.avatarUrl
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this
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
                            app.globalData.hasLogin = true;
                            that.setData(
                              {
                                hasLogin: app.globalData.hasLogin,
                                wxnc: app.globalData.yhxx.nickName,
                                tx: app.globalData.yhxx.avatarUrl
                              }
                            );
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
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})