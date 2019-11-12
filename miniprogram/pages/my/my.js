const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: app.globalData.hasLogin,
    wxtx: app.globalData.wxtx,
    wxnc: app.globalData.wxnc,
    zdg: [],
    gzlb: [],
    gzfwsl: 0
  },
  kf() {
    if (app.globalData.hasLogin) {
      wx.navigateTo({
        url: '/pages/chat/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  bindGetUserInfo: function(e) {
    wx.showLoading({
      title: '正在登陆',
      mask: true
    })
    let that = this
    wx.cloud.callFunction({
      name: "login",
      success(res) {
        app.globalData.openid = res.result.openid; //保存openid
        if (e.detail.userInfo) {
          wx.getSetting({
            success: function(res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function(res) {
                    console.log(res)
                    app.globalData.wxnc = res.userInfo.nickName; //保存昵称
                    app.globalData.wxtx = res.userInfo.avatarUrl; //保存头像
                    wx.request({
                      url: 'https://yddj.panzongyan.cn/wxchat/my/login',
                      data: {
                        type: "send", //发送数据的类型为获取
                        content: "sfxx", //内容"
                        openid: app.globalData.openid, //身份openid
                        wxtx: res.userInfo.avatarUrl, //微信头像
                        wxnc: res.userInfo.nickName, //微信昵称
                        script: "身份信息", //描述
                      },
                      success(res) {
                        console.log(res)
                        if (res.statusCode == 200) {
                          if (res.data.status == 'success') {
                            app.globalData.hasLogin = true;
                            wx.setStorage({
                              key: "user",
                              data: JSON.stringify({
                                openid: app.globalData.openid,
                                wxnc: app.globalData.wxnc,
                                wxtx: app.globalData.wxtx,
                                hasLogin: app.globalData.hasLogin
                              })
                            })
                            that.updateInfo();
                            wx.showModal({
                              title: '提示',
                              content: '登陆成功',
                              showCancel: false
                            })
                            that.loadZdg()
                          } else {
                            wx.showModal({
                              title: '提示',
                              content: res.data.message,
                              showCancel: false
                            })
                          }
                        } else {
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
                  fail: function(res) {
                    console.log(res)
                    wx.showModal({
                      title: '提示',
                      content: '登陆失败',
                      showCancel: false
                    })
                  },
                  complete() {
                    wx.hideLoading()
                  }
                });
              }
            }
          });
        }
      },
      fail: function(res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '登陆失败',
          showCancel: false
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  updateInfo: function() {
    this.setData({
      hasLogin: app.globalData.hasLogin,
      wxtx: app.globalData.wxtx,
      wxnc: app.globalData.wxnc
    })
  },
  goOrder: function(e) {
    if (!app.globalData.hasLogin) {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    } else
      wx.navigateTo({
        url: "/pages/order-list/index?index=" + e.currentTarget.dataset.index
      })
  },
  centerDirect: function(e) {
    if (app.globalData.hasLogin) {
      let from = e.currentTarget.dataset.from;
      if (from === 'dzgl') //地址管理
      {
        wx.navigateTo({
          url: '/pages/dzgl/index?from=dzgl'
        })
      } else if (from === 'tszx') {
        wx.navigateTo({
          url: "/pages/feedback/feedback"
        })

      } else if (from === 'gzfw') {
        if (app.globalData.hasLogin) {
          wx.navigateTo({
            url: "/pages/wdgz/index"
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请登录',
            showCancel: false
          })
        }
      } else if (from === 'sjrz') {
        wx.navigateTo({
          url:'/pages/sjrz/index'
        })
      } else if (from === 'lxpt') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/sjphone',
          data: {
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
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      } else if (from === 'yhxy') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/agreement',
          data: {
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
                  showCancel: false
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      } else if (from === 'yszc') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/policy',
          data: {
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
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      } else if (from === 'gywm') {
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/policy',
          data: {
            openid: app.globalData.openid,
            type: 'get',
            content: 'hqgywm',
            script: "获取关于我们",
          },
          success(res) {
            console.log(res)
            if (res.statusCode === 200) {
              if (res.data.status == 'success') {
                wx.showModal({
                  title: '关于我们',
                  content: res.data.gywm,
                  showCancel: false
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '网络错误',
                showCancel: false
              })
            }
          }
        })
      
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  loadZdg: function() {
    this.setData({
      zdg: [],
      gzlb: [],
    })
    if (app.globalData.region[0] == '') {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      app.getPosition().then(res => {
        console.log(res)
        app.globalData.region = res.region
        app.globalData.position = res.position
        let that = this
        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/my/wxchat/module2/index',
          method: 'post',
          data: {
            openid: app.globalData.openid, //身份验证
            district: app.globalData.region[1],
            position: that.data.position
          },
          success: function(res) {
            if (res.statusCode === 200) {
              if (res.data.status == 'success') {

                res.data.data.forEach(element => {
                  element.jl = element.jl.toFixed(1)
                });
                that.setData({
                  zdg: res.data.data.sort((a, b) => {
                    if (a.jl > b.jl) return 1
                    else if (a.jl === b.jl) return 0
                    else return -1
                  })
                })
                //获取关注列表
                wx.request({
                  url: 'https://yddj.panzongyan.cn/wxchat/my/hqgz',
                  data: {
                    openid: app.globalData.openid, //身份验证
                    content: "hqgzlb", // 内容
                    script: "获取关注列表", //描述
                  },
                  success(res) {
                    console.log(res)
                    if (res.statusCode === 200) {
                      if (res.data.status == 'success') {

                        //设置关注zdg
                        for (let i = 0; i < that.data.zdg.length; i++) {
                          if (res.data.data.includes(that.data.zdg[i].bh)) {
                            that.data.gzlb.push(that.data.zdg[i])
                          }
                        }
                        that.setData({
                          gzlb: that.data.gzlb,
                          gzfwsl: that.data.gzlb.length
                        })

                      } else {}
                    }
                  }
                })
              } else {

              }
            } else {
              wx.showModal({
                title: '提示',
                content: '加载失败',
                showCancel: false
              })
            }
          },
          fail: function() {
            wx.showModal({
              title: '提示',
              content: '加载失败',
              showCancel: false
            })
          },
          complete: function() {
            wx.stopPullDownRefresh()
            wx.hideLoading()
          }
        })
        this.setData({
          region: res.region,
          position: res.position
        })
      }).catch(res => {
        wx.showToast({
          title: '获取地址失败',
        })
        wx.stopPullDownRefresh()
        wx.hideLoading()
      });
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      let that = this
      wx.request({
        url: 'https://yddj.panzongyan.cn/wxchat/module2/index',
        method: 'post',
        data: {
          openid: app.globalData.openid, //身份验证
          district: app.globalData.region[1],
          position: app.globalData.position
        },
        success: function(res) {
          if (res.statusCode === 200) {
            if (res.data.status == 'success') {
              console.log(res.data)
              res.data.data.forEach(element => {
                element.jl = element.jl.toFixed(1)
              });
              that.setData({
                zdg: res.data.data.sort((a, b) => {
                  if (a.jl > b.jl) return 1
                  else if (a.jl === b.jl) return 0
                  else return -1
                })

              })
              //获取关注列表
              wx.request({
                url: 'https://yddj.panzongyan.cn/wxchat/my/hqgz',
                data: {
                  openid: app.globalData.openid, //身份验证
                  content: "hqgzlb", // 内容
                  script: "获取关注列表", //描述
                },
                success(res) {
                  console.log(res)
                  if (res.statusCode === 200) {
                    if (res.data.status == 'success') {

                      //设置关注zdg
                      for (let i = 0; i < that.data.zdg.length; i++) {
                        if (res.data.data.includes(that.data.zdg[i].bh)) {
                          that.data.gzlb.push(that.data.zdg[i])
                        }
                      }
                      that.setData({
                        gzlb: that.data.gzlb,
                        gzfwsl: that.data.gzlb.length
                      })
                    } else {}
                  }
                }
              })
            } else {

            }
          } else {
            wx.showModal({
              title: '提示',
              content: '加载失败',
              showCancel: false
            })
          }
        },
        fail: function() {
          wx.showModal({
            title: '提示',
            content: '加载失败',
            showCancel: false
          })
        },
        complete: function() {
          wx.stopPullDownRefresh()
          wx.hideLoading()
        }
      })
    }
  },
  onShow() {
    if (app.globalData.hasLogin) {
      this.loadZdg()
      this.setData({
        hasLogin: app.globalData.hasLogin,
        wxtx: app.globalData.wxtx,
        wxnc: app.globalData.wxnc,
      })
    }
  },
  exit() {
    let that = this
    wx.removeStorage({
      key: "user",
      success() {
        app.globalData.hasLogin = false;
        app.globalData.wxnc = '';
        app.globalData.wxtx = '/image/nologin.png';
        app.globalData.openid = "";
        that.setData({
          hasLogin: false,
          wxnc: '',
          wxtx: '/image/nologin.png',
          openid: '', 
          gzfwsl: 0
        })
        wx.showModal({
          title: "提示",
          content: "退出成功",
          showCancel: false
        })
      }
    })
  }
})