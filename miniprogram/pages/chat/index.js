// miniprogram/pages/chat/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: [],
    message: '',
    scroll_height: 0,
    interval: null,
    cid: null,
  },
  bindKeyInput: function(e) {
    this.setData({
      message: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (60) - 30
    })
    
    wx.request({
      url: 'https://yddj.panzongyan.cn/wxchat/game/getChatContent',
      method: 'post',
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        if (res.statusCode == 200) {
          console.log(res)
          that.setData({
            cid: res.data.data.cid,
            chatList: res.data.data.data
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    this.data.interval = setInterval(() => {
      wx.request({
        url: 'https://yddj.panzongyan.cn/wxchat/game/getChatContent',
        method: 'post',
        data: {
          openid: app.globalData.openid
        },
        success(res) {
          if (res.statusCode == 200) {
            console.log(res)
            that.setData({
              chatList: res.data.data.data
            })
          }
        },
        fail(res) {
          console.log(res)
        }
      })
    }, 10000)
  },

  //发送信息
  sendMessage: function() {
    let that = this
    if (this.data.cid != null) {
      wx.request({
        url: 'https://yddj.panzongyan.cn/wxchat/game/sendMessage',
        method: 'post',
        data: {
          openid: app.globalData.openid,
          mes: that.data.message,
          cid: that.data.cid
        },
        success(res) {
          console.log(res)
          that.data.chatList.push({
            type: 2,
            content: that.data.message,
            date: that.data.date
          })
          that.setData({
            message: '',
            chatList: that.data.chatList,
          })
          wx.request({
            url: 'https://yddj.panzongyan.cn/wxchat/game/getChatContent',
            method: 'post',
            data: {
              openid: app.globalData.openid
            },
            success(res) {
              if (res.statusCode == 200) {
                console.log(res)
                that.setData({
                  chatList: res.data.data.data
                })
              }
            },
            fail(res) {
              console.log(res)
            }
          })
        },
        fail(res) {
          console.log(res)
        },
        complete() {

        }
      })
    } else {
      wx.showToast({
        title: '未初始化',
      })
    }
  },
  onUnload() {
    if (this.data.interval)
      clearInterval(this.data.interval)
  }
})